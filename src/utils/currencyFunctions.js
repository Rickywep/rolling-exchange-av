export const getCurrencySymbol = (currency) => {
  switch (currency) {
    case 'ars':
      return '$'
    case 'usd':
      return 'u$s'
    case 'eur':
      return '€'
    case 'jpy':
      return '¥'
    case 'gbp':
      return '£'
    case 'aud':
      return 'A$'
    case 'cad':
      return 'C$'
    case 'chf':
      return 'SFr'
    case 'cnh':
      return '¥'
    case 'uyu':
      return '$'
    case 'clp':
      return '$'
  }
}

export const getCurrencyName = (currency) => {
  switch (currency) {
    case 'ars':
      return 'pesos argentinos'
    case 'usd':
      return 'dolares estadounidenses'
    case 'eur':
      return 'euros'
    case 'jpy':
      return 'yenes japoneses'
    case 'gbp':
      return 'libra esterlina'
    case 'aud':
      return 'dolares australianos'
    case 'cad':
      return 'dolares canadienses'
    case 'chf':
      return 'franco suizo'
    case 'cnh':
      return 'yuan chino'
    case 'uyu':
      return 'pesos uruguayos'
    case 'clp':
      return 'pesos chilenos'
  }
}


const exchange = {
  ars: {
    ars: (amount, rate) => amount * 1,
    usd: (amount, rate) => amount * rate,
    eur: (amount, rate) => amount * rate,
    jpy: (amount, rate) => amount * rate,
    gbp: (amount, rate) => amount * rate,
    aud: (amount, rate) => amount * rate,
    cad: (amount, rate) => amount * rate,
    chf: (amount, rate) => amount * rate,
    cnh: (amount, rate) => amount * rate,
    uyu: (amount, rate) => amount * rate,
    clp: (amount, rate) => amount * rate,
  },
  usd: {
    ars: (amount, rate) => amount * rate * 1.30,
    usd: (amount, rate) => amount * 1,
    eur: (amount, rate) => amount * rate,
    jpy: (amount, rate) => amount * rate,
    gbp: (amount, rate) => amount * rate,
    aud: (amount, rate) => amount * rate,
    cad: (amount, rate) => amount * rate,
    chf: (amount, rate) => amount * rate,
    cnh: (amount, rate) => amount * rate,
    uyu: (amount, rate) => amount * rate,
    clp: (amount, rate) => amount * rate,
  },
  eur: {
    ars: (amount, rate) => amount * rate,
    usd: (amount, rate) => amount * rate,
    eur: (amount, rate) => amount * 1,
    jpy: (amount, rate) => amount * rate,
    gbp: (amount, rate) => amount * rate,
    aud: (amount, rate) => amount * rate,
    cad: (amount, rate) => amount * rate,
    chf: (amount, rate) => amount * rate,
    cnh: (amount, rate) => amount * rate,
    uyu: (amount, rate) => amount * rate,
    clp: (amount, rate) => amount * rate,
  },
  jpy: {
    ars: (amount, rate) => amount * rate,
    usd: (amount, rate) => amount * rate,
    eur: (amount, rate) => amount * rate,
    jpy: (amount, rate) => amount * 1,
    gbp: (amount, rate) => amount * rate,
    aud: (amount, rate) => amount * rate,
    cad: (amount, rate) => amount * rate,
    chf: (amount, rate) => amount * rate,
    cnh: (amount, rate) => amount * rate,
    uyu: (amount, rate) => amount * rate,
    clp: (amount, rate) => amount * rate,
  },
  gbp: {
    ars: (amount, rate) => amount * rate,
    usd: (amount, rate) => amount * rate,
    eur: (amount, rate) => amount * rate,
    jpy: (amount, rate) => amount * rate,
    gbp: (amount, rate) => amount * 1,
    aud: (amount, rate) => amount * rate,
    cad: (amount, rate) => amount * rate,
    chf: (amount, rate) => amount * rate,
    cnh: (amount, rate) => amount * rate,
    uyu: (amount, rate) => amount * rate,
    clp: (amount, rate) => amount * rate,
  },
  aud: {
    ars: (amount, rate) => amount * rate,
    usd: (amount, rate) => amount * rate,
    eur: (amount, rate) => amount * rate,
    jpy: (amount, rate) => amount * rate,
    gbp: (amount, rate) => amount * rate,
    aud: (amount, rate) => amount * 1,
    cad: (amount, rate) => amount * rate,
    chf: (amount, rate) => amount * rate,
    cnh: (amount, rate) => amount * rate,
    uyu: (amount, rate) => amount * rate,
    clp: (amount, rate) => amount * rate,
  },
  cad: {
    ars: (amount, rate) => amount * rate,
    usd: (amount, rate) => amount * rate,
    eur: (amount, rate) => amount * rate,
    jpy: (amount, rate) => amount * rate,
    gbp: (amount, rate) => amount * rate,
    aud: (amount, rate) => amount * rate,
    cad: (amount, rate) => amount * 1,
    chf: (amount, rate) => amount * rate,
    cnh: (amount, rate) => amount * rate,
    uyu: (amount, rate) => amount * rate,
    clp: (amount, rate) => amount * rate,
  },
  chf: {
    ars: (amount, rate) => amount * rate,
    usd: (amount, rate) => amount * rate,
    eur: (amount, rate) => amount * rate,
    jpy: (amount, rate) => amount * rate,
    gbp: (amount, rate) => amount * rate,
    aud: (amount, rate) => amount * rate,
    cad: (amount, rate) => amount * rate,
    chf: (amount, rate) => amount * 1,
    cnh: (amount, rate) => amount * rate,
    uyu: (amount, rate) => amount * rate,
    clp: (amount, rate) => amount * rate,
  },
  cnh: {
    ars: (amount, rate) => amount * rate,
    usd: (amount, rate) => amount * rate,
    eur: (amount, rate) => amount * rate,
    jpy: (amount, rate) => amount * rate,
    gbp: (amount, rate) => amount * rate,
    aud: (amount, rate) => amount * rate,
    cad: (amount, rate) => amount * rate,
    chf: (amount, rate) => amount * rate,
    cnh: (amount, rate) => amount * 1,
    uyu: (amount, rate) => amount * rate,
    clp: (amount, rate) => amount * rate,
  },
  uyu: {
    ars: (amount, rate) => amount * rate,
    usd: (amount, rate) => amount * rate,
    eur: (amount, rate) => amount * rate,
    jpy: (amount, rate) => amount * rate,
    gbp: (amount, rate) => amount * rate,
    aud: (amount, rate) => amount * rate,
    cad: (amount, rate) => amount * rate,
    chf: (amount, rate) => amount * rate,
    cnh: (amount, rate) => amount * rate,
    uyu: (amount, rate) => amount * 1,
    clp: (amount, rate) => amount * rate,
  },
  clp: {
    ars: (amount, rate) => amount * rate,
    usd: (amount, rate) => amount * rate,
    eur: (amount, rate) => amount * rate,
    jpy: (amount, rate) => amount * rate,
    gbp: (amount, rate) => amount * rate,
    aud: (amount, rate) => amount * rate,
    cad: (amount, rate) => amount * rate,
    chf: (amount, rate) => amount * rate,
    cnh: (amount, rate) => amount * rate,
    uyu: (amount, rate) => amount * rate,
    clp: (amount, rate) => amount * 1,
  },
}

export const getExchange = (fromCurrency, toCurrency, rate, amount) => (
  exchange[fromCurrency][toCurrency](amount, rate).toFixed(2)
)