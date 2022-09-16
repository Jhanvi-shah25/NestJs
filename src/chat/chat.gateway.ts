import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";

@WebSocketGateway(3001,{cors:true})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  constructor(private chatService:ChatService){}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: any): void {
    var people={};
    people["id"] =  client.id;
    console.log(people)
    this.logger.log(`got new event`,payload);
    console.log(payload.message,payload.id)
    this.chatService.saveData(payload);
    client.broadcast.emit('msgToClient',payload)
  }

  afterInit(server: Server) {
    this.logger.log('Init');
    console.log('user connected');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    client.emit('connected', 'Successfully connected to the server.');
    this.logger.log(`Client connected: ${client.id}`);
  }


}
