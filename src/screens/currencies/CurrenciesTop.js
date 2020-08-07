import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

const CurrenciesTop = ({ appTheme, fromCurrency, setFromCurrency, amount, setAmount, updateRates }) => {
  const styles = getStyle(appTheme)
  const [ showSelection, setShowSelection ] = useState(false)
  const requireFlag = {
    ars: require('../../assets/flags/ars.png'),
    usd: require('../../assets/flags/usd.png'),
    eur: require('../../assets/flags/eur.png'),
    jpy: require('../../assets/flags/jpy.png'),
  }
  const onHandleShowSelection = () => {
    setShowSelection(!showSelection)
  }
  const onHandleSelectCurrency = currency => {
    setFromCurrency(currency)
    setShowSelection(!showSelection)
    updateRates()
  }

  return(
    <>
      <View style={styles.topContainer}>
        <View style={styles.fromCurrency}>
          <TouchableOpacity style={styles.fromCurrencyButton} onPress={onHandleShowSelection}>
            <Image
              source={requireFlag[fromCurrency]}
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.fromCurrencyName}>{fromCurrency.toUpperCase()}</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          keyboardType='numeric'
          label="¿Cuanto queres convertir?"
          value={amount}
          onChangeText={input => setAmount(input)}
        />
        {
          amount !== '' ?
            <Button onPress={() => setAmount('')} icon='close' color={appTheme.link} />
          :
            <View style={{ width: 65 }} />
        }
      </View>
      {
        showSelection &&
        <View style={styles.selection}>
          <Text style={styles.selectionText}>Seleccioná una moneda</Text>
          <View style={styles.selectionCurrencies}>
            <View style={styles.selectionCurrencyButton}>
              <TouchableOpacity onPress={() => onHandleSelectCurrency('ars')}>
                <Image
                  source={requireFlag['ars']}
                  style={{ width: 50, height: 50 }}
                />
                <Text style={styles.fromCurrencyName}>{'ars'.toUpperCase()}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.selectionCurrencyButton}>
              <TouchableOpacity onPress={() => onHandleSelectCurrency('usd')}>
                <Image
                  source={requireFlag['usd']}
                  style={{ width: 50, height: 50 }}
                />
                <Text style={styles.fromCurrencyName}>{'usd'.toUpperCase()}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.selectionCurrencyButton}>
              <TouchableOpacity onPress={() => onHandleSelectCurrency('eur')}>
                <Image
                  source={requireFlag['eur']}
                  style={{ width: 50, height: 50 }}
                />
                <Text style={styles.fromCurrencyName}>{'eur'.toUpperCase()}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.selectionCurrencyButton}>
            <TouchableOpacity onPress={() => onHandleSelectCurrency('jpy')}>
              <Image
                source={requireFlag['jpy']}
                style={{ width: 50, height: 50 }}
              />
              <Text style={styles.fromCurrencyName}>{'jpy'.toUpperCase()}</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    </>
  )
}

const getStyle = theme => ({
  topContainer: {
    flex: 1.6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: theme.background,
  },
  input: {
    width: '60%',
    paddingBottom: 10,
    height: 60
  },
  fromCurrency: {
    width: '20%',
    paddingBottom: 10,
    height: 60,
    marginRight: 1,
    alignItems: 'center',
  },
  fromCurrencyName: {
    color: theme.link,
    textAlign: 'center',
    marginTop: 5,
  },
  selection: {
    width: '100%',
    backgroundColor: theme.secondary,
  },
  selectionText: {
    color: theme.textSecondary,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  selectionCurrencies: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '25%',
    width: '100%',
    paddingBottom: 10,
  },
  selectionCurrencyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '25%',
    paddingTop: 10,
  },
  fromCurrencyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: 60,
  }
})

export default CurrenciesTop