export interface CreateAwardPayload {
  name: string;
  description: string;
}

export interface UpdateAwardPayload {
  name?: string;
  description?: string;
}
