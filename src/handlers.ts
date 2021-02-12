export type CommandHandle = (payload: any) => Promise<any>;
export type EventHandle = (payload: any) => Promise<void>;

export interface CommandHandler{
    command: string,
    handle: CommandHandle
}

export interface EventHandler{
    event: string,
    handle: EventHandle
}