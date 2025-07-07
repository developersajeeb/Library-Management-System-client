import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetBorrowSummaryQuery } from '@/features/api/book&borrowApi';
import { toast } from 'sonner';

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();

  if (isError) {
    toast.error('Failed to load borrow summary', {position: 'top-center'});
  }

  const summaryList = data?.data ?? [];

  return (
    <>
      <section className="flex justify-between gap-5">
        <h1 className="text-2xl font-bold text-gray-800">Borrow Summary</h1>
      </section>

      <section className="mt-8 bg-gray-50 rounded-xl p-5 mb-8">
        <Table className="w-full">
          <TableCaption>List of borrowed books with total quantities.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] font-bold text-gray-600">Book Title</TableHead>
              <TableHead className="font-bold text-gray-600">ISBN</TableHead>
              <TableHead className="font-bold text-gray-600">Total Quantity Borrowed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              [...Array(3)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(3)].map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full bg-gray-300" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}

            {!isLoading && summaryList.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4 text-gray-500 font-bold">
                  No borrowed books found.
                </TableCell>
              </TableRow>
            )}

            {!isLoading && summaryList.length > 0 && summaryList.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.book.title}</TableCell>
                <TableCell>{item.book.isbn}</TableCell>
                <TableCell>{item.totalQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default BorrowSummary;
