
import { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,SafeAreaView,Alert,ActivityIndicator,Platform,} from 'react-native';

import { Link, router } from 'expo-router';

import { styles } from './style';
import {fazerLogin,recuperarSenha,} from '../../services/authService';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [recuperandoSenha, setRecuperandoSenha] = useState(false);

  function mostrarMensagem(titulo, mensagem) {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n\n${mensagem}`);
    } else {
      Alert.alert(titulo, mensagem);
    }
  }

  async function handleLogin() {
    try {
      setLoading(true);

      await fazerLogin(email, senha);

      router.replace('/');
    } catch (error) {
      mostrarMensagem(
        'Erro no login',
        error.message === 'Preencha o e-mail e a senha.'
          ? error.message
          : 'Verifique seu e-mail e sua senha.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleRecuperarSenha() {
    try {
      setRecuperandoSenha(true);

      await recuperarSenha(email);

      mostrarMensagem(
        'E-mail enviado',
        'Enviamos um link para redefinir sua senha. Verifique sua caixa de entrada e também o spam.'
      );
    } catch (error) {
      let mensagem = 'Não foi possível enviar o e-mail de recuperação.';

      if (error.message === 'Informe seu e-mail.') {
        mensagem = error.message;
      } else if (error.code === 'auth/invalid-email') {
        mensagem = 'Digite um endereço de e-mail válido.';
      } else if (error.code === 'auth/user-not-found') {
        mensagem = 'Não encontramos uma conta com esse e-mail.';
      }

      mostrarMensagem('Recuperar senha', mensagem);
    } finally {
      setRecuperandoSenha(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>BELLA</Text>
        <Text style={styles.subtitle}>SALÃO DE BELEZA</Text>

        <Text style={styles.title}>Bem-vinda!</Text>
        <Text style={styles.description}>
          Entre na sua conta para continuar.
        </Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={handleRecuperarSenha}
          disabled={recuperandoSenha}
        >
          {recuperandoSenha ? (
            <ActivityIndicator color="#B76E79" size="small" />
          ) : (
            <Text style={styles.forgotPasswordText}>
              Esqueceu a senha?
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <View style={styles.register}>
          <Text style={styles.registerText}>
            Ainda não tem uma conta?
          </Text>

          <Link href="/(auth)/cadastro" style={styles.link}>
            Cadastre-se
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
