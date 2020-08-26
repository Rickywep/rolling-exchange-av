import React, { Fragment } from 'react'
import ProfileTop from '../screens/profile/ProfileTop'
import ProfileContent from '../screens/profile/ProfileContent'

export default ({ appTheme, updateTheme }) => {
    return (
        <Fragment>
            <ProfileTop
                appTheme={appTheme}
                updateTheme={updateTheme}
            />
            <ProfileContent
                appTheme={appTheme}
            />
        </Fragment>
    )
}
