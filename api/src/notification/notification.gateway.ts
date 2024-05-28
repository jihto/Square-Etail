import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
import { Logger } from '@nestjs/common'; 
@WebSocketGateway({
  cors: {
    origin: "http://localhost:5173", // Replace this with your React app's URL
    methods: ["GET", "POST"],
    credentials: true,
  },
})
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() io: Server;
    private readonly logger = new Logger(NotificationGateway.name);
    private clients: Map<string, Socket> = new Map(); 
  afterInit(): void {
    this.logger.log("Websocket Gateway initialized");
  }  

  handleConnection(client: Socket) {
    const userId = Array.isArray(client.handshake.query.userId) 
      ? client.handshake.query.userId[0] 
      : client.handshake.query.userId;
    console.log("Connect Socket success: ", userId)
    if (userId) {
      this.clients.set(userId, client);
    }
  }
  
  handleDisconnect(client: Socket) {
    const userId = Array.isArray(client.handshake.query.userId) 
      ? client.handshake.query.userId[0] 
      : client.handshake.query.userId;
    console.log("Disconnect Socket success: ", userId)
    if (userId) {
      this.clients.delete(userId);
    }
  }

  sendNotification(userId: string, message: any) {
    const client = this.clients.get(userId);
    if (client) {
      client.emit('receiveNotification', message);
    }
  }
}
