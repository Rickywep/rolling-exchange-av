import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import CurrencyCard from './CurrencyCard';

const CurrenciesContainer = ({ appTheme, changeScreen, fromCurrency, amount, allCurrencies, lastRates, goTwo }) => {
  const styles = getStyle(appTheme)

  return(
    <View style={styles.currenciesContainer}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <Button onPress={goTwo}>
          <Text style={styles.buttonText}>Agregar nueva moneda</Text>
        </Button>
        {
          allCurrencies.filter(curr => curr.isFavorite).map(fav =>
            <CurrencyCard
              key={fav.name}
              appTheme={appTheme}
              fromCurrency={fromCurrency}
              amount={amount}
              name={fav.name}
              flag={fav.flag}
              lastRates={lastRates}
            />
          )
        }
      </ScrollView>
    </View>
  )
}


const getStyle = theme => ({
  currenciesContainer: {
    flex: 8,
    backgroundColor: theme.secondary,
    width: '100%',
  },
  buttonText: {
    color: theme.link,
  }
})

export default CurrenciesContainer