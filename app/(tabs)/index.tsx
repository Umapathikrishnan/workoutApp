import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useFocusEffect, useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';

export default function DashboardScreen() {
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const { user } = useAuth();
  const router = useRouter();

  // 🚨 Redirect to login if no user

  useEffect(() => {
    if (user === null) {
      // Delay redirect until navigation is mounted
      const timeout = setTimeout(() => {
        router.replace('/auth/login'); // 👈 or '/(auth)/login' based on your folder
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [user]);
  // 🧠 Fetch user-specific workout data
  useFocusEffect(
    React.useCallback(() => {
      if (user) fetchWorkoutData(user.uid);
    }, [user])
  );

  

  const fetchWorkoutData = async (uid: string) => {
    try {
      const q = query(collection(db, 'workouts'), where('userId', '==', uid));
      const snapshot = await getDocs(q);
      const dates = snapshot.docs.map(doc =>
        doc.data().date.toDate().toDateString()
      );
      const uniqueDates = [...new Set(dates)].sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
      );

      let currentStreak = 0;
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate());

      for (let i = 0; i < uniqueDates.length; i++) {
        const day = new Date(uniqueDates[i]);
        if (
          currentStreak === 0 &&
          day.toDateString() === new Date().toDateString()
        ) {
          currentStreak++;
        } else if (
          day.toDateString() ===
          new Date(yesterday.setDate(yesterday.getDate() - 1)).toDateString()
        ) {
          currentStreak++;
        } else {
          break;
        }
      }

      setStreak(currentStreak);
      setLevel(Math.max(1, Math.floor(currentStreak / 3) + 1));
    } catch (error) {
      console.error('Error fetching user workouts:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Dashboard</Text>
      <Text>🔥 Streak: {streak} days</Text>
      <Text>⚡ Level: {level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});
