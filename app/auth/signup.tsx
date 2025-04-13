'use client';

import React from 'react';
import { View } from 'react-native';
import { AuthForms } from '@/components/AuthForms';

export default function SignupScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <AuthForms type="signup" />
    </View>
  );
}
