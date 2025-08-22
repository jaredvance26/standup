export const hashStringToNumber = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 17) - hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  // Make sure it's positive
  return Math.abs(hash);
};
