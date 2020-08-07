import React, { useState } from 'react'
import { View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

const FavoritesTop = ({ appTheme, goCurrency }) => {
  const styles = getStyle(appTheme)
  const [ input, setInput ] = useState('')

  return(
    <View style={styles.favoritesSearchbar}>
      <Button
        onPress={goCurrency}
        color={appTheme.link}
        icon="keyboard-backspace"
      />
      <TextInput
        style={styles.input}
        label="¿Que moneda estás buscando?"
        value={input}
        onChangeText={input => setInput(input)}
      />
    </View>
  )
}

const getStyle = theme => ({
  favoritesSearchbar: {
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
  }
})

export default FavoritesTop