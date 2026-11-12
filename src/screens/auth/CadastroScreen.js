
import { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,SafeAreaView,ScrollView,Alert,ActivityIndicator,} from 'react-native';

import { Link, router } from 'expo-router';
import { styles } from './style';
import { cadastrarUsuario } from '../../services/usuarioService';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function cadastrar() {
    try {
      setLoading(true);

      await cadastrarUsuario(nome, email, senha);

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      router.replace('/');
    } catch (error) {
      console.log('ERRO NO CADASTRO:', error.code, error.message);

      Alert.alert(
        'Erro no cadastro',
        error.code
          ? `Código: ${error.code}\n${error.message}`
          : error.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.logo}>BELLA</Text>
        <Text style={styles.subtitle}>SALÃO DE BELEZA</Text>

        <Text style={styles.title}>Criar conta</Text>

        <Text style={styles.description}>
          Preencha seus dados para começar.
        </Text>

        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Crie uma senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={cadastrar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <View style={styles.register}>
          <Text style={styles.registerText}>
            Já possui uma conta?{' '}
          </Text>

          <Link href="/(auth)/login" style={styles.link}>
            Entrar
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
