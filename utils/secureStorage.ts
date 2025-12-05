
export const SecureStorage = {
  SALT: 'NEXUS_CORE_V1_',

  encrypt: (data: any): string => {
    try {
      const json = JSON.stringify(data);
      // Simple obfuscation layer to prevent casual inspection
      // In a real production environment, use Web Crypto API
      const b64 = btoa(unescape(encodeURIComponent(json)));
      return b64.split('').reverse().join('');
    } catch (e) {
      console.error("Encryption failed", e);
      return "";
    }
  },

  decrypt: (cipher: string): any => {
    try {
      const reversed = cipher.split('').reverse().join('');
      const json = decodeURIComponent(escape(atob(reversed)));
      return JSON.parse(json);
    } catch (e) {
      console.error("Decryption failed", e);
      return null;
    }
  },

  setItem: (key: string, data: any) => {
    const cipher = SecureStorage.encrypt(data);
    localStorage.setItem(SecureStorage.SALT + key, cipher);
  },

  getItem: (key: string) => {
    const cipher = localStorage.getItem(SecureStorage.SALT + key);
    if (!cipher) return null;
    return SecureStorage.decrypt(cipher);
  }
};
