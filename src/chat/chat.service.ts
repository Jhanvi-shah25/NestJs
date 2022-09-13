import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomError } from 'src/common/helpers/exceptions';
import { ChatDto } from './dto/chatmessage.dto';
import { Chat, ChatDocument } from './schemas/chatmessage.schema';

@Injectable()
export class ChatService {

    constructor(@InjectModel(Chat.name) private chatModel : Model<ChatDocument>){}

    private allUsers = [];
    private clientUser = {};
    connectedUsers = [];

    async getChats() {
        return await this.chatModel.find().lean();
    }

    async getSingleInfo(id : string){
        return await this.chatModel.findOne({
            _id : id
        }).lean();
    }

    identify(name :string,clientId:string){
      this.clientUser[clientId] = name;
      return Object.values(this.clientUser);
    }

    getName(clientId:string){
      return this.clientUser[clientId];
    }

    async saveData(chat : ChatDto){
      try{
        console.log('in save data',chat);
        const data = await this.chatModel.create(chat);
        return {data : data , status : {code : "OK" , message : "Chat created successfully"}}
      }catch(error){
          if(error?.response?.error){
              throw error;
          }else{
              throw CustomError.UnknownError(error);
          }
      }
    }

    userConnected(userName: string, registrationToken: string) {
        let user = { userName: userName, registrationToken: registrationToken };
        const filteredUsers = this.allUsers.filter(u => u.userName === userName);
        if (filteredUsers.length == 0) {
          this.allUsers.push(user);
        } else {
          user = filteredUsers[0];
          user.registrationToken = registrationToken;
        }
        this.connectedUsers.push(userName);
        console.log("All Users", this.allUsers);
        console.log("Connected Users", this.connectedUsers);
      }
    
      userDisconnected(userName: string) {
        let userIndex = this.connectedUsers.indexOf(userName);
        this.connectedUsers.splice(userIndex, 1);
        console.log("All Users", this.allUsers);
        console.log("Connected Users", this.connectedUsers);
      }
    
}