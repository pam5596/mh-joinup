export type PUTRequestType = Request;

export type PUTResponseType = {
    joiner: {
        name: string;
        avatar: string;
        quest: number;
    }[];
    waiter: {
        name: string;
        avatar: string;
        quest: number;
    }[];
}