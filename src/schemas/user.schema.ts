import S from 'fluent-json-schema';
import { Schema } from '../types/schema';

const userSchema = S.object().prop('username', S.string().required());

export const userRoutesSchemas: Schema = {
  GET_USER_BY_ID: {
    params: S.object().prop('id', S.string()),
  },
  CREATE_USER: {
    body: userSchema.prop('password', S.string().required()),
  },
  UPDATE_USER: {
    body: userSchema,
  },
  DELETE_USER: {
    params: S.object().prop('id', S.string()),
  },
};
