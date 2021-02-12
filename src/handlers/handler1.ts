import {CommandHandler} from '../handlers';

export const Handler11:CommandHandler = {
    command: 'CREATE.USER',
    handle: async (payload: string) => {
        return payload.toUpperCase();
    }
}

const Handler12:CommandHandler = {
    command: 'CREATE.ACCOUNT',
    handle: async (payload: string) => {
        return payload.toUpperCase();
    }
}

export default Handler12;