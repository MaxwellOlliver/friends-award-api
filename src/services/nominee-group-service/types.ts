import { NomineeGroup } from '@prisma/client';

export interface CreateNomineeGroupPayload {
  name: string;
  description?: string;
  createdBy: string;
}

export interface UpdateNomineeGroupPayload {
  name: string;
  description?: string;
}

export interface NomineeGroupService {
  createNomineeGroup: (
    nomineeGroup: CreateNomineeGroupPayload,
  ) => Promise<NomineeGroup>;
  updateNomineeGroup: (
    nomineeGroupId: string,
    payload: UpdateNomineeGroupPayload,
  ) => Promise<NomineeGroup>;
  deleteNomineeGroup: (nomineeGroupId: string) => Promise<void>;
  getNomineeGroup: (nomineeGroupId: string) => Promise<NomineeGroup | null>;
}
