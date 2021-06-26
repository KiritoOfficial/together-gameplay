import React from 'react';
import {
  View,
  Image,
  Text,
  Alert,
  ActivityIndicator
} from 'react-native';

import { useAuth } from '../../hooks/auth';

import IllustrationImg from '../../assets/illustration.png';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';


export function SingIn() {

  const { user, singIn, loading } = useAuth();

  async function handleSingIn() {
    try {
      await singIn()
    } catch (error) {
      Alert.alert(error)
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={IllustrationImg}
          style={styles.image}
        />
        <View style={styles.content}>

          <Text style={styles.title}>
            Conecte-se {'\n'}
            e organize suas {'\n'}
            jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {'\n'}
            favoritos com seus amigos
          </Text>

          {
            loading ? <ActivityIndicator color={theme.colors.primary} />
            :
            <ButtonIcon
              title="Entrar com Discord"
              onPress={handleSingIn}
            />
          }

        </View>
      </View>
    </Background>
  );
}