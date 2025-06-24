export type POSTRequestType = {
    videoId: string;
    connectionId: string;
    chatMessages: {
        displayMessage: string;
        displayName: string;
        photoUrl: string;
        platformAudienceId: string;
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