// Encrypt function
export const encrypt = (text: string, shift: number) => {
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      // Uppercase letters
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      // Lowercase letters
      else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
      // Non-alphabetic characters
      return char;
    })
    .join("");
};

// Decrypt function
export const decrypt = (text: string, shift: number) => {
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      // Uppercase letters
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
      }
      // Lowercase letters
      else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
      }
      // Non-alphabetic characters
      return char;
    })
    .join("");
};
