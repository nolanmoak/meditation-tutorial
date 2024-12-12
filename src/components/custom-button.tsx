import { cn } from '@/lib/utils';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type CustomButtonProps = {
  onPress: () => void;
  title: string;
  textStyles?: string;
  containerStyles?: string;
};

const CustomButton = ({ onPress, title, textStyles = '', containerStyles = '' }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={cn('min-h-[62px] items-center justify-center rounded-xl bg-white', containerStyles)}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text className={cn('text-lg font-semibold', textStyles)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
