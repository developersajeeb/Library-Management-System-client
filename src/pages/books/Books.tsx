import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDeleteBookMutation, useGetBooksQuery } from '@/features/api/book&borrowApi';
import type { Book } from '@/types';
import { BookPlus, BookText, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router';
import { toast } from 'sonner';

const BooksPage = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
    const [deleteBook] = useDeleteBookMutation();
    const { data: books, isLoading, isError } = useGetBooksQuery();
    if (isError) return toast.error('Something went wrong!');
    const bookList = books?.data ?? [];

    const openDeleteDialog = (id: string) => {
        setSelectedBookId(id);
        setDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!selectedBookId) return;
        try {
            await deleteBook(id).unwrap();
            toast.success('Book deleted successfully');
            setDialogOpen(false);
            setSelectedBookId(null);
        } catch (error) {
            if (typeof error === 'object' && error !== null && 'data' in error) {
                const err = error as { data: { message?: string } };
                toast.error(err.data.message || 'Failed to delete the book', { position: 'top-center' });
            } else {
                toast.error('An unknown error occurred', { position: 'top-center' });
            }
        }
    };

    return (
        <>
            <section className='flex justify-between gap-5'>
                <h1 className='text-2xl font-bold text-gray-800'>All Books</h1>
                <NavLink to='/create-book' className='cursor-pointer bg-[#a87242] hover:bg-[#a87242d9] duration-300 text-sm px-3 py-2 text-white rounded-md flex items-center gap-2'><BookPlus size={15} /> Add a Book</NavLink>
            </section>

            <section className='mt-8 bg-gray-50 rounded-xl p-5 mb-8'>
                <Table className='w-full'>
                    <TableCaption>A list of all books.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px] font-bold text-gray-600">Title</TableHead>
                            <TableHead className='font-bold text-gray-600'>Author</TableHead>
                            <TableHead className='font-bold text-gray-600'>Genre</TableHead>
                            <TableHead className='font-bold text-gray-600'>ISBN</TableHead>
                            <TableHead className='font-bold text-gray-600'>Copies</TableHead>
                            <TableHead className='font-bold text-gray-600'>Availability</TableHead>
                            <TableHead className='font-bold text-gray-600'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading && (
                            [...Array(3)].map((_, i) => (
                                <TableRow key={i}>
                                    {[...Array(7)].map((_, j) => (
                                        <TableCell key={j}>
                                            <Skeleton className="h-4 w-full bg-gray-300" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}

                        {!isLoading && bookList?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-4 text-gray-500 font-bold">
                                    No books found.
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && bookList?.length > 0 && bookList?.map((book: Book) => {
                            return (
                                <TableRow key={book._id}>
                                    <TableCell>{book.title}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>{book.genre}</TableCell>
                                    <TableCell>{book.isbn}</TableCell>
                                    <TableCell className="text-center">{book.copies}</TableCell>
                                    <TableCell>
                                        {book.available ? (
                                            <span className='text-sm bg-green-50 text-green-500 px-3 py-[6px] rounded-full'>Available</span>
                                        ) : (
                                            <span className='text-sm bg-red-50 text-red-500 px-3 py-[6px] rounded-full'>Not Available</span>
                                        )}
                                    </TableCell>
                                    <TableCell className='flex gap-2'>
                                        <NavLink to={`/edit-book/${book._id}`} className='cursor-pointer flex items-center gap-1 text-sm font-medium border border-green-400 text-green-500 bg-green-50 px-3 py-[6px] rounded-md'>
                                            <Pencil size={14} /> Edit
                                        </NavLink>
                                        <AlertDialog open={dialogOpen && selectedBookId === book._id} onOpenChange={setDialogOpen}>
                                            <AlertDialogTrigger asChild>
                                                <span
                                                    className='cursor-pointer flex items-center gap-1 text-sm font-medium border border-red-400 text-red-500 bg-red-50 px-3 py-[6px] rounded-md'
                                                    onClick={() => openDeleteDialog(book._id)}
                                                >
                                                    <Trash2 size={14} /> Delete
                                                </span>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete and remove this book from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className='bg-gray-100 font-medium cursor-pointer'>No</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        disabled={isLoading}
                                                        className={`${isLoading && 'cursor-not-allowed opacity-40'} bg-red-600 font-medium hover:bg-red-500 cursor-pointer`}
                                                        onClick={() => handleDelete(book._id)}
                                                    >
                                                        {isLoading ? 'Deleting...' : 'Yes'}
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                        <NavLink to={`/borrow/${book._id}`} className='cursor-pointer flex items-center gap-1 text-sm font-medium border border-yellow-500 text-yellow-600 bg-yellow-50 px-3 py-[6px] rounded-md'><BookText size={14} /> Borrow</NavLink>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </section>
        </>
    );
};

export default BooksPage;