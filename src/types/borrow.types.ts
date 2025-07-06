export interface IBorrowSummaryResponse {
  success: boolean;
  message: string;
  data: IBorrowSummaryItem[];
}

export interface IBorrowSummaryItem {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}