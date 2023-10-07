import Link from "next/link";

const UserReportCard = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-b from-blue-300 to-blue-400 p-14 rounded-xl shadow-2xl text-white">
      <h1 className="text-4xl font-bold mb-4">Your Report Card Is Ready!</h1>
      <p className="text-lg mb-8">Access and download your report with ease.</p>
      <Link
        href="/view"
        className="bg-yellow-300 text-blue-900 rounded-full py-2 px-6 text-lg font-semibold hover:bg-yellow-400 transition duration-300 ease-in-out"
      >
        View Now
      </Link>
    </div>
  );
};

export default UserReportCard;
