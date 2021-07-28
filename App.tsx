import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import { AppRoutes } from './src/routes/app.routes';
import theme from './src/global/styles/theme';
import { StorageProvider, useStorageData } from './src/hooks/storage';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });

  const { isLoadingData } = useStorageData();

  if (!fontsLoaded || isLoadingData) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StorageProvider>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </StorageProvider>
    </ThemeProvider>
  );
}