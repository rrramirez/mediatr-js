export interface CommandMessage{
    command: string,
    payload: any,
}

export interface EventMessage{
    event: string,
    payload: any,
}