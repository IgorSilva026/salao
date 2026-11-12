
import { useEffect, useState } from 'react';

import {View,Text,TextInput,TouchableOpacity,ScrollView,SafeAreaView,Alert,ActivityIndicator,Platform,} from 'react-native';

import { useAuth } from '../../context/AuthContext';
import { colors } from '../../theme';
import { styles } from './style';

import {verificarAdministrador,observarServicos,salvarServico as salvarServicoService,excluirServico as excluirServicoService,} from '../../services/servicoService';

export default function ServicosScreen() {
  const { user } = useAuth();

  const [servicos, setServicos] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [duracao, setDuracao] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    let active = true;
    let unsubscribe;

    async function carregarDados() {
      try {
        const admin = await verificarAdministrador(user.uid);

        if (!active) return;

        setIsAdmin(admin);

        unsubscribe = observarServicos(
          (lista) => {
            if (active) {
              setServicos(lista);
              setLoading(false);
            }
          },
          (error) => {
            console.log('Erro ao carregar serviços:', error);
            if (active) setLoading(false);
          }
        );
      } catch (error) {
        console.log('Erro ao verificar administrador:', error);
        if (active) setLoading(false);
      }
    }

    carregarDados();

    return () => {
      active = false;
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  function limparFormulario() {
    setNome('');
    setDescricao('');
    setPreco('');
    setDuracao('');
    setEditingId(null);
  }

  async function salvarServico() {
    if (!nome.trim() || !preco.trim()) {
      Alert.alert('Atenção', 'Informe o nome e o preço.');
      return;
    }

    const precoNumerico = Number(
      preco.trim().replace(',', '.')
    );

    if (!Number.isFinite(precoNumerico) || precoNumerico < 0) {
      Alert.alert('Atenção', 'Informe um preço válido.');
      return;
    }

    try {
      setSaving(true);

      const dados = {
        nome: nome.trim(),
        descricao: descricao.trim(),
        preco: precoNumerico,
        duracao: duracao.trim(),
      };

      await salvarServicoService(dados, editingId);

      Alert.alert(
        'Sucesso',
        editingId ? 'Serviço atualizado!' : 'Serviço cadastrado!'
      );

      limparFormulario();
    } catch (error) {
      console.log('Erro ao salvar serviço:', error);
      Alert.alert('Erro', error.message);
    } finally {
      setSaving(false);
    }
  }

  function editarServico(servico) {
    setEditingId(servico.id);
    setNome(servico.nome || '');
    setDescricao(servico.descricao || '');
    setPreco(String(servico.preco ?? '').replace('.', ','));
    setDuracao(servico.duracao || '');
  }

  async function excluirServico(id) {
    const confirmar = Platform.OS === 'web'
      ? window.confirm('Deseja realmente excluir este serviço?')
      : await new Promise((resolve) => {
          Alert.alert(
            'Excluir serviço',
            'Deseja realmente excluir este serviço?',
            [
              {
                text: 'Cancelar',
                style: 'cancel',
                onPress: () => resolve(false),
              },
              {
                text: 'Excluir',
                style: 'destructive',
                onPress: () => resolve(true),
              },
            ]
          );
        });

    if (!confirmar) return;

    try {
      await excluirServicoService(id);

      if (Platform.OS === 'web') {
        window.alert('Serviço excluído com sucesso!');
      } else {
        Alert.alert('Sucesso', 'Serviço excluído!');
      }
    } catch (error) {
      console.log('Erro ao excluir serviço:', error);

      if (Platform.OS === 'web') {
        window.alert(error.message);
      } else {
        Alert.alert('Erro', error.message);
      }
    }
  }

  function formatarPreco(valor) {
    return Number(valor || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Nossos serviços</Text>

        <Text style={styles.subtitle}>
          Conheça nossos serviços disponíveis.
        </Text>

        {isAdmin && (
          <View style={styles.form}>
            <Text style={styles.formTitle}>
              {editingId ? 'Editar serviço' : 'Novo serviço'}
            </Text>

            <Text style={styles.label}>Nome do serviço</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Corte feminino"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrição do serviço"
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />

            <Text style={styles.label}>Preço (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 50,00"
              keyboardType="decimal-pad"
              value={preco}
              onChangeText={setPreco}
            />

            <Text style={styles.label}>Duração</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 45 minutos"
              value={duracao}
              onChangeText={setDuracao}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={salvarServico}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>
                  {editingId ? 'Salvar alterações' : 'Cadastrar serviço'}
                </Text>
              )}
            </TouchableOpacity>

            {editingId && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={limparFormulario}
              >
                <Text style={styles.cancelText}>
                  Cancelar edição
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <Text style={styles.sectionTitle}>
          Catálogo de serviços
        </Text>

        {servicos.length === 0 ? (
          <Text style={styles.empty}>
            Nenhum serviço cadastrado ainda.
          </Text>
        ) : (
          servicos.map((servico) => (
            <View key={servico.id} style={styles.card}>
              <Text style={styles.serviceName}>
                {servico.nome}
              </Text>

              <Text style={styles.description}>
                {servico.descricao || 'Sem descrição.'}
              </Text>

              {servico.duracao ? (
                <Text style={styles.duration}>
                  Duração: {servico.duracao}
                </Text>
              ) : null}

              <Text style={styles.price}>
                {formatarPreco(servico.preco)}
              </Text>

              {isAdmin && (
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => editarServico(servico)}
                  >
                    <Text style={styles.actionText}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => excluirServico(servico.id)}
                  >
                    <Text style={styles.actionText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
