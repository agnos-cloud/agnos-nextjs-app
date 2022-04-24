import { io } from "socket.io-client";

const socket = io(process.env.WS_URL || "ws://localhost:3000");

export default socket;
