import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import AnimatedCarousel from './components/AnimatedCarousel';
import api from './services/api';

interface MembersData {
  id: number;
  photo: string;
  avatar_url: string;
}

export default function App() {
  const [members, setMembers] = useState<MembersData[]>([]);

  useEffect(() => {
    api.get<MembersData[]>('/orgs/rocketseat/members').then(response => {
      setMembers(response.data.map(member => ({
        id: member.id,
        photo: member.avatar_url,
        avatar_url: 'https://github.com/rocketseat.png'
      })))
    })
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#211F25" />
      {!members.length ? (
        <AppLoading />
      ) : (
        <AnimatedCarousel data={members} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211F25',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
