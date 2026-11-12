
import { useEffect, useState } from 'react';

import {View,Text,TextInput,TouchableOpacity,ScrollView,SafeAreaView,Alert,ActivityIndicator,Platform,} from 'react-native';

import { useAuth } from '../../context/AuthContext';
import { styles } from './style';

import {verificarAdministrador,observarProdutos,salvarProduto as salvarProdutoService,excluirProduto as excluirProdutoService,} from '../../services/produtoService';

export default function ProdutosScreen() {
  const { user } = useAuth();

  const [produtos, setProdutos] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    let unsubscribe;
    let active = true;

    async function carregarDados() {
      try {
        const admin = await verificarAdministrador(user.uid);

        if (!active) return;

        setIsAdmin(admin);

        unsubscribe = observarProdutos(
          (lista) => {
            if (active) {
              setProdutos(lista);
              setLoading(false);
            }
          },
          (error) => {
            console.log('Erro ao carregar produtos:', error);

            if (active) {
              setLoading(false);
              Alert.alert('Erro', 'Não foi possível carregar os produtos.');
            }
          }
        );
      } catch (error) {
        console.log('Erro ao verificar administrador:', error);

        if (active) {
          setLoading(false);
          Alert.alert('Erro', 'Não foi possível carregar seus dados.');
        }
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
    setEditingId(null);
  }

  async function salvarProduto() {
    if (!nome.trim() || !preco.trim()) {
      Alert.alert('Atenção', 'Informe o nome e o preço.');
      return;
    }

    const precoNumerico = Number(preco.trim().replace(',', '.'));

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
      };

      await salvarProdutoService(dados, editingId);

      Alert.alert(
        'Sucesso',
        editingId ? 'Produto atualizado!' : 'Produto cadastrado!'
      );

      limparFormulario();
    } catch (error) {
      console.log('Erro ao salvar produto:', error);
      Alert.alert('Erro', 'Não foi possível salvar o produto.');
    } finally {
      setSaving(false);
    }
  }

  function editarProduto(produto) {
    setEditingId(produto.id);
    setNome(produto.nome || '');
    setDescricao(produto.descricao || '');
    setPreco(String(produto.preco ?? '').replace('.', ','));
  }

  async function excluirProduto(id) {
    const confirmar =
      Platform.OS === 'web'
        ? window.confirm('Deseja realmente excluir este produto?')
        : await new Promise((resolve) => {
            Alert.alert(
              'Excluir produto',
              'Deseja realmente excluir este produto?',
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
      await excluirProdutoService(id);

      if (Platform.OS === 'web') {
        window.alert('Produto excluído com sucesso!');
      } else {
        Alert.alert('Sucesso', 'Produto excluído com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao excluir:', error);

      if (Platform.OS === 'web') {
        window.alert(`Erro ao excluir: ${error.code}\n${error.message}`);
      } else {
        Alert.alert('Erro ao excluir', error.message);
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
        <ActivityIndicator size="large" color="#B76E79" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Produtos</Text>

        <Text style={styles.subtitle}>
          Conheça nossos produtos disponíveis.
        </Text>

        {isAdmin && (
          <View style={styles.form}>
            <Text style={styles.formTitle}>
              {editingId ? 'Editar produto' : 'Novo produto'}
            </Text>

            <Text style={styles.label}>Nome do produto</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Shampoo"
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrição do produto"
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />

            <Text style={styles.label}>Preço (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 39,90"
              keyboardType="decimal-pad"
              value={preco}
              onChangeText={setPreco}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={salvarProduto}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>
                  {editingId ? 'Salvar alterações' : 'Cadastrar produto'}
                </Text>
              )}
            </TouchableOpacity>

            {editingId && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={limparFormulario}
              >
                <Text style={styles.cancelText}>Cancelar edição</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <Text style={styles.sectionTitle}>Catálogo de produtos</Text>

        {produtos.length === 0 ? (
          <Text style={styles.empty}>
            Nenhum produto cadastrado ainda.
          </Text>
        ) : (
          produtos.map((produto) => (
            <View key={produto.id} style={styles.card}>
              <Text style={styles.productName}>{produto.nome}</Text>

              <Text style={styles.description}>
                {produto.descricao || 'Sem descrição.'}
              </Text>

              <Text style={styles.price}>
                {formatarPreco(produto.preco)}
              </Text>

              {isAdmin && (
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => editarProduto(produto)}
                  >
                    <Text style={styles.actionText}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => excluirProduto(produto.id)}
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
