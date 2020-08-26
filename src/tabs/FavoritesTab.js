import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FavoritesTop from '../screens/favorites/FavoritesTop';
import FavoritesContainer from '../screens/favorites/content/FavoritesContainer';

export default ({ appTheme, allCurrencies, addFavoriteCurrency, updateCurrency, searchCurrency }) => {
    const navigation = useNavigation();
    const goCurrency = () => navigation.navigate('Currency')

    return (
        <>
            <FavoritesTop
                appTheme={appTheme}
                goCurrency={goCurrency}
                searchCurrency={searchCurrency}
            />
            <FavoritesContainer
                appTheme={appTheme}
                allCurrencies={allCurrencies}
                addFavoriteCurrency={addFavoriteCurrency}
                updateCurrency={updateCurrency}
            />
        </>
    );
}