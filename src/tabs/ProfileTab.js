import React from 'react'
import { View, Text } from 'react-native'
import ProfileTop from '../screens/profile/ProfileTop'

export default function ProfileTab({appTheme, updateTheme}) {
    return (
        <ProfileTop 
            appTheme={appTheme}
            updateTheme={updateTheme}
        />
    )
}
