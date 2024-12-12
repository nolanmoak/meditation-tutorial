import AppGradient from '@/components/app-gradient';
import { MEDITATION_DATA } from '@/constants/meditation-data';
import MEDITATION_IMAGES from '@/constants/meditiation-images';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, ImageBackground, Pressable, Text, View } from 'react-native';

const NatureMeditate = () => {
  const router = useRouter();

  return (
    <View className='flex-1'>
      <AppGradient colors={['#161b2e', '#0a4d4a', '#766e67']}>
        <View className='flex-1 px-4 pt-4'>
          <View className='mb-6'>
            <Text className='mb-3 text-left text-4xl font-bold text-gray-200'>Welcome Nolan</Text>
            <Text className='text-xl font-medium text-indigo-100'>Start your meditation practice today</Text>
          </View>
          <View className='flex-1'>
            <FlatList
              data={MEDITATION_DATA}
              className='flex-grow'
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable onPress={() => router.push('/meditate')} className='my-3 h-48 overflow-hidden rounded-md'>
                  <ImageBackground
                    source={MEDITATION_IMAGES[item.id - 1]}
                    resizeMode='cover'
                    className='flex-1 justify-center rounded-lg'
                  >
                    <LinearGradient
                      colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                      className='flex-1 items-center justify-center'
                    >
                      <Text className='text-center text-3xl font-bold text-gray-100'>{item.title}</Text>
                    </LinearGradient>
                  </ImageBackground>
                </Pressable>
              )}
            />
          </View>
        </View>
      </AppGradient>
    </View>
  );
};

export default NatureMeditate;
