import AppGradient from '@/components/app-gradient';
import CustomButton from '@/components/custom-button';
import { AUDIO_FILES, MEDITATION_DATA } from '@/constants/meditation-data';
import MEDITATION_IMAGES from '@/constants/meditiation-images';
import { useTimer } from '@/context/timer-context';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';

const Meditate = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { duration: secondsRemaining, setDuration } = useTimer();

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
      setDuration((current) => current - 1);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, isMeditating, setDuration]);

  async function toggleMeditationSessionStatus() {
    if (secondsRemaining === 0) {
      setDuration(10);
    }
    setIsMeditating((current) => !current);
    await toggleSound();
  }

  useEffect(() => {
    return () => {
      setDuration(10);
      audioSound?.unloadAsync();
    };
  }, [audioSound, setDuration]);

  async function initializeAudio() {
    const audioFilename = MEDITATION_DATA[Number(id) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFilename]);
    setAudioSound(sound);
    return sound;
  }

  async function toggleSound() {
    const sound = audioSound ?? (await initializeAudio());

    const status = await sound?.getStatusAsync();

    if (status.isLoaded) {
      if (isAudioPlaying) {
        await sound.pauseAsync();
        setIsAudioPlaying(false);
      } else {
        await sound.playAsync();
        setIsAudioPlaying(true);
      }
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
          <View className='flex-1 p-4'>
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
              <CustomButton
                title={isMeditating ? 'Stop' : 'Start Meditiation'}
                onPress={toggleMeditationSessionStatus}
              />
            </View>
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
