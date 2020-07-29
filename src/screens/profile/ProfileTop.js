import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'

export default function ProfileTop({ appTheme, updateTheme }) {
    return (
        <View style={getStyle(appTheme, 'headerProfile')}>
            <Text style={getStyle(appTheme, 'textHeaderProfile')}>Hola Ricardo Moreno</Text>
            <View style={getStyle(appTheme, 'bottomContainer')}>
                <Button color={appTheme.link} icon="update" style={getStyle(appTheme, 'button')} />
                <View>
                    <Text style={getStyle(appTheme, 'updateText')}>Ultima actualización</Text>
                    <Text style={getStyle(appTheme, 'updateText')}>4 de Julio de 2020</Text>
                </View>
                <Button
                    color={appTheme.link}
                    icon="theme-light-dark"
                    style={getStyle(appTheme, 'button')}
                    onPress={updateTheme}
                />
            </View>
        </View>
    )
}

const getStyle = (theme, component) => {
    switch (component) {
        case 'headerProfile':
            return ({
                backgroundColor: theme.secondary,
                height: '80px',

            })
        case 'textHeaderProfile':
            return ({
                color: theme.textPrimary,
                textAlign: 'center',
                marginTop: 10,
                fontSize: '1.1rem'
            })
        case 'bottomContainer':
            return ({
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
                width: '100%',
                backgroundColor: theme.secondary,
            })
        case 'updateText':
            return ({
                color: theme.textPrimary,
                fontSize: '0.8rem'
            })
        case 'button':
            return ({
                paddingLeft: 15,
            })
    }
}
