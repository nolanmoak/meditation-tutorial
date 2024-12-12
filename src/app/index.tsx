import beachImage from '#/assets/images/meditation-images/beach.webp';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';

const Index = () => {
  return (
    <View className='flex-1'>
      <ImageBackground source={beachImage} resizeMode='cover' className='flex-1'>
        <LinearGradient className='flex-1' colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.8)']}>
          <Text>index</Text>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Index;
