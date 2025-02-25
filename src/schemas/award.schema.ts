import S from 'fluent-json-schema';
import { paginationSchema } from './pagination.schema';
import { AwardStatus } from '@prisma/client';

const awardSchema = S.object()
  .prop('name', S.string().required())
  .prop('description', S.string().required());

export const awardRoutesSchemas = {
  GET_AWARD_BY_ID: {
    params: S.object().prop('id', S.string()),
  },
  GET_AWARDS: {
    querystring: paginationSchema,
  },
  CREATE_AWARD: {
    body: awardSchema,
  },
  UPDATE_AWARD: {
    body: awardSchema,
  },
  DELETE_AWARD: {
    params: S.object().prop('id', S.string()),
  },
  UPDATE_AWARD_STATUS: {
    params: S.object().prop('id', S.string()),
    body: S.object().prop(
      'status',
      S.string().enum(Object.values(AwardStatus)),
    ),
  },
  ADD_MEMBER: {
    params: S.object().prop('id', S.string()),
    body: S.object().prop('userId', S.string()),
  },
  REMOVE_MEMBER: {
    params: S.object().prop('id', S.string()),
  },
  LIST_MEMBERS: {
    params: S.object().prop('id', S.string()),
    querystring: paginationSchema,
  },
  GET_MEMBER: {
    params: S.object().prop('id', S.string()).prop('userId', S.string()),
  },
  ADD_MEMBER_WITH_INVITE_CODE: {
    params: S.object().prop('inviteCode', S.string()),
  },
};
