
import { View, Text } from 'react-native';
import { styles } from './style';
import { useAuth } from '../../context/AuthContext';

export default function HomeScreen() {
  const { user } = useAuth();

  const nome = user?.displayName?.split(' ')[0] || 'Cliente';

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>BELLA</Text>

      <Text style={styles.title}>
        Olá, {nome}!
      </Text>

      <Text style={styles.description}>
        Seja bem-vinda ao nosso salão.
        {'\n'}
        Sua beleza e seu bem-estar em um só lugar.
      </Text>
    </View>
  );
}
