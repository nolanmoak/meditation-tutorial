import type { ImageSourcePropType } from 'react-native';

export type AffirmationCategory = {
  title: string;
  data: GalleryPreviewData[];
};

export type GalleryPreviewData = {
  id: number;
  text: string;
  image: ImageSourcePropType;
};
