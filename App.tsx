
import React from 'react';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { Sign } from './src/screens/Sign';
import { NativeBaseProvider, StatusBar } from 'native-base'
import { THEME } from './src/styles/theme'
import { Loading } from './src/components/Loading';
import { Register } from './src/screens/Register';

export default function App() {

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Register /> : <Loading />}
    </NativeBaseProvider>

  );
}


