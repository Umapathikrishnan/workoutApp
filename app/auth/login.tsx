'use client';

import React from 'react';
import { Button, View } from 'react-native';
import { AuthForms } from '@/components/AuthForms';
import { useRouter } from 'expo-router'; // Adjust the import based on your routing library

export default function LoginScreen() {
    const router = useRouter(); // Assuming you have a router object available
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'
     }}>
      <AuthForms type="login" />
      <Button title="Go to Signup" onPress={() => router.push('/auth/signup')} />
    </View>
  );
}
