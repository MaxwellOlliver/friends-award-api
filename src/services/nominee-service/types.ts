import { Nominee } from '@prisma/client';

export interface CreateNomineePayload {
  name: string;
}

export interface UpdateNomineePayload {
  name: string;
}

export interface NomineeService {
  createNominee: (nominee: CreateNomineePayload) => Promise<Nominee>;
  updateNominee: (
    nomineeId: string,
    payload: UpdateNomineePayload,
  ) => Promise<Nominee>;
  deleteNominee: (nomineeId: string) => Promise<void>;
  getNominee: (nomineeId: string) => Promise<Nominee | null>;
}
