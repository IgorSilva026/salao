
import { useState } from 'react';
import {View,Text,TouchableOpacity,SafeAreaView,Alert,Platform,} from 'react-native';

import { signOut } from 'firebase/auth';
import { router } from 'expo-router';

import { auth } from '../../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { styles } from './style';

export default function PerfilScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  async function sair() {
    try {
      setLoading(true);

      await signOut(auth);

      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Erro ao sair:', error);

      if (Platform.OS === 'web') {
        window.alert('Erro\n\nNão foi possível sair da conta.');
      } else {
        Alert.alert('Erro', 'Não foi possível sair da conta.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Meu Perfil</Text>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>

        <Text style={styles.name}>
          {user?.displayName || 'Usuário'}
        </Text>

        <View style={styles.info}>
          <Text style={styles.label}>E-mail</Text>

          <Text style={styles.value}>
            {user?.email || 'Não informado'}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>Conta</Text>

          <Text style={styles.value}>Administrador</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={sair}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Saindo...' : 'Sair da conta'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
