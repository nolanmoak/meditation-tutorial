import AppGradient from '@/components/app-gradient';
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery';
import { GalleryPreviewData } from '@/constants/models/affirmation-category';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';

const AffirmationPractice = () => {
  const { itemId } = useLocalSearchParams();

  const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
  const [sentences, setSentences] = useState<string[]>();

  const router = useRouter();

  useEffect(() => {
    for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
      const affirmationsData = AFFIRMATION_GALLERY[idx].data;

      const affirmationToStart = affirmationsData.find((a) => a.id === Number(itemId));

      if (affirmationToStart) {
        setAffirmation(affirmationToStart);

        const affirmationsArray = affirmationToStart.text.split('.');
        if (affirmationsArray[affirmationsArray.length - 1] === '') {
          affirmationsArray.pop();
        }

        setSentences(affirmationsArray);

        return;
      }
    }
  }, [itemId]);

  return (
    <View className='flex-1'>
      <ImageBackground source={affirmation?.image} resizeMode='cover' className='flex-1'>
        <AppGradient colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.9)']}>
          <View className='p-2'>
            <Pressable onPress={() => router.back()}>
              <AntDesign name='leftcircleo' size={50} color='white' />
            </Pressable>
            <ScrollView className='mt-20' showsVerticalScrollIndicator={false}>
              <View className='h-full justify-center'>
                <View className='h-4/5 justify-center'>
                  {sentences?.map((sentence, idx) => (
                    <Text key={idx} className='mb-12 text-center text-3xl font-bold text-white'>
                      {sentence}.
                    </Text>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default AffirmationPractice;
