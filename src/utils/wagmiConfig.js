export const conciseAddress = (address, startSlice = 6, endSlice = 3) => {
  if (address) {
    return `${address.slice(0, startSlice)}...${address.slice(address.length - endSlice, address.length)}`;
  }
  return '';
};

export function formatNumberIndianStyle(number) {
  if (number) {
    return number?.toLocaleString('en-IN');
  } else {
    return '0.0';
  }
}

export const sumOfValues = (value) => {
  let initialValue;
  return (initialValue += value);
};
