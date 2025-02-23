export interface CreateUserPayload {
  username: string;
  password: string;
}

export interface UpdateUserPayload {
  username?: string;
}
