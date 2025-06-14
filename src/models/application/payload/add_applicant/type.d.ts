import type { UserType, ApplicantType, UserDTO, ApplicantDTO } from "@/models/domain/entity";

export type AddApplicantRequestType = Omit<UserType, 'id'> & Omit<ApplicantType, 'id'|'user_id'>;

export type AddApplicantResponseType = {
    applicant_id: ApplicantType['id'];
    user_id: ApplicantType['user_id'];
}

export type AddApplicantRequestDTO = Omit<UserDTO, 'id'> & Omit<ApplicantDTO, 'id'|'user_id'>;

export type AddApplicantResponseDTO = {
    applicant_id: ApplicantDTO['id'];
    user_id: ApplicantDTO['user_id'];
}