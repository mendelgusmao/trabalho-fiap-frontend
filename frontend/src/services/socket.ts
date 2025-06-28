import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_SOCKET_URL);

export function setupSocketListeners({
  onNewBid,
}) {
  socket.on("onNewBid", onNewBid);
}

export function cleanupSocketListeners() {
  socket.off("onNewBid");
}
