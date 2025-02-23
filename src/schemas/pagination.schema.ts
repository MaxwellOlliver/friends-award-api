import S from 'fluent-json-schema';

export const paginationSchema = S.object()
  .prop('page', S.number().default(1))
  .prop('q', S.string().default(''))
  .prop('limit', S.number().default(10));

export const paginationResponseSchema = S.object()
  .prop('data', S.array())
  .prop('total', S.number());
