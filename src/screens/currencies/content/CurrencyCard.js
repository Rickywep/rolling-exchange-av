import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

import flags from '../../../constants/flags'
import { getCurrencySymbol, getCurrencyName, getExchange } from '../../../utils/currencyFunctions'

const CurrencyCard = ({ name, flag, appTheme, fromCurrency, amount, lastRates }) => {
  const styles = getStyle(appTheme)
  let url = ''
  let rate = 0
  switch (flag) {
    case 'ars':
      url = flags.ars
      rate = lastRates.rates.ARS
      break
    case 'eur':
      url = flags.eur
      rate = lastRates.rates.EUR
      break
    case 'jpy':
      url = flags.jpy
      rate = lastRates.rates.JPY
      break
    case 'usd':
      url = flags.usd
      rate = lastRates.rates.USD
      break
    case 'gbp':
      url = flags.gbp
      rate = lastRates.rates.GBP
      break
    case 'aud':
      url = flags.aud
      rate = lastRates.rates.AUD
      break
    case 'cad':
      url = flags.cad
      rate = lastRates.rates.CAD
      break
    case 'chf':
      url = flags.chf
      rate = lastRates.rates.CHF
      break
    case 'cnh':
      url = flags.cnh
      rate = lastRates.rates.CNH
      break
    case 'uyu':
      url = flags.uyu
      rate = lastRates.rates.UYU
      break
    case 'clp':
      url = flags.clp
      rate = lastRates.rates.CLP
      break
  }

  return (
    <View style={styles.card}>
      <View style={styles.leftContainer}>
        <Image
          source={url}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.rightContainer}>
        {
          amount !== '' ?
            <>
              <Text style={styles.text}>{getCurrencySymbol(flag)} {getExchange(fromCurrency, flag, rate, amount)}</Text>
              <Text style={styles.text}>{getCurrencyName(flag)}</Text>
            </>
            :
            null
        }
      </View>
    </View>
  )
}

const getStyle = theme => (
  StyleSheet.create({
    card: {
      backgroundColor: theme.container,
      padding: 25,
      margin: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    text: {
      color: theme.textPrimary,
    },
    leftContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-end',
    }
  })
)

export default CurrencyCard