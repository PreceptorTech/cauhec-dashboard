import { io, Socket } from "socket.io-client";

// Create a single socket instance
let socket: Socket | null = null;
let currentUserId: string | null = null;

// Initialize socket connection
export const initializeSocket = (baseURL: string): Socket => {
  console.log("Initializing socket");
  if (socket) return socket;

  socket = io(baseURL, {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("Connected to socket server");

    // If user was logged in before, login again after reconnect
    if (currentUserId) {
      loginUser(currentUserId);
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket server");
  });

  socket.on("connect_error", (error: Error) => {
    console.error("Connection error:", error);
  });

  return socket;
};

// Login user to socket
export const loginUser = (userId: any) => {
  if (!socket || !userId) return;

  currentUserId = userId;
  socket.emit("login", userId);
  console.log(`Logged in user: ${userId}`);

  return socket.id; // Return the socket ID
};

// Set up listener for upload complete event
export const onUploadComplete = (callback: (data: any) => void): void => {
  if (!socket) return;
  socket.on("upload-complete", (data: any) => {
    callback(data);
  });
};

// Remove specific listener
export const removeListener = (
  event: string,
  callback: (...args: any[]) => void
): void => {
  if (!socket) return;

  socket.off(event, callback);
};

// Disconnect socket
export const disconnectSocket = (): void => {
  if (!socket) return;

  socket.disconnect();
  socket = null;
  currentUserId = null;
};

// Get current connection status
export const getConnectionStatus = (): boolean => {
  if (!socket) return false;
  return socket.connected;
};
