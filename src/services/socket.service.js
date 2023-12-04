import io from "socket.io-client";

const socket = io("https://live-backend-259f2dd4dcb2.herokuapp.com");

export { socket}