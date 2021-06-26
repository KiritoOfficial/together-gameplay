import React, { useState, useEffect } from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import * as Linking from "expo-linking";

import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Alert,
  Share,
  Platform
} from 'react-native';

import BannerImg from "../../assets/banner.png";

import { AppointmentProps } from "../../components/Appointment";
import { Background } from "../../components/Background";
import { ListHeader } from "../../components/ListHeader";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Header } from "../../components/Header";
import { Load } from "../../components/Load";
import { theme } from "../../global/styles/theme";
import { styles } from "./styles"
import { Member, MemberProps } from "../../components/Member";
import { api } from "../../services/api";

type Params = {
  guildSelected: AppointmentProps;
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);
  const [widgetActive, setWidgetActive] = useState(false);

  const route = useRoute();
  const { guildSelected } = route.params as Params;

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
    } catch (error) {
      Alert.alert("Verifique as configurações do servidor. Será que o Widget está habilitado?");
      setWidgetActive(true);
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {

    const message = Platform.OS === 'ios'
      ? `Junte-se a ${guildSelected.guild.name}`
      : `Junte-se a ${guildSelected.guild.name}:\n${widget.instant_invite}`;

    Share.share({
      message,
      url: widget.instant_invite
    });

  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite)
  }

  useEffect(() => {
    fetchGuildWidget()
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          widget.instant_invite &&
          <BorderlessButton>
            <Fontisto
              name="share"
              size={24}
              color={theme.colors.primary}
              onPress={handleShareInvitation}
            />
          </BorderlessButton>
        }
      />

      <ImageBackground
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            {guildSelected.guild.name}
          </Text>
          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>

      {
        loading ? <Load /> :
          <>
            {
              !widgetActive ?
                <>
                  <ListHeader
                    title="Jogadores"
                    subtitle={`Total ${widget.members.length ? widget.members.length : 0}`}
                  />

                  <FlatList
                    data={widget.members ? widget.members : []}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                      <Member data={item} />
                    )}
                    ItemSeparatorComponent={() => <ListDivider width="84%" isCentered />}
                    style={styles.members}
                    ListEmptyComponent={() => (
                      <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                          Não há ninguém online agora.
                        </Text>
                      </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 30, paddingTop: 10 }}
                  />
                </>
                :
                <View style={styles.emptyContainer} >
                  <Text style={styles.emptyText}>
                    Não há ninguém online agora.
                  </Text>
                </View>
            }

          </>
      }

      {
        widget.instant_invite &&
        <View style={styles.footer}>
          <ButtonIcon
            title="Entrar na partida"
            onPress={handleOpenGuild}
          />
        </View>
      }

    </Background>
  )
}