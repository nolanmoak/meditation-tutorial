import JsStack from '@/components/js-stack';
import TimerProvider from '@/context/timer-context';
import { TransitionPresets } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'Roboto-Mono': require('#/assets/fonts/RobotoMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) {
      throw error;
    }
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded || error) {
    return null;
  }

  return (
    <TimerProvider>
      <JsStack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='meditate/[id]' options={{ headerShown: false }} />
        <JsStack.Screen
          name='(modal)/adjust-meditation-duration'
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            headerShown: false,
            presentation: 'modal',
            gestureEnabled: true,
          }}
        />
      </JsStack>
    </TimerProvider>
  );
}
