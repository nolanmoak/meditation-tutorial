import AppGradient from '@/components/app-gradient';
import CustomButton from '@/components/custom-button';
import { AUDIO_FILES, MEDITATION_DATA } from '@/constants/meditation-data';
import MEDITATION_IMAGES from '@/constants/meditiation-images';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';

const Meditate = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [isMeditating, setIsMeditating] = useState(false);
  const [audioSound, setAudioSound] = useState<Audio.Sound>();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    if (!isMeditating) {
      return;
    }
    // Done
    if (secondsRemaining === 0) {
      setIsMeditating(false);
      return;
    }

    const timerId = setTimeout(() => {
      setSecondsRemaining((current) => current - 1);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, isMeditating]);

  async function toggleMeditationSessionStatus() {
    if (secondsRemaining === 0) {
      setSecondsRemaining(10);
    }
    setIsMeditating((current) => !current);
    await toggleSound();
  }

  useEffect(() => {
    return () => {
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  async function initializeAudio() {
    const audioFilename = MEDITATION_DATA[Number(id) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFilename]);
    setAudioSound(sound);
    return sound;
  }

  async function toggleSound() {
    const sound = audioSound ?? (await initializeAudio());

    const status = await sound?.getStatusAsync();

    if (status.isLoaded && !isAudioPlaying) {
      await sound.playAsync();
      setIsAudioPlaying(true);
    } else {
      await sound.pauseAsync();
      setIsAudioPlaying(false);
    }
  }

  function handleAdjustMeditationDuration() {
    if (isMeditating) {
      toggleMeditationSessionStatus();
    }
    router.push('/(modal)/adjust-meditation-duration');
  }

  const formattedTimeMinutes = String(Math.floor(secondsRemaining / 60)).padStart(2, '0');
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, '0');

  return (
    <View className='flex-1'>
      <ImageBackground source={MEDITATION_IMAGES[Number(id) - 1]} resizeMode='cover' className='flex-1'>
        <AppGradient colors={['transparent', 'rgba(0, 0, 0, 0.8)']}>
          <View className='flex-1 p-2'>
            <Pressable onPress={() => router.back()}>
              <AntDesign name='leftcircleo' size={50} color='white' />
            </Pressable>
            <View className='flex-1 justify-center'>
              <View className='mx-auto h-44 w-44 items-center justify-center rounded-full bg-neutral-200'>
                <Text className='font-rmono text-4xl text-blue-800'>
                  {formattedTimeMinutes}:{formattedTimeSeconds}
                </Text>
              </View>
            </View>
            <View className='flex flex-col gap-4'>
              <CustomButton title='Adjust Duration' onPress={handleAdjustMeditationDuration} />
              <CustomButton title='Start Meditation' onPress={toggleMeditationSessionStatus} />
            </View>
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
