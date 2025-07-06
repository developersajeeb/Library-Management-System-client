import { apiSlice } from './apiSlice';
import type { Book } from '@/types';

interface IBooksResponse {
  success: boolean;
  message: string;
  data: Book[];
}

interface IAddBookResponse {
  success: boolean;
  message: string;
  data: Book;
}

interface IBorrowPayload {
  bookId: string;
  quantity: number;
  dueDate: string;
}

interface IBorrowResponse {
  success: boolean;
  message: string;
  data: IBorrowSummaryItem[];
}

interface IBorrowSummaryItem {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

interface IBorrowSummaryResponse {
  success: boolean;
  message: string;
  data: IBorrowSummaryItem[];
}

export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<IBooksResponse, void>({
      query: () => '/books',
      providesTags: ['Book'],
    }),

    addBook: builder.mutation<IAddBookResponse, Partial<Book>>({
      query: (bookData) => ({
        url: '/books',
        method: 'POST',
        body: bookData,
      }),
      invalidatesTags: ['Book'],
    }),

    getSingleBook: builder.query<{ success: boolean; data: Book }, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Book', id }],
    }),

    updateBook: builder.mutation<IAddBookResponse, { id: string; data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Book'],

    }),

    deleteBook: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),

    borrowBook: builder.mutation<IBorrowResponse, IBorrowPayload>({
      query: ({ bookId, quantity, dueDate }) => ({
        url: '/borrow',
        method: 'POST',
        body: { book: bookId, quantity, dueDate },
      }),
      invalidatesTags: ['Book'],
    }),

    getBorrowSummary: builder.query<IBorrowSummaryResponse, void>({
      query: () => '/borrow',
      providesTags: ['BorrowSummary'],
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation, useGetSingleBookQuery, useUpdateBookMutation, useDeleteBookMutation, useBorrowBookMutation, useGetBorrowSummaryQuery } = bookApi;