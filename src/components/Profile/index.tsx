import React, { ReactNode, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Modal, ModalProps, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { RectButton } from "react-native-gesture-handler";
import { useAuth } from "../../hooks/auth";

import { Avatar } from "../Avatar";
import { styles } from "./styles";
import { Background } from "../Background";

import { theme } from "../../global/styles/theme";

export function Profile() {

  const { user, singOut } = useAuth();
  const [openSingOutModal, setOpenSingOutModal] = useState(false);

  function handleOpenSingOutModal() {
    setOpenSingOutModal(true);
  }

  function handleCloseSingOutModal() {
    setOpenSingOutModal(false);
  }

  function handleSingOut() {
    Alert.alert('Logout', 'Deseja sair do GamePlay?', [
      {
        text: "Não",
        style: "cancel"
      },
      {
        text: "Sim",
        onPress: () => singOut()
      }
    ])
  }

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>

        <RectButton onPress={handleOpenSingOutModal}>
          <Avatar urlImage={user.avatar} />
        </RectButton>

        <View>
          <View style={styles.user}>

            <Text style={styles.greeting}>
              Olá,
            </Text>

            <Text style={styles.username}>
              {user.firstName}
            </Text>
          </View>

          <Text style={styles.message}>
            Hoje é dia de vitoria!
          </Text>

        </View>
      </View>

      {
        openSingOutModal &&
        <Modal
          transparent
          animationType="slide"
          statusBarTranslucent
        >

          <TouchableWithoutFeedback onPress={handleCloseSingOutModal}>
            <View style={styles.overlay}>
              <View style={styles.containerModal}>
                <Background>
                  <View style={styles.bar} />

                  <Text style={styles.title}>
                    Deseja sair do
                    <Text style={styles.game} >
                      {} Game
                    </Text>
                    <Text style={styles.play} >
                      Play
                    </Text>
                    <Text style={styles.game} >
                      ?
                    </Text>
                  </Text>

                  <View style={styles.singOut}>

                    <TouchableOpacity
                      style={[styles.button, { borderColor: theme.colors.secondary30, borderWidth: 1 }]}
                      onPress={handleCloseSingOutModal}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.text} >
                        Não
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: theme.colors.primary }]}
                      onPress={() => singOut()}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.text} >
                        Sim
                      </Text>
                    </TouchableOpacity>

                  </View>

                </Background>
              </View>
            </View>
          </TouchableWithoutFeedback>

        </Modal>
      }

    </KeyboardAvoidingView>
  );
}