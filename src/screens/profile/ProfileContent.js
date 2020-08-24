import React from 'react';
import { Title, Button } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { View, Text } from 'react-native';

const ProfileContent = ({ appTheme }) => {

    const styles = getStyle(appTheme)

    return (
        <View style={styles.container}>
            <Title style={styles.text}>Tus Cuentas</Title>
            <View style={styles.card}>
                <View style={styles.leftContainer}>
                    <Title style={styles.text}>
                        <AwesomeIcon name='dollar' />800
                    </Title>
                    <Text style={styles.text}>Cuenta en dolares</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Button color={appTheme.link}>
                        <AwesomeIcon name='ellipsis-v' style={{ marginRight: 10 }} />
                    </Button>
                </View>
            </View>
            <View style={styles.card}>
                <View style={styles.leftContainer}>
                    <Title style={styles.text}>
                        <AwesomeIcon name='euro' />1900
                    </Title>
                    <Text style={styles.text}>Cuenta en dolares</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Button color={appTheme.link}>
                        <AwesomeIcon name='ellipsis-v' style={{ marginRight: 10 }} />
                    </Button>
                </View>
            </View>
            <View style={styles.card}>
                <View style={styles.leftContainer}>
                    <Title style={styles.text}>
                        <AwesomeIcon name='yen' />55
                    </Title>
                    <Text style={styles.text}>Cuenta en dolares</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Button color={appTheme.link}>
                        <AwesomeIcon name='ellipsis-v' style={{ marginRight: 10 }} />
                    </Button>
                </View>
            </View>
        </View>
    )
}

const getStyle = theme => ({
    container:{
        backgroundColor: theme.secondary,
        height: '100%'
    },
    card: {
        backgroundColor: theme.container,
        width: '90%',
        padding: 25,
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: theme.textPrimary,
        marginLeft: 10,
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
    }
})

export default ProfileContent;