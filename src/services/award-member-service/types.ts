import { AwardMemberRole } from '@prisma/client';

export interface CreateAwardMemberPayload {
  awardId: string;
  userId: string;
  role: AwardMemberRole;
}

export interface UpdateAwardMemberPayload {
  role: AwardMemberRole;
}
