import { Bind, Logger, OnModuleInit } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { NestGateway } from "@nestjs/websockets/interfaces/nest-gateway.interface";
import { ChatService } from "./chat.service";
import { ChatDto } from "./dto/chatmessage.dto";
import { Server, Socket } from "socket.io";
import { UsersService } from "src/users/users.service"; 

// @WebSocketGateway(3001,{cors : {origin :'*'}})
@WebSocketGateway(3001,{cors:true})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  private Logger = new Logger('ChatGateway')
  userCount : number =0;
  users : string[] =[]

  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) { }

  afterInit(socket:Socket) {
    // console.log('socket data',socket)
    this.Logger.log(`Chat gateway is initialized`,socket.id); 
  }

  async handleConnection(client :Socket) {
    // const query = socket.handshake.query;
    // console.log('Connect', query);
    // this.Logger.log(`New client connected...: ${client.id}`);
    // client.emit('connected', 'Successfully connected to the server.');
    // this.chatService.userConnected(query.userName, query.registrationToken);
    // process.nextTick(async () => {
    //   socket.emit('allChats', await this.chatService.getChats());
    // });
    console.log('in client obj',await client,client.conn.id)
    this.userCount++;
    this.users.push(client.id);
    console.log('client id who is connected',this.users)
    this.Logger.log(`Client connected : ${client.id}`,this.userCount)
  }

  handleDisconnect(client:Socket) {
    // const query = socket.handshake.query;
    // console.log('Disconnect', socket.handshake.query);
    // this.chatService.userDisconnected(query.userName);
    this.userCount--;
    this.users.forEach((id:string,i:number)=>{
      if(id === client.id){
        this.users.splice(i,1);
      }
    })
    console.log('after disconnection',this.users)
    this.Logger.log(`Client disconnected: ${client.id}`); 
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('chat')
  async handleNewMessage(chat: string, client:Socket) {
    // console.log('yes coming from client')
    console.log('message from client', chat);
    // await this.chatService.saveData(chat);
    this.server.emit('chat', chat);
    // this.server.to(client.conn.id).emit('chat',chat);
    // this.server.broadcast.emit('chat', client.id);
  }

  @SubscribeMessage('msgToServer')
    handleMessage(client:Socket, text:string):WsResponse<string> {
        this.Logger.log(`got new event`);
        return {event: 'msgToClient', 'data': text};
    }

  @SubscribeMessage('findAllMessage')
  async findAll(){
    let data = await this.chatService.getChats();
    console.log('from--',data)
    this.server.emit('findAllMessage', data);
    return {event: 'findAllMessage', 'data': data};
    // return data;
  }

  @SubscribeMessage('join')
  joinRoom(@MessageBody('name') name : string,@ConnectedSocket() client:Socket){
    return this.chatService.identify(name,client.id)
  }
  
  //latest step by step

  // private logger: Logger = new Logger('ChatGateway'); 

  // @SubscribeMessage('patientJoin')
  // public async joinRoom(client: Socket, chat : ChatDto) {
  //   this.logger.log("patientJoin", chat);
  //   client.join('waitingRoom');
  //   this.chatService.saveData(chat);

  //   // const activeUsers = await this.userSessionCache.getAllActive();
  //   // this.server.emit('patientList', activeUsers.map(x=> x.userName));
  //   this.server.emit('patientList',this.chatService.getChats());
  // }

  // afterInit(server: Server) {
  //  this.logger.log('Init');
  // }
 
  // handleDisconnect(client: Socket) {
  //  this.logger.log(`Client disconnected: ${client.id}`);
  // }
 
  // handleConnection(client: Socket, ...args: any[]) {
  //  this.logger.log(`Client connected: ${client.id}`);
  // }
}
