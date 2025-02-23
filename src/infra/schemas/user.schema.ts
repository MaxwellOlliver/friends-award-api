import S from 'fluent-json-schema';
import { Schema } from '../types/schema';

const userSchema = S.object()
  .prop('id', S.string())
  .prop('username', S.string());

const userResponseSchema = userSchema
  .prop('createdAt', S.string())
  .prop('updatedAt', S.string());

export const userRoutesSchemas: Schema = {
  GET_USER_BY_ID: {
    params: S.object().prop('id', S.string()),
    response: userResponseSchema,
  },
  CREATE_USER: {
    body: userSchema,
    response: userResponseSchema,
  },
  UPDATE_USER: {
    body: userSchema,
    response: userResponseSchema,
  },
  DELETE_USER: {
    params: S.object().prop('id', S.string()),
  },
};
