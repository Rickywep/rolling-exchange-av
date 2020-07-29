import React, { useState } from 'react';
import { View, StatusBar, Platform, Dimensions } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper'
import Tabs from './src/tabs/Tabs'
import { darkTheme as defaultTheme } from './src/constants/colors'

const windowHeigh = Dimensions.get('window').height

export default function App() {
  
  const [ appTheme ] = useState(defaultTheme)

  return (
    <PaperProvider>
      <View style={{ minHeight: windowHeigh }}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' && <View style={getStyle(appTheme, 'statusBarUnderlay')} />}
        <Tabs/>
      </View>
    </PaperProvider>
  );
}

const getStyle = (theme, component) => {
  switch(component) {
    case 'statusBarUnderlay':
      return({
        height: 28,
        backgroundColor: theme.secondary,
      })
  }
}