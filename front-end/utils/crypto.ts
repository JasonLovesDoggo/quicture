export function GenerateHash() {
  // Generate a random array of 32 bytes
  const randomBytes = new Uint8Array(32);
  window.crypto.getRandomValues(randomBytes);

  // Convert the array of bytes to a hexadecimal string
  let hashHex = '';
  randomBytes.forEach(byte => {
    hashHex += ('0' + byte.toString(16)).slice(-2);
  });

  // Convert hexadecimal string to base64
  const hashBase64 = btoa(hashHex);

  // Remove any non-alphanumeric characters from the base64 string and '=' padding
  const alphanumericHash = hashBase64.replace(/[^a-zA-Z0-9]/g, '').replace(/=+$/, '');

  return alphanumericHash.substring(0, 32);
}

export function validateHash(hash: string) {
  return /^[a-zA-Z0-9]{32}$/.test(hash);
}
