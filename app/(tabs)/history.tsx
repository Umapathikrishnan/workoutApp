import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';

export default function HistoryScreen() {
  const [workouts, setWorkouts] = useState([]);
  const { user } = useAuth(); // ✅ Get current user

  useEffect(() => {
    console.log('User:', user); // Debugging line
    if (user) {
      fetchWorkouts(user.uid);
    }
  }, [user]);

  const fetchWorkouts = async (uid: string) => {
    try {
      const q = query(collection(db, 'workouts'), where('userId', '==', uid));
      const snapshot = await getDocs(q);
      const data: any = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 🧠 Sort by date (latest first)
      setWorkouts(data.sort((a: any, b: any) => b.date.toDate() - a.date.toDate()));
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Workout History</Text>
      <FlatList
        data={workouts}
        keyExtractor={(item: any) => item?.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item?.workout}</Text>
            <Text>Date: {item?.date.toDate().toDateString()}</Text>
            {item.time && <Text>Time: {item?.time} min</Text>}
            {item.calories && <Text>Calories: {item?.calories}</Text>}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  card: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
});
