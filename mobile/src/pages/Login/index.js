import React from 'react';
import { KeyboardAvoidingView, Platform, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

import logo from '../../assets/logo.png';

export default function Login() {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <Image source={logo} />

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuário no GitHub"
        placeholderTextColor="#999"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={() => { }}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};