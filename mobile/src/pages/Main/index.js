import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, AsyncStorage } from 'react-native';

import api from '../../services/api';

import logo from '../../assets/logo.png';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';

import styles from './styles';

export default function Main({ navigation }) {
  const id = navigation.getParam('user');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: id
        }
      });

      setUsers(response.data);
    };

    loadUsers();
  }, [id]);

  async function handleLike() {
    const [user, ...rest] = users

    await api.post(`/devs/${user.id}/like`, null, {
      headers: {
        user: id
      }
    });

    setUsers(rest);
  };

  async function handleDislike() {
    const [user, ...rest] = users

    await api.post(`/devs/${user.id}/dislike`, null, {
      headers: {
        user: id
      }
    });

    setUsers(rest);
  };

  async function handleLogout() {
    AsyncStorage.clear();

    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      <View style={styles.cardsContainer}>
        {users.length === 0
          ? <Text style={styles.empty}>Acabou :(</Text>
          : (
            users.map((user, index) => (
              <View key={user.id} style={[styles.card, { zIndex: users.length - index }]}>
                <Image style={styles.avatar} source={{ uri: user.avatar }} />
                <View style={styles.footer}>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                </View>
              </View>
            ))
          )
        }
      </View>

      <View style={styles.buttonsContainer}>
        {users.length > 0 &&
          <>
            <TouchableOpacity style={styles.button} onPress={handleDislike}>
              <Image source={dislike}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLike}>
              <Image source={like}></Image>
            </TouchableOpacity>
          </>
        }
      </View>
    </SafeAreaView>
  );
};