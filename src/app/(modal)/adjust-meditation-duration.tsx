import AppGradient from '@/components/app-gradient';
import CustomButton from '@/components/custom-button';
import { useTimer } from '@/context/timer-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const AdjustMeditationDuration = () => {
  const router = useRouter();
  const { setDuration } = useTimer();

  function handleAdjustMeditationDuration(durationSeconds: number) {
    setDuration(durationSeconds);
    router.back();
  }

  return (
    <View className='flex-1'>
      <AppGradient colors={['#161b2e', '#084d4a', '#766e67']}>
        <View className='flex-1 p-4'>
          <Pressable onPress={() => router.back()}>
            <AntDesign name='leftcircleo' size={50} color='white' />
          </Pressable>
          <View className='h-4/5 justify-center'>
            <Text className='mb-8 text-center text-3xl font-bold text-white'>Adjust your meditation duration</Text>
            <View>
              <CustomButton
                title='10 seconds'
                onPress={() => handleAdjustMeditationDuration(10)}
                containerStyles='mb-5'
              />
              <CustomButton
                title='5 minutes'
                onPress={() => handleAdjustMeditationDuration(5 * 60)}
                containerStyles='mb-5'
              />
              <CustomButton
                title='10 minutes'
                onPress={() => handleAdjustMeditationDuration(10 * 60)}
                containerStyles='mb-5'
              />
              <CustomButton
                title='15 minutes'
                onPress={() => handleAdjustMeditationDuration(15 * 60)}
                containerStyles='mb-5'
              />
            </View>
          </View>
        </View>
      </AppGradient>
    </View>
  );
};

export default AdjustMeditationDuration;
