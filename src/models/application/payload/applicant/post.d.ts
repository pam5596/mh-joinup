export type POSTRequestType = {
    youtube_id: string;
    connection_id: string;
    chat_data: {
        message: string;
        name: string;
        avatar: string;
        channel_id: string;
    }[]
}

export type POSTResponseType = {
    applicants: {
        user_id: string;
        name: string;
        avatar: string;
        applicant_id: string;
        message: string;
    }[],
}