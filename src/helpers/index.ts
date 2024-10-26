/**
 * Decode string
 */
export const encodeString = (str: string) =>
  btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));

/**
 * Decode string
 */
export const decodeString = (str: string) =>
  decodeURIComponent(
    Array.prototype.map.call(atob(str), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''),
  );

export function generateUniqueIdentifier() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < 15; i++) {
    // length of the desired string
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
