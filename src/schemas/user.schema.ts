import S from 'fluent-json-schema';
import { Schema } from '../types/schema';

const userSchema = S.object().prop('username', S.string().required());

const userResponseSchema = userSchema
  .prop('id', S.string().required())
  .prop('createdAt', S.string().required())
  .prop('updatedAt', S.string().required());

export const userRoutesSchemas: Schema = {
  GET_USER_BY_ID: {
    params: S.object().prop('id', S.string()),
    response: {
      200: userResponseSchema,
    },
  },
  CREATE_USER: {
    body: userSchema.prop('password', S.string().required()),
    response: {
      201: userResponseSchema,
    },
  },
  UPDATE_USER: {
    body: userSchema,
    response: {
      200: userResponseSchema,
    },
  },
  DELETE_USER: {
    params: S.object().prop('id', S.string()),
  },
};
