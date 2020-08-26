import React, { useState } from 'react';
import { View, StatusBar, Platform, Dimensions,StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper'
import Tabs from './src/tabs/Tabs'
import { darkTheme as defaultTheme } from './src/constants/colors'

const screenHeight = Dimensions.get('screen').height
const windowHeight = Dimensions.get('window').height 

export default function App() {
  
  const [ appTheme ] = useState(defaultTheme)
  const styles = getStyle(appTheme)

  return (
    <PaperProvider>
      <View style={screenHeight < 800 ?  {minHeight: screenHeight} : {minHeight: windowHeight} }>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' &&  <View style={styles.statusBarUnderlay} />}
        <Tabs/>
      </View>
    </PaperProvider>
  );
}

const getStyle = theme => (
  StyleSheet.create({
    statusBarUnderlay: {
      height: 28,
      backgroundColor: theme.background,
    }
  })
)