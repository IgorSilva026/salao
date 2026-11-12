
import { useEffect, useState } from 'react';

import {View,Text,TextInput,TouchableOpacity,Alert,ActivityIndicator,ScrollView,Platform,} from 'react-native';

import DatePicker from '../../components/DatePicker';
import { useAuth } from '../../context/AuthContext';
import { styles } from './style';

import {verificarAdministrador,buscarServicosAtivos,observarAgendamentos,observarMeusAgendamentos,solicitarAgendamento as salvarAgendamento,atualizarStatusAgendamento,} from '../../services/agendamentoService';

export default function AgendamentosScreen() {
  const { user } = useAuth();

  const [isAdmin, setIsAdmin] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [servicos, setServicos] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [meusAgendamentos, setMeusAgendamentos] = useState([]);

  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [nomeCliente, setNomeCliente] = useState('');

  const [data, setData] = useState(new Date());
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [horario, setHorario] = useState('');

  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  const horarios = [
    '09:00',
    '10:00',
    '11:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  useEffect(() => {
    let ativo = true;
    let cancelarListener = null;

    async function carregarDados() {
      if (!user) {
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);

        const administrador = await verificarAdministrador(user.uid);

        if (!ativo) return;

        setIsAdmin(administrador);

        if (administrador) {
          cancelarListener = observarAgendamentos(
            (lista) => {
              if (!ativo) return;

              setAgendamentos(lista);
              setCarregando(false);
            },
            (error) => {
              console.error('Erro ao carregar agendamentos:', error);

              if (!ativo) return;

              mostrarMensagem(
                'Erro',
                'Não foi possível carregar os agendamentos.'
              );

              setCarregando(false);
            }
          );
        } else {
          const listaServicos = await buscarServicosAtivos();

          if (!ativo) return;

          setServicos(listaServicos);

          cancelarListener = observarMeusAgendamentos(
            user.uid,
            (lista) => {
              if (!ativo) return;

              setMeusAgendamentos(lista);
              setCarregando(false);
            },
            (error) => {
              console.error('Erro ao carregar seus agendamentos:', error);

              if (!ativo) return;

              mostrarMensagem(
                'Erro',
                'Não foi possível carregar seus agendamentos.'
              );

              setCarregando(false);
            }
          );
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);

        if (!ativo) return;

        mostrarMensagem('Erro', 'Não foi possível carregar os dados.');
        setCarregando(false);
      }
    }

    carregarDados();

    return () => {
      ativo = false;

      if (cancelarListener) {
        cancelarListener();
      }
    };
  }, [user]);

  function mostrarMensagem(titulo, mensagem) {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n\n${mensagem}`);
    } else {
      Alert.alert(titulo, mensagem);
    }
  }

  function formatarData(valor) {
    if (!valor) return 'Data não informada';

    const dataConvertida = valor.toDate
      ? valor.toDate()
      : new Date(valor);

    return dataConvertida.toLocaleDateString('pt-BR');
  }

  function formatarPreco(valor) {
    return Number(valor || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  async function abrirFormulario() {
    try {
      setCarregando(true);

      const lista = await buscarServicosAtivos();

      setServicos(lista);
      setMostrarFormulario(true);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);

      mostrarMensagem(
        'Erro',
        'Não foi possível carregar os serviços.'
      );
    } finally {
      setCarregando(false);
    }
  }

  function voltarParaLista() {
    setMostrarFormulario(false);
    setServicoSelecionado(null);
    setNomeCliente('');
    setHorario('');
    setMostrarCalendario(false);
  }

  async function solicitarNovoAgendamento() {
    if (isAdmin && !nomeCliente.trim()) {
      mostrarMensagem(
        'Atenção',
        'Informe o nome do cliente.'
      );
      return;
    }

    if (!servicoSelecionado || !horario) {
      mostrarMensagem(
        'Atenção',
        'Selecione um serviço, uma data e um horário.'
      );
      return;
    }

    const dataAgendamento = new Date(data);
    const [hora, minuto] = horario.split(':');

    dataAgendamento.setHours(
      Number(hora),
      Number(minuto),
      0,
      0
    );

    if (dataAgendamento < new Date()) {
      mostrarMensagem(
        'Atenção',
        'Escolha uma data e horário futuros.'
      );
      return;
    }

    setEnviando(true);

    try {
      await salvarAgendamento({
        usuarioId: user.uid,
        cliente: isAdmin
          ? nomeCliente.trim()
          : user.displayName || user.email,
        servicoId: servicoSelecionado.id,
        servicoNome: servicoSelecionado.nome,
        preco: servicoSelecionado.preco,
        dataHora: dataAgendamento,
        horario,
        status: 'Pendente',
      });

      mostrarMensagem(
        'Sucesso',
        isAdmin
          ? 'Agendamento cadastrado com sucesso!'
          : 'Sua solicitação foi enviada! Aguarde a confirmação.'
      );

      setServicoSelecionado(null);
      setHorario('');
      setNomeCliente('');

      if (isAdmin) {
        setMostrarFormulario(false);
      }
    } catch (error) {
      console.error('Erro ao agendar:', error);

      mostrarMensagem(
        'Erro',
        'Não foi possível salvar o agendamento. Verifique as permissões do Firebase.'
      );
    } finally {
      setEnviando(false);
    }
  }

  async function atualizarStatus(id, novoStatus) {
    try {
      await atualizarStatusAgendamento(id, novoStatus);

      mostrarMensagem(
        'Sucesso',
        `Agendamento ${novoStatus.toLowerCase()} com sucesso.`
      );
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);

      mostrarMensagem(
        'Erro',
        'Não foi possível atualizar o agendamento.'
      );
    }
  }

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color="#B76E79" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.carregando}>
        <Text>Faça login para continuar.</Text>
      </View>
    );
  }

  // Área administrativa: lista de agendamentos

  if (isAdmin && !mostrarFormulario) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.conteudo}
      >
        <Text style={styles.titulo}>
          Gerenciar agendamentos
        </Text>

        <Text style={styles.subtitulo}>
          Visualize e gerencie as solicitações dos clientes.
        </Text>

        <TouchableOpacity
          style={styles.botaoAgendar}
          onPress={abrirFormulario}
        >
          <Text style={styles.textoAgendar}>
            + Novo agendamento
          </Text>
        </TouchableOpacity>

        {agendamentos.length === 0 ? (
          <Text style={styles.vazio}>
            Nenhum agendamento encontrado.
          </Text>
        ) : (
          agendamentos.map((item) => (
            <View key={item.id} style={styles.cardAgendamento}>
              <Text style={styles.nomeServico}>
                {item.servicoNome}
              </Text>

              <Text style={styles.info}>
                Cliente: {item.cliente}
              </Text>

              <Text style={styles.info}>
                Data: {formatarData(item.dataHora)}
              </Text>

              <Text style={styles.info}>
                Horário: {item.horario}
              </Text>

              <Text style={styles.info}>
                Valor: {formatarPreco(item.preco)}
              </Text>

              <Text style={styles.info}>
                Status: {item.status}
              </Text>

              {item.status === 'Pendente' && (
                <View style={styles.acoes}>
                  <TouchableOpacity
                    style={styles.botaoConfirmar}
                    onPress={() =>
                      atualizarStatus(item.id, 'Confirmado')
                    }
                  >
                    <Text style={styles.textoAcao}>
                      Confirmar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.botaoCancelar}
                    onPress={() =>
                      atualizarStatus(item.id, 'Cancelado')
                    }
                  >
                    <Text style={styles.textoAcao}>
                      Cancelar
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    );
  }

  // Formulário de agendamento

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      {isAdmin && (
        <TouchableOpacity
          style={styles.botaoData}
          onPress={voltarParaLista}
        >
          <Text style={styles.textoBotaoData}>
            ← Voltar para agendamentos
          </Text>
        </TouchableOpacity>
      )}

      <Text style={styles.titulo}>
        {isAdmin ? 'Novo agendamento' : 'Agendar horário'}
      </Text>

      <Text style={styles.subtitulo}>
        Escolha o serviço, a data e o horário desejado.
      </Text>

      {isAdmin && (
        <>
          <Text style={styles.label}>
            Nome do cliente
          </Text>

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#F0E5E8',
              borderRadius: 12,
              padding: 14,
              marginBottom: 16,
              backgroundColor: '#FFFFFF',
              color: '#3D3033',
            }}
            placeholder="Digite o nome do cliente"
            placeholderTextColor="#A8959A"
            value={nomeCliente}
            onChangeText={setNomeCliente}
          />
        </>
      )}

      <Text style={styles.label}>
        1. Escolha um serviço
      </Text>

      {servicos.length === 0 ? (
        <Text style={styles.vazio}>
          Nenhum serviço disponível no momento.
        </Text>
      ) : (
        servicos.map((servico) => (
          <TouchableOpacity
            key={servico.id}
            style={[
              styles.opcao,
              servicoSelecionado?.id === servico.id &&
                styles.selecionado,
            ]}
            onPress={() => setServicoSelecionado(servico)}
          >
            <View>
              <Text style={styles.nomeServico}>
                {servico.nome}
              </Text>

              <Text style={styles.descricao}>
                {servico.descricao}
              </Text>
            </View>

            <Text style={styles.preco}>
              {formatarPreco(servico.preco)}
            </Text>
          </TouchableOpacity>
        ))
      )}

      <Text style={styles.label}>
        2. Escolha uma data
      </Text>

      <TouchableOpacity
        style={styles.botaoData}
        onPress={() => setMostrarCalendario(true)}
      >
        <Text style={styles.textoBotaoData}>
          {formatarData(data)} - Escolher data
        </Text>
      </TouchableOpacity>

      {mostrarCalendario && (
        <DatePicker
          value={data}
          onChange={(dataEscolhida) => {
            setMostrarCalendario(false);

            if (dataEscolhida) {
              setData(dataEscolhida);
            }
          }}
        />
      )}

      <Text style={styles.label}>
        3. Escolha um horário
      </Text>

      <View style={styles.gradeHorarios}>
        {horarios.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.horario,
              horario === item && styles.horarioSelecionado,
            ]}
            onPress={() => setHorario(item)}
          >
            <Text
              style={[
                styles.textoHorario,
                horario === item && styles.textoHorarioSelecionado,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.botaoAgendar}
        onPress={solicitarNovoAgendamento}
        disabled={enviando || !servicoSelecionado || !horario}
      >
        {enviando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.textoAgendar}>
            {isAdmin ? 'Salvar agendamento' : 'Solicitar agendamento'}
          </Text>
        )}
      </TouchableOpacity>

      {!isAdmin && (
        <>
          <Text style={styles.tituloMeus}>
            Meus agendamentos
          </Text>

          {meusAgendamentos.length === 0 ? (
            <Text style={styles.vazio}>
              Você ainda não possui agendamentos.
            </Text>
          ) : (
            meusAgendamentos.map((item) => (
              <View key={item.id} style={styles.cardAgendamento}>
                <Text style={styles.nomeServico}>
                  {item.servicoNome}
                </Text>

                <Text style={styles.info}>
                  Data: {formatarData(item.dataHora)}
                </Text>

                <Text style={styles.info}>
                  Horário: {item.horario}
                </Text>

                <Text style={styles.info}>
                  Valor: {formatarPreco(item.preco)}
                </Text>

                <Text style={styles.info}>
                  Status: {item.status}
                </Text>
              </View>
            ))
          )}
        </>
      )}
    </ScrollView>
  );
}
