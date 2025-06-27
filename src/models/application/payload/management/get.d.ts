export type GETRequestType = Request;

export type GETResponseType = {
    managements: {
        management_id: string;
        connection_id: string;
        joiner: {
            user_id: string;
            name: string;
            avatar: string;
            applicant_id: string;
            message: string;
            quest: number;
        }[];
        waiter: {
            user_id: string;
            name: string;
            avatar: string;
            applicant_id: string;
            message: string;
            quest: number;
        }[];
        quests: number,
        applicants: number
    }[]
}