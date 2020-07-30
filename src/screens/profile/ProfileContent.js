import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';

const ProfileContent = ({ appTheme }) => {
    return (
        <View style={getStyle(appTheme, 'profileContent')}>
            <Title style={getStyle(appTheme, 'cuentasText')}>Tus Cuentas</Title>
            <Card style={getStyle(appTheme, 'cuentas')}>
                <Card.Content style={getStyle(appTheme, 'cuentasContainer')}>
                    <Title style={getStyle(appTheme, 'cuentasText')}>
                        <AwesomeIcon name='dollar' style={{ marginRight: "2px", fontSize: "1.3rem" }} />800
                        <br />
                        <Paragraph>Cuenta en dolares</Paragraph>
                    </Title>
                    <AwesomeIcon name='ellipsis-v' style={{ marginRight: "10px", fontSize: "1.3rem" }} />
                </Card.Content>
            </Card>
            <Card style={getStyle(appTheme, 'cuentas')}>
                <Card.Content style={getStyle(appTheme, 'cuentasContainer')}>
                    <Title style={getStyle(appTheme, 'cuentasText')}>
                        <AwesomeIcon name='euro' style={{ marginRight: "2px", fontSize: "1.3rem" }} />1900
                        <br />
                        <Paragraph>Cuenta en euros</Paragraph>
                    </Title>
                    <AwesomeIcon name='ellipsis-v' style={{ marginRight: "10px", fontSize: "1.3rem" }} />
                </Card.Content>
            </Card>
            <Card style={getStyle(appTheme, 'cuentas')}>
                <Card.Content style={getStyle(appTheme, 'cuentasContainer')}>
                    <Title style={getStyle(appTheme, 'cuentasText')}>
                        <AwesomeIcon name='yen' style={{ marginRight: "2px", fontSize: "1.3rem" }} />55
                        <br />
                        <Paragraph>Cuenta en yenes</Paragraph>
                    </Title>
                    <AwesomeIcon name='ellipsis-v' style={{ marginRight: "10px", fontSize: "1.3rem" }} />
                </Card.Content>
            </Card>
        </View>
    );
};

const getStyle = (theme, component) => {
    switch (component) {
        case 'profileContent':
            return ({
                flex: 8,
                backgroundColor: theme.primary,
                width: '100%',
            })
        case 'cuentas':
            return ({
                backgroundColor: theme.container,
                margin: '20px',
            })
        case 'cuentasContainer':
            return ({
                backgroundColor: theme.container,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between'
            })
        case 'cuentasText':
            return ({
                color: theme.link,
                marginLeft: 12
            })
    }
}

export default ProfileContent;