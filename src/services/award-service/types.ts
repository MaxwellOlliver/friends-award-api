import { ListResponse } from '../../types/pagination';

import {
  Award,
  AwardMember,
  AwardMemberRole,
  AwardStatus,
  Prisma,
} from '@prisma/client';
import { ListRequest } from '../../types/pagination';
import { RequireAtLeastOne } from '../../utils/util-types';

export interface CreateAwardPayload {
  name: string;
  description: string;
  createdBy: string;
}

export interface UpdateAwardPayload {
  name?: string;
  description?: string;
}

export interface AddAwardMemberPayload {
  awardId: string;
  userId: string;
  role?: AwardMemberRole;
}

export interface AwardService {
  createAward: (payload: CreateAwardPayload) => Promise<Award>;
  updateAward: (
    id: string,
    userId: string,
    payload: UpdateAwardPayload,
  ) => Promise<Award>;
  deleteAward: (id: string) => Promise<Award>;
  getAward: (
    criteria: RequireAtLeastOne<{ id: string; ownerId: string }>,
    include?: Prisma.AwardInclude,
  ) => Promise<Award | null>;
  getAwards: (
    userId: string,
    isOwner: boolean,
    pagination: ListRequest,
  ) => Promise<ListResponse<Award>>;
  updateAwardStatus: (awardId: string, status: AwardStatus) => Promise<Award>;
  addMember: (payload: AddAwardMemberPayload) => Promise<AwardMember>;
  removeMember: (awardId: string, userId: string) => Promise<void>;
  getMembers: (
    awardId: string,
    pagination: ListRequest,
  ) => Promise<ListResponse<AwardMember>>;
  getMember: (awardId: string, userId: string) => Promise<AwardMember | null>;
}
