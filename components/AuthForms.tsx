import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { auth, db } from '../app/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router'; // Adjust the import based on your routing library

export const AuthForms = ({ type }: { type: 'login' | 'signup' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const router = useRouter(); // Assuming you have a router object available

  const handleAuth = async () => {
    try {
      if (type === 'signup') {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCred.user.uid), {
          email,
          level: 1,
          streak: 0,
          lastWorkout: null,
        });
        router.replace('/(tabs)'); // Redirect to dashboard after signup
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        router.replace('/(tabs)'); // Redirect to dashboard after login
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View>
      <Text>{type === 'signup' ? 'Sign Up' : 'Login'}</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title={type === 'signup' ? 'Sign Up' : 'Login'} onPress={handleAuth} />
    </View>
  );
};
