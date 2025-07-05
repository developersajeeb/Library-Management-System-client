const Dashboard = () => {
    return (
        <>
            <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-5 rounded-lg bg-gray-100">
                    <h3 className="text-sm text-green-500 font-semibold">Total Books</h3>
                    <p className="text-gray-700 text-2xl font-bold mt-2">200</p>
                </div>
                <div className="p-5 rounded-lg bg-gray-100">
                    <h3 className="text-sm text-green-700 font-semibold">Returned Books</h3>
                    <p className="text-gray-700 text-2xl font-bold mt-2">200</p>
                </div>
                <div className="p-5 rounded-lg bg-gray-100">
                    <h3 className="text-sm text-red-700 font-semibold">Overdue Books</h3>
                    <p className="text-gray-700 text-2xl font-bold mt-2">200</p>
                </div>
                <div className="p-5 rounded-lg bg-gray-100">
                    <h3 className="text-sm text-red-500 font-semibold">Missing Books</h3>
                    <p className="text-gray-700 text-2xl font-bold mt-2">200</p>
                </div>
                <div className="p-5 rounded-lg bg-gray-100">
                    <h3 className="text-sm text-yellow-600 font-semibold">Borrowed Books</h3>
                    <p className="text-gray-700 text-2xl font-bold mt-2">200</p>
                </div>
                <div className="p-5 rounded-lg bg-gray-100">
                    <h3 className="text-sm text-purple-600 font-semibold">Visitors</h3>
                    <p className="text-gray-700 text-2xl font-bold mt-2">200</p>
                </div>
                <div className="p-5 rounded-lg bg-gray-100">
                    <h3 className="text-sm text-green-600 font-semibold">New Members</h3>
                    <p className="text-gray-700 text-2xl font-bold mt-2">200</p>
                </div>
                <div className="p-5 rounded-lg bg-gray-100">
                    <h3 className="text-sm text-yellow-400 font-semibold">Pending Fees</h3>
                    <p className="text-gray-700 text-2xl font-bold mt-2">200</p>
                </div>
            </section>
        </>
    );
};

export default Dashboard;