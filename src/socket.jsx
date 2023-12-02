import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://149.100.138.125:4141';

export const socket = io(URL, {
    autoConnect: false
  });