import S from 'fluent-json-schema';
import { Schema } from '../types/schema';
import { paginationSchema } from './pagination.schema';

const awardSchema = S.object()
  .prop('name', S.string().required())
  .prop('description', S.string().required());

export const awardRoutesSchemas: Schema = {
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
};
