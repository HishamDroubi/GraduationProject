import io from "socket.io-client";
import { Subject } from "rxjs";
class SocketInstance {
  io = io("http://localhost:3004");
  sockets = new Set();
  newSocket = new Subject();

  constructor() {
    
    this.io.on("connection", (socket) => {
      this.sockets.add(socket);

      this.handleNewSocket(socket);

      socket.on("disconnect", () => {
        this.sockets.delete(socket);
      });

      this.newSocket.next(socket);
    });
  }

  handleNewSocket(socket) {
    // logic here
  }
}

export const socketInstance = new SocketInstance();

