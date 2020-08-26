import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { currencies } from '../../constants/currencies'

const CurrenciesTop = ({ appTheme, fromCurrency, setFromCurrency, amount, setAmount, updateRates }) => {
  const styles = getStyle(appTheme)
  const [showSelection, setShowSelection] = useState(false)
  const requireFlag = {
    ars: require('../../assets/flags/ars.png'),
    eur: require('../../assets/flags/eur.png'),
    jpy: require('../../assets/flags/jpy.png'),
    usd: require('../../assets/flags/usd.png'),
    aud: require('../../assets/flags/aud.png'),
    cad: require('../../assets/flags/cad.png'),
    chf: require('../../assets/flags/chf.png'),
    clp: require('../../assets/flags/clp.png'),
    cnh: require('../../assets/flags/cnh.png'),
    gbp: require('../../assets/flags/gbp.png'),
    uyu: require('../../assets/flags/uyu.png'),
  }
  const onHandleShowSelection = () => {
    setShowSelection(!showSelection)
  }
  const onHandleSelectCurrency = currency => {
    setFromCurrency(currency)
    setShowSelection(!showSelection)
    updateRates()
  }

  return (
    <>
      <View style={styles.topContainer}>
        <View style={styles.fromCurrency}>
          <TouchableOpacity style={styles.fromCurrencyButton} onPress={onHandleShowSelection}>
            <Image
              source={requireFlag[fromCurrency]}
              style={{ width: 50, height: 50 }}
            />
            <Text>{fromCurrency.toUpperCase()}</Text>
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
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {
                  currencies.map(x =>
                    <TouchableOpacity key={x.name} onPress={() => onHandleSelectCurrency(x.currency)}>
                      <Image
                        source={x.image}
                        style={{ width: 50, height: 50, marginLeft: 20 }}
                      />
                      <Text style={styles.fromCurrencyName}>{x.currency.toUpperCase()}</Text>
                    </TouchableOpacity>
                  )
                }
              </ScrollView>
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
    marginLeft: 20
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
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingTop: 10,
    paddingBottom: 10,

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