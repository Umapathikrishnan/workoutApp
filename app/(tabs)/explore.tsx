import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';

export default function AddWorkoutScreen() {
  const [workout, setWorkout] = useState('');
  const [time, setTime] = useState('');
  const [calories, setCalories] = useState('');
  const { user } = useAuth(); // Get logged-in user

  const addWorkout = async () => {
    if (!workout.trim()) {
      Alert.alert('Please enter workout name.');
      return;
    }

    if (!user) {
      Alert.alert('User not logged in.');
      return;
    }

    try {
      console.log('Adding workout:', workout, time, calories);
      // 🧠 Save workout data to Firestore
      console.log('User ID:', user.uid);
      console.log('db:', db);
      console.log('Collection:', collection(db, 'workouts'));
      await addDoc(collection(db, 'workouts'), {
        workout,
        time: time ? parseInt(time) : null,
        calories: calories ? parseInt(calories) : null,
        date: Timestamp.now(),
        userId: user.uid, // 🧠 Save UID for user-specific data
      });

      setWorkout('');
      setTime('');
      setCalories('');
      Alert.alert('Workout logged successfully!');
    } catch (err) {
      console.error(err);
      Alert.alert('Error saving workout.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Workout Name</Text>
      <TextInput
        style={styles.input}
        value={workout}
        onChangeText={setWorkout}
        placeholder="e.g. Push Ups"
      />

      <Text style={styles.label}>Time (mins)</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
        placeholder="e.g. 20"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Calories</Text>
      <TextInput
        style={styles.input}
        value={calories}
        onChangeText={setCalories}
        placeholder="e.g. 150"
        keyboardType="numeric"
      />

      <Button title="Log Workout" onPress={addWorkout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40,backgroundColor: '#fff' },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 5 },
});
