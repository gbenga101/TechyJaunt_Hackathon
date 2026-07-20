import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

/**
 * Returns the current Socket.IO instance.
 */
export function getSocket(): Socket | null {
  return socket;
}

/**
 * Sets the active Socket.IO instance.
 */
export function setSocket(instance: Socket | null) {
  socket = instance;
}

export { io };