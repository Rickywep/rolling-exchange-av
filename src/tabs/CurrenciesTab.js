import React from 'react';
import { useNavigation } from '@react-navigation/native';
import CurrenciesTop from '../screens/currencies/CurrenciesTop';
import CurrenciesBottom from '../screens/currencies/CurrenciesBottom'
import CurrenciesContainer from '../screens/currencies/content/CurrenciesContainer';

export default ({ appTheme, fromCurrency, setFromCurrency, amount, setAmount, allCurrencies, updateTheme, updateRates, lastRates }) => {
    const navigation = useNavigation();
    const goCurrencies = () => navigation.navigate('Currencies')
    return (
        <>
            <CurrenciesTop
                appTheme={appTheme}
                fromCurrency={fromCurrency}
                setFromCurrency={setFromCurrency}
                amount={amount}
                setAmount={setAmount}
                updateRates={updateRates}
            />
            <CurrenciesContainer
                appTheme={appTheme}
                fromCurrency={fromCurrency}
                amount={amount}
                goCurrencies={goCurrencies}
                allCurrencies={allCurrencies}
                lastRates={lastRates}
            />
            <CurrenciesBottom
                appTheme={appTheme}
                updateTheme={updateTheme}
                updateRates={updateRates}
                lastRates={lastRates}
            />
        </>
    );
}