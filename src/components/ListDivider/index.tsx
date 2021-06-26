import React from "react";
import { View, Text } from 'react-native';

import { styles } from "./styles";

type Props = {
  width: string;
  isCentered?: boolean;
}

export function ListDivider({ width, isCentered }: Props) {
  return (
    <View
      style={[
        styles.container,
        isCentered ? {
          marginVertical: 12
        } : {
          marginTop: 2,
          marginBottom: 31
        },
        {
          width: width, 
        }
      ]}
    />
  );
}