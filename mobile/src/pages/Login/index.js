import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, Image, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import styles from './styles';

import logo from '../../assets/logo.png';

import api from '../../services/api';

export default function Login({ navigation }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Main', { user });
      };
    });
  }, []);

  async function handleLogin() {
    const response = await api.post('/devs', { username: user });
    const { id } = response.data;

    await AsyncStorage.setItem('user', id);

    navigation.navigate('Main', { user: id });
  };

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
        value={user}
        onChangeText={setUser}
      />

      <TouchableOpacity style={styles.button} onPress={() => { handleLogin() }}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};