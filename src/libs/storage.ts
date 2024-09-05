import { decodeString, encodeString } from '@/helpers';

const STORAGE = localStorage;

const storage = {
  get(key: string) {
    const item = STORAGE.getItem(key);
    return item ? JSON.parse(decodeString(item)) : null;
  },
  set(key: string, value: Object) {
    STORAGE.setItem(key, encodeString(JSON.stringify(value)));
  },
  remove(key: string) {
    STORAGE.removeItem(key);
  },
  clear() {
    STORAGE.clear();
  },
};

export default storage;
