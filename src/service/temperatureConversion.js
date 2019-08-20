export const celcius = reading => {
  return Math.round(reading);
};

export const fahrenheit = celciusReading => {
  return Math.round((celciusReading * 9) / 5 + 32);
};
