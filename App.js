import React, { useState, useEffect } from 'react';
import { View, StatusBar, Platform, Dimensions, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper'
import Tabs from './src/tabs/Tabs'
import AsyncStorage from '@react-native-community/async-storage'
import { darkTheme } from './src/constants/colors'
import { currencies } from './src/constants/currencies'


const screenHeight = Dimensions.get('screen').height
const windowHeight = Dimensions.get('window').height

const THEME = '@theme'
const FAV_CURRENCIES = '@favCurrencies'

export default function App() {
  const defaultTheme = darkTheme
  const defaultCurrencies = currencies.map(curr => ({ ...curr, isFavorite: false }))

  const getTheme = async () => {
    const theme = await AsyncStorage.getItem(THEME)
    return theme !== null ? JSON.parse(theme) : defaultTheme
  }
  const getDeviceCurrencies = async () => {
    const currencies = await AsyncStorage.getItem(FAV_CURRENCIES)
    return currencies !== null ? JSON.parse(currencies) : defaultCurrencies
  }

  const [ appTheme, setAppTheme ] = useState(defaultTheme)
  const [allCurrencies, setAllCurrencies] = useState(defaultCurrencies)
  const [deviceCurrencies, setDeviceCurrencies] = useState([])




  useEffect(() => {
    getTheme().then(setAppTheme).catch(setAppTheme(defaultTheme))
    getDeviceCurrencies().then(setDeviceCurrencies).catch(setDeviceCurrencies(defaultCurrencies))
  }, [])
  const styles = getStyle(appTheme)

  return (
    <PaperProvider>
      <View style={screenHeight < 800 ? { minHeight: screenHeight } : { minHeight: windowHeight }}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        <Tabs
          appTheme={appTheme}
          setAppTheme={setAppTheme}
          deviceCurrencies={deviceCurrencies}
          allCurrencies={allCurrencies}
          setAllCurrencies={setAllCurrencies}
          FAV_CURRENCIES={FAV_CURRENCIES}
          THEME={THEME}
        />
      </View>
    </PaperProvider>
  );
}

const getStyle = theme => (
  console.log(theme.name),
  StyleSheet.create({
    statusBarUnderlay: {
      height: 28,
      backgroundColor: theme.secondary,
    }
  })
)