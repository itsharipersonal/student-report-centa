import Link from "next/link";
import Header from "../../components/header";

const LandingPage = ({ currentUser }) => {
  return (
    <>
      <Header currentUser={currentUser} />
      <div className="flex flex-col items-center justify-center m-5 gap-5 mt-24">
        
        {currentUser ? (
          <>
            <button className=" bg-blue-600 p-5 rounded ">upload student report card</button>
          </>
         
        ) : (
          // Render the sign-in button when currentUser is null
          <Link href="/admin/auth/signin" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out">
            Sign In
          </Link>
        )}
      </div>
    </>
  );
};

export default LandingPage;
