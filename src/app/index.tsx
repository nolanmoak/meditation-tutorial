import beachImage from '#/assets/images/meditation-images/beach.webp';
import AppGradient from '@/components/app-gradient';
import CustomButton from '@/components/custom-button';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';

const Index = () => {
  const router = useRouter();

  return (
    <View className='flex-1'>
      <ImageBackground source={beachImage} resizeMode='cover' className='flex-1'>
        <AppGradient colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.8)']}>
          <View className='flex-1 justify-between p-4'>
            <View>
              <Text className='text-center text-4xl font-bold text-white'>Simple Meditation</Text>
              <Text className='mt-3 text-center text-2xl font-normal text-white'>
                Simplifying Meditation for Everyone
              </Text>
            </View>
            <View>
              <CustomButton onPress={() => router.push('/nature-meditate')} title='Get Started' />
            </View>
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Index;
