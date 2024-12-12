import { GalleryPreviewData } from '@/constants/models/affirmation-category';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';

type GuidedAffirmationsGalleryProps = {
  title: string;
  previews: GalleryPreviewData[];
};

const GuidedAffirmationsGallery = ({ title, previews }: GuidedAffirmationsGalleryProps) => {
  return (
    <View className='my-5'>
      <View className='mb-2'>
        <Text className='text-xl font-bold text-white'>{title}</Text>
      </View>
      <View className='space-y-2'>
        <FlatList
          data={previews}
          horizontal
          contentContainerClassName='gap-2 p-2'
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link href={`/affirmations/${item.id}`} asChild>
              <Pressable>
                <View className='h-36 w-32 overflow-hidden rounded-md'>
                  <Image source={item.image} resizeMode='cover' className='h-full w-full' />
                </View>
              </Pressable>
            </Link>
          )}
        />
      </View>
    </View>
  );
};

export default GuidedAffirmationsGallery;
