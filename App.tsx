
import React from 'react';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { Sign } from './src/screens/Sign';
import { NativeBaseProvider } from 'native-base'
import { THEME } from './src/styles/theme'
import { Loading } from './src/components/Loading';

export default function App() {

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      {fontsLoaded ? <Sign /> : <Loading />}
    </NativeBaseProvider>

  );
}


