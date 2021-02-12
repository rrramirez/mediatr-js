import glob from "glob";
import { CommandHandle, EventHandle, CommandHandler, EventHandler } from "./handlers";
import {CommandMessage, EventMessage} from './messages';

export interface IMediator{
    register: () => void;
    send: (command: CommandMessage) => any;
    publish: (event: EventMessage) => void;
}

interface CommandHandlers{
    [key: string]: CommandHandle;
}
interface EventHandlers{
    [key: string]: EventHandle[];
}


export class Mediator{
    private commandHandlers: CommandHandlers;
    private eventHandlers: EventHandlers;

    constructor(){
        this.commandHandlers = {};
        this.eventHandlers = {};
    }

    /**
     * 
     * @param handler Pass a handler to register it with the mediator
     */
    register(handler: CommandHandler | EventHandler){
        if((handler as CommandHandler).command){
            const command = (handler as CommandHandler).command;
            if(this.commandHandlers[command])
                throw new Error('Command is already registered with a handler.');
            else 
                this.commandHandlers[command] = handler.handle;
        }
        else if((handler as EventHandler).event){
            const event = (handler as EventHandler).event;
            if(!this.eventHandlers[event])
                this.eventHandlers[event] = [];
            this.eventHandlers[event].push(handler.handle);
        }
    }

    registerFolder(path: string){
        
    }

    async publishAsync(eventMessage: EventMessage){
        const handlers: Promise<void>[] = [];
        if(this.eventHandlers[eventMessage.event])
            this.eventHandlers[eventMessage.event].forEach(x => {handlers.push(x(eventMessage.payload))})

        Promise.all(handlers);
    }

    async sendAsync<OUT>(command: CommandMessage): Promise<OUT>{
        if(command.command && this.commandHandlers[command.command])
            return this.commandHandlers[command.command](command.payload);
        else
            throw new Error('Command has not been registered with a handler');
    }
};
