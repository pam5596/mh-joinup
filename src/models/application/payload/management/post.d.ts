export type POSTRequestType = {
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
}

export type POSTResponseType = {
    management_id: string,
}