import GlobalLoader from "@/components/GlobalLoader";
import { useGetSingleBookQuery } from "@/features/api/book&borrowApi";
import { useParams } from "react-router";

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useGetSingleBookQuery(id!);

    if (isLoading) return <GlobalLoader />;
    if (isError || !book) return <p className="text-center py-10 text-xl font-bold">Book not found or error occurred.</p>;
    if (!id) {
        return <p className="text-center py-10 text-xl font-bold">Invalid book ID</p>;
    }

    return (
        <section className="mt-6 mb-8 bg-gray-50 rounded-xl p-5">
            <h1 className="text-2xl font-black text-gray-800">{book?.data?.title}</h1>
            <p className="text-green-600 text-lg font-medium mt-2">{book?.data?.author || 'N/A'}</p>
            <div className="mt-4 mb-10 flex gap-3 flex-wrap">
                <span className="text-xs px-3 py-1 rounded-full text-[#c37c3e] bg-[#f8ede4] font-bold">{book?.data?.genre || 'N/A'}</span>
                <span className="text-xs px-3 py-1 rounded-full text-green-500 bg-green-100 font-bold">{book?.data?.isbn || 'N/A'}</span>
                <span className="text-xs px-3 py-1 rounded-full text-yellow-600 bg-yellow-100 font-bold">{book?.data?.copies || '0'} Copies</span>
            </div>

            <p className="text-sm text-gray-600 font-medium"><span className="block font-bold text-gray-800 text-lg mb-1">Book Description:</span> {book?.data?.description || 'N/A'}</p>
        </section>
    );
};

export default SingleBook;