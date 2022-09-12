import { Bind, OnModuleInit } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { NestGateway } from "@nestjs/websockets/interfaces/nest-gateway.interface";
import { ChatService } from "./chat.service";
import { ChatDto } from "./dto/chatmessage.dto";

// @WebSocketGateway({ cors: { origin: ['http://localhost:3000/chat', 'http://localhost:4200'] } })

// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit{
//     constructor(private chatService : ChatService){

//     }
//     handleDisconnect(client: any) {
//         throw new Error("Method not implemented.");
//     }
//     onModuleInit() {
//         throw new Error("Method not implemented.");
//     }

//     afterInit(server:any){
//         console.log('Initialized',server);
//     }

//     handleConnection
// }



@WebSocketGateway()
export class ChatGateway implements NestGateway {
  constructor(private chatService: ChatService) { }

  afterInit(server: any) {
    console.log('Init', server);
  }

  handleConnection(socket: any) {
    const query = socket.handshake.query;
    console.log('Connect', query);
    this.chatService.userConnected(query.userName, query.registrationToken);
    process.nextTick(async () => {
      socket.emit('allChats', await this.chatService.getChats());
    });
  }

  handleDisconnect(socket: any) {
    const query = socket.handshake.query;
    console.log('Disconnect', socket.handshake.query);
    this.chatService.userDisconnected(query.userName);
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('chat')
  async handleNewMessage(chat: ChatDto, sender: any) {
    console.log('New Chat', chat);
    await this.chatService.saveData(chat);
    sender.emit('newChat', chat);
    sender.broadcast.emit('newChat', chat);
  }
}
