// Implement a function that takes the string type of strikePrice
// checks if it's valid using regex, and returns a boolean value
export const validateStrikePriceInput = (strikePrice: string): boolean => {
  const regex = /^(\d{0,5})(\.\d{0,3})?$/;
  return regex.test(strikePrice);
};

// Implement a function that returns a validated value of strike price input from user
// or an empty string if it is invalid
export const restrictStrikeInput = (strikePrice: string): string => {
  return validateStrikePriceInput(strikePrice) ? strikePrice : "";
};
