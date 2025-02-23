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
    response: {
      200: userResponseSchema,
      404: S.object().prop('message', S.string()),
    },
  },
  CREATE_USER: {
    body: userSchema,
    response: {
      201: userResponseSchema,
      400: S.object().prop('message', S.string()),
    },
  },
  UPDATE_USER: {
    body: userSchema,
    response: {
      200: userResponseSchema,
      404: S.object().prop('message', S.string()),
    },
  },
  DELETE_USER: {
    params: S.object().prop('id', S.string()),
    response: {
      204: S.object(),
      404: S.object().prop('message', S.string()),
    },
  },
};
