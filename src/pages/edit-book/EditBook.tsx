import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import * as z from 'zod';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetSingleBookQuery, useUpdateBookMutation } from '@/features/api/book&borrowApi';
import GlobalLoader from '@/components/GlobalLoader';

const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    author: z.string().min(1, 'Author is required'),
    genre: z.string().min(1, 'Genre is required'),
    isbn: z.string().min(1, 'ISBN is required'),
    description: z.string().optional(),
    copies: z.coerce.number().min(1, 'Copies must be at least 1'),
    available: z.coerce.boolean({ message: 'Availability is required' }),
});

type FormData = z.infer<typeof formSchema>;

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useGetSingleBookQuery(id!);
    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            author: '',
            genre: '',
            isbn: '',
            description: '',
            copies: 1,
            available: true,
        },
    });

    useEffect(() => {
        if (data?.data) {
            form.reset({
                title: data.data.title,
                author: data.data.author,
                genre: data.data.genre,
                isbn: data.data.isbn,
                description: data.data.description || '',
                copies: data.data.copies,
                available: data.data.available,
            });
        }
    }, [data, form]);

    const onSubmit = async (formData: FormData) => {
        if (!id) return;
        try {
            await updateBook({ id, data: formData }).unwrap();
            toast.success('Book updated successfully!', { position: 'top-center' });
            navigate('/books');
        } catch (error) {
            if (typeof error === 'object' && error !== null && 'data' in error) {
                const err = error as { data: { message?: string } };
                toast.error(err.data.message || 'Failed to update book', {
                    position: 'top-center',
                });
            } else {
                toast.error('An unknown error occurred', {
                    position: 'top-center',
                });
            }
        }
    };

    if (isLoading) return <GlobalLoader />;
    if (isError || !data?.data) return <div className="text-center py-10 text-xl font-bold">Failed to load book.</div>;

    return (
        <section className="max-w-[640px] m-auto p-5 rounded-lg shadow-sm bg-gray-100 mt-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-5 text-center">Edit Book</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input className="bg-white" placeholder="Book name or title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid md:grid-cols-3 gap-5">
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author</FormLabel>
                                    <FormControl>
                                        <Input className="bg-white" placeholder="Author name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="genre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Genre</FormLabel>
                                    <Select
                                        key={field.value}
                                        onValueChange={(val) => field.onChange(val)}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-white w-full">
                                                <SelectValue placeholder="Select genre" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="FICTION">Fiction</SelectItem>
                                                <SelectItem value="NON FICTION">Non Fiction</SelectItem>
                                                <SelectItem value="SCIENCE">Science</SelectItem>
                                                <SelectItem value="HISTORY">History</SelectItem>
                                                <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                                                <SelectItem value="FANTASY">Fantasy</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isbn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ISBN</FormLabel>
                                    <FormControl>
                                        <Input className="bg-white" placeholder="ISBN" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea className="bg-white" placeholder="Write a description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid md:grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="copies"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Copies</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-white"
                                            type="number"
                                            placeholder="Total copies"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="available"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Availability</FormLabel>
                                    <Select
                                        onValueChange={(val) => field.onChange(val === 'true')}
                                        value={String(field.value)}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-white w-full">
                                                <SelectValue placeholder="Select availability" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="true">Available</SelectItem>
                                                <SelectItem value="false">Not Available</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="text-center mt-8">
                        <Button
                            className="cursor-pointer bg-[#a87242] hover:bg-[#a87242d9] duration-300"
                            type="submit"
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Updating...' : 'Update Book'}
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    );
};

export default EditBook;
