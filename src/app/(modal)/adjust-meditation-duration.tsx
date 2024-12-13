import AppGradient from '@/components/app-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';

const AdjustMeditationDuration = () => {
  const router = useRouter();
  return (
    <View className='relative flex-1'>
      <AppGradient colors={['#161b2e', '#084d4a', '#766e67']}>
        <Pressable onPress={() => router.back()}>
          <AntDesign name='leftcircleo' size={50} color='white' />
        </Pressable>
      </AppGradient>
    </View>
  );
};

export default AdjustMeditationDuration;
