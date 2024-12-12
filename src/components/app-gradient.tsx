import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { type ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type AppGradientProps = {
  colors: readonly [string, string, ...string[]];
  children?: ReactNode;
};

const AppGradient = ({ colors, children }: AppGradientProps) => {
  return (
    <LinearGradient colors={colors} className='flex-1'>
      <SafeAreaView className='flex-1'>{children}</SafeAreaView>
      <StatusBar style='light' />
    </LinearGradient>
  );
};

export default AppGradient;
