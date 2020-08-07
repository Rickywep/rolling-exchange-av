import React, { Fragment } from 'react'
import { View, Text, Platform } from 'react-native'
import { Button, Appbar, Avatar } from 'react-native-paper'

export default function ProfileTop({ appTheme, updateTheme }) {
    return (
        <Fragment>
            <Appbar.Header style={getStyle(appTheme, 'headerProfile')}>
                <Avatar.Image 
                    size={40} 
                    style={{ marginLeft: 10, backgroundColor: 'white' }} 
                    source={require('../../assets/user.png')}
                />
                <Appbar.Content title="Ricardo Moreno" subtitle={'Ultima actualización 4 de 30 de Julio de 200'} />
                <Button
                    color={appTheme.link}
                    icon="theme-light-dark"
                    style={getStyle(appTheme, 'button')}
                    onPress={updateTheme}
                />
            </Appbar.Header>
        </Fragment>
    )
}

const getStyle = (theme, component) => {
    switch (component) {
        case 'headerProfile':
            return ({
                backgroundColor: theme.background,
                height: 100,

            })
        case 'button':
            return ({
                paddingLeft: 10,
            })
    }
}
