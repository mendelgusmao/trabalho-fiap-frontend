import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_SOCKET_URL);

export function setupSocketListeners({
  bidCreated,
}) {
  socket.on("bidCreated", bidCreated);
}

export function cleanupSocketListeners() {
  socket.off("bidCreated");
}
