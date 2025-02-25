import S from 'fluent-json-schema';
import { paginationSchema } from './pagination.schema';

export const memberRoutesSchemas = {
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
