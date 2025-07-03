import type { Book } from '@/types';
import { apiSlice } from './apiSlice';

export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => '/books',
      providesTags: ['Book'],
    }),
    createBook: builder.mutation<void, Partial<Book>>({
      query: (data) => ({
        url: '/books',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Book'],
    }),
    // Add more endpoints: editBook, deleteBook, etc.
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
} = bookApi;
