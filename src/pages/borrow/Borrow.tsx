import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useGetSingleBookQuery, useBorrowBookMutation } from '@/features/api/book&borrowApi';
import { useNavigate, useParams } from 'react-router';
import GlobalLoader from '@/components/GlobalLoader';

const borrowSchema = z.object({
    quantity: z
        .number({ invalid_type_error: 'Quantity is required' })
        .min(1, 'Quantity must be at least 1'),
    dueDate: z.string().min(1, 'Due date is required'),
});

type BorrowFormData = z.infer<typeof borrowSchema>;

const Borrow = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const { data: book, isLoading, isError } = useGetSingleBookQuery(bookId!);
    const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

    const form = useForm<BorrowFormData>({
        resolver: zodResolver(borrowSchema),
        defaultValues: {
            quantity: 1,
            dueDate: '',
        },
    });

    if (isLoading) return <GlobalLoader />;
    if (isError || !book) return <p className="text-center py-10 text-xl font-bold">Book not found or error occurred.</p>;
    if (!bookId) {
        return <p className="text-center py-10 text-xl font-bold">Invalid book ID</p>;
    }

    const handleSubmit = form.handleSubmit(async (data) => {
        if (data.quantity > book?.data?.copies) {
            toast.error(`You cannot borrow more than ${book?.data?.copies} copies.`);
            return;
        }

        try {
            await borrowBook({
                bookId,
                quantity: data.quantity,
                dueDate: data.dueDate,
            }).unwrap();

            toast.success('Book borrowed successfully!');
            navigate('/borrow-summary');
        } catch (error) {
            if (typeof error === 'object' && error !== null && 'data' in error) {
                const err = error as { data: { message?: string } };
                toast.error(err?.data?.message || 'Failed to borrow book?.data?.', {
                    position: 'top-center',
                });
            } else {
                toast.error('An unknown error occurred', {
                    position: 'top-center',
                });
            }
        }
    });

    if (!isLoading && book?.data?.copies === 0) {
        return (
            <section className="max-w-md mx-auto p-5 bg-gray-100 rounded shadow mt-6 mb-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Not Available</h1>
                <p>This book is currently not available to borrow because all copies are taken.</p>
            </section>
        );
    }

    return (
        <section className="max-w-md mx-auto p-5 bg-gray-100 rounded shadow mt-6 mb-8">
            <h1 className="text-2xl font-bold text-center mb-6">
                Borrow "{book?.data?.title}"
            </h1>

            <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={book?.data?.copies}
                                        {...field}
                                        value={field.value}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        className="bg-white"
                                        placeholder={`Max: ${book?.data?.copies}`}
                                    />
                                </FormControl>
                                <FormMessage />
                                <p className="text-sm text-gray-500 mt-1">
                                    Available copies: {book?.data?.copies}
                                </p>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Due Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="text-center mt-8">
                        <Button
                            type="submit"
                            disabled={isBorrowing}
                            className="bg-[#a87242] hover:bg-[#a87242d9] duration-300"
                        >
                            {isBorrowing ? 'Borrowing...' : 'Borrow Book'}
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    );
};

export default Borrow;