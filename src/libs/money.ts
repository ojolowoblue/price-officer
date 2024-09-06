const currencySymbols = {
  NGN: '₦',
};

/**
 * Get symbol for a currency code
 */
export function getCurrencyCodeSymbol(currencyCode = '') {
  return currencySymbols[currencyCode as keyof typeof currencySymbols] || currencyCode;
}

export const MAIN_CURRENCY = 'NGN';

/**
 * Format a number to a money representation
 */
export function formatMoneyNoCurrency(amount: number, type = 'fiat', options: Intl.NumberFormatOptions = {}) {
  switch (type) {
    case 'fiat':
      options = {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        ...options,
      };
      break;
    case 'digital':
    case 'cypto':
      options = {
        style: 'decimal',
        minimumFractionDigits: amount === 0 ? 2 : 0,
        maximumFractionDigits: 8,
        ...options,
      };
      break;
    default:
      options = {
        style: 'decimal',
        minimumFractionDigits: amount === 0 ? 2 : 0,
        ...options,
      };
      break;
  }
  const formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(amount);
}

/**
 * Format a money input value
 */
export function formatMoneyInput(value: string, decimalPlaces: number = 2) {
  const integerValue = value.includes('.') ? value.slice(0, value.indexOf('.')) : value;
  const decimalValue = String(value.slice(value.indexOf('.'), value.length));

  if (Number(decimalValue) !== 0 && decimalValue.length + 1 > decimalPlaces) {
    return formatMoneyNoCurrency(Number(value), undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimalPlaces,
    });
  }

  return `${formatMoneyNoCurrency(Number(integerValue), undefined, {
    minimumFractionDigits: 0,
  })}${decimalValue.startsWith('.') ? decimalValue : ''}`;
}

/**
 * Parse a formatted money str value to a number
 * @param moneyString
 */
export function parseFormattedMoneyStrToNumber(moneyString: string) {
  return Number(moneyString.replace(/,/g, ''));
}

/**
 * Parse a formatted money str value to a number string
 * @param moneyString
 */
export function parseFormattedMoneyStrToNumberStr(moneyString: string) {
  const integerValue = moneyString.includes('.') ? moneyString.slice(0, moneyString.indexOf('.')) : moneyString;
  const decimalValue = String(moneyString.slice(moneyString.indexOf('.'), moneyString.length));
  return `${parseFormattedMoneyStrToNumber(integerValue)}${decimalValue.startsWith('.') ? decimalValue : ''}`;
}

/**
 * Format a money value from a number to a money representation with a currency
 */
export function formatMoney(
  amount: number,
  type = 'fiat',
  currency: string = 'NGN',
  options: Intl.NumberFormatOptions = { maximumFractionDigits: 0, minimumFractionDigits: 0 },
) {
  const money = formatMoneyNoCurrency(amount, type, options);
  return type === 'fiat' ? `${getCurrencyCodeSymbol(currency)} ${money}` : `${money} ${currency}`;
}

export function formatNumber(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
