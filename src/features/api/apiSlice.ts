import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-system-server-a3.vercel.app/api' }),
  tagTypes: ['Book', 'Borrow', 'BorrowSummary'],
  endpoints: () => ({}),
});
