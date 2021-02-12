import { Mediator } from './mediator';

export {Mediator, IMediator} from './mediator';
export {CommandHandle, EventHandle, CommandHandler, EventHandler} from './handlers';

async function main(){
    const commandMediator = new Mediator();

    commandMediator.register({
        command: 'CREATE.USER',
        handle: async (payload: string) => {
            return payload.toUpperCase();
        }
    });
    
    const response = await commandMediator.sendAsync<string>({
        command: 'CREATE.USER',
        payload: 'Poop'
    });
    
    console.log(response);

    const eventMediator = new Mediator();

    eventMediator.register({
        event: 'USER.CREATED',
        handle: async (payload: string) => {
            console.log(payload.toLowerCase());
        }
    })

    eventMediator.register({
        event: 'USER.CREATED',
        handle: async (payload: string) => {
            console.log(payload.italics());
        }
    })

    await eventMediator.publishAsync({
        event: 'USER.CREATED',
        payload: 'WOAH'
    })
}

main();
