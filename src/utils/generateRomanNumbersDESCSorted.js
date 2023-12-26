const romanNumerals = [
  { value: 1000, numeral: 'M' },
  { value: 900, numeral: 'CM' },
  { value: 500, numeral: 'D' },
  { value: 400, numeral: 'CD' },
  { value: 100, numeral: 'C' },
  { value: 90, numeral: 'XC' },
  { value: 50, numeral: 'L' },
  { value: 40, numeral: 'XL' },
  { value: 10, numeral: 'X' },
  { value: 9, numeral: 'IX' },
  { value: 5, numeral: 'V' },
  { value: 4, numeral: 'IV' },
  { value: 1, numeral: 'I' },
];

export const generateRomanNumbersDESCSorted = (maxNumber) => {
  const result = [];

  for (let i = maxNumber - 1; i >= 0; i--) {
    let currentNumber = i;
    let romanRepresentation = '';

    for (let j = 0; j < romanNumerals.length; j++) {
      const { value, numeral } = romanNumerals[j];

      while (currentNumber >= value) {
        romanRepresentation += numeral;
        currentNumber -= value;
      }
    }
    if (romanRepresentation !== '') {
      result.push(romanRepresentation);
    } else {
      result.push('0');
    }
    
  }
  return result;
}