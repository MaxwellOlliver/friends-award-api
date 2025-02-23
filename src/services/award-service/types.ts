import { ListResponse } from '../../types/pagination';

import { Award, Prisma } from '@prisma/client';
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
}
