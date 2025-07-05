import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookPlus, BookText, Pencil, Trash2 } from 'lucide-react';
import React from 'react';

const BooksPage = () => {
    return (
        <>
            <section className='flex justify-between gap-5'>
                <h1 className='text-2xl font-bold text-gray-800'>All Books</h1>
                <Button className='cursor-pointer bg-[#a87242] hover:bg-[#a87242d9]'><BookPlus /> Add a Book</Button>
            </section>

            <section className='mt-8 bg-gray-50 rounded-xl p-5'>
                <Table>
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
                        <TableRow>
                            <TableCell>This is a Book Title</TableCell>
                            <TableCell className='py-2'>Sajeeb</TableCell>
                            <TableCell className='py-2'>Genre asasdas</TableCell>
                            <TableCell className='py-2'>12asd as</TableCell>
                            <TableCell className='py-2 text-center'>12</TableCell>
                            <TableCell className='py-2'>
                                <span className='text-sm bg-green-50 text-green-500 px-3 py-[6px] rounded-full'>Available</span>
                                <span className='text-sm bg-red-50 text-red-500 px-3 py-[6px] rounded-full'>Not available</span>
                            </TableCell>
                            <TableCell className='py-2 flex gap-2'>
                                <Dialog>
                                    <DialogTrigger className='cursor-pointer flex items-center gap-1 text-sm font-medium border border-green-400 text-green-500 bg-green-50 px-3 py-[6px] rounded-md'><Pencil size={14} />  Edit</DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone. This will permanently delete your account
                                                and remove your data from our servers.
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                                <span className='cursor-pointer flex items-center gap-1 text-sm font-medium border border-red-400 text-red-500 bg-red-50 px-3 py-[6px] rounded-md'><Trash2 size={14} /> Delete</span>
                                <span className='cursor-pointer flex items-center gap-1 text-sm font-medium border border-yellow-500 text-yellow-600 bg-yellow-50 px-3 py-[6px] rounded-md'><BookText size={14} /> Borrow</span>

                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>
        </>
    );
};

export default BooksPage;