import AppGradient from '@/components/app-gradient';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import GuidedAffirmationsGallery from '@/components/guided-affirmations-gallery';
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery';

const Affirmations = () => {
  return (
    <View className='flex-1'>
      <AppGradient colors={['#2e1f58', '#54426b', '#a790af']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className='text-3xl font-bold text-zinc-50'>Change your beliefs with affirmations</Text>
          <View>
            {AFFIRMATION_GALLERY.map((g) => (
              <GuidedAffirmationsGallery key={g.title} title={g.title} previews={g.data} />
            ))}
          </View>
        </ScrollView>
      </AppGradient>
    </View>
  );
};

export default Affirmations;
