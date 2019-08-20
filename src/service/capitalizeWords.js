export const capitalizeWords = string => {
  const words = string.split(" ");
  let result = [];

  for (let word of words) {
    result.push(word[0].toUpperCase() + word.slice(1));
  }
  return result.join(" ");
};
