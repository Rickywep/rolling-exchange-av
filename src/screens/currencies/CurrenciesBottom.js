import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-paper'

const CurrenciesBottom = ({ appTheme, updateRates, lastRates }) => {
  
  const styles = getStyle(appTheme)

  return(
    <View style={styles.bottomContainer}>
      
      <View>
        <Text style={styles.updateText}>Ultima actualización</Text>
        <Text style={styles.updateText}>{moment(lastRates.date).locale('es').format('LL')}   -   {lastRates.hour}</Text>
      </View>
      <Button
        color={appTheme.link}
        icon="update"
        style={styles.button}
        onPress={updateRates}
      />
    </View>
  )
}

const getStyle = theme => (
  StyleSheet.create({
    bottomContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%',
      backgroundColor: theme.background,
    },
    updateText: {
      color: theme.textPrimary,
      textAlign: 'left',
      marginLeft: 30
    },
    button: {
      paddingLeft: 15,
      marginRight: 15
    }
  })
) 

export default CurrenciesBottom