import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import useRequest from "../../hooks/use-request";
import animationData from "../../assets/hero-bg-animation.json";
import ReCAPTCHA from "react-google-recaptcha";
import Lottie from "lottie-react";
import OtpVerificationModal from "./verify"; // Import the modal component

const Signup = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [rollno, setRollno] = useState("");
  const [verified, setVerified] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const router = useRouter();

  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      rollno,
      fullname,
    },
    onSuccess: async (data) => {
      const { rollno } = data;
      setShowModal(true); // Show the modal on successful signup
    },
  });

  const handleRecaptcha = () => {
    setVerified(true);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div className="flex flex-col justify-center items-center m-3 ">
      <Lottie
        style={{ objectFit: "contain", zIndex: 1 }}
        animationData={animationData}
      />
      <h1 className="text-2xl font-bold my-3">Login in to TT University</h1>
      <form className="w-full max-w-[400px] mb-3" onSubmit={onSubmit}>
        <div className="flex flex-col my-3">
          <label className="font-medium">Enter your email</label>
          <input
            type="text"
            className="border-gray-300 border-2 rounded-lg h-14 px-5 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col my-3">
          <label className="font-medium">Enter your FullName</label>
          <input
            type="text"
            className="border-gray-300 border-2 rounded-lg h-14 px-5 text-black"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="flex flex-col my-3">
          <label className="font-medium">Enter your RollNo</label>
          <input
            type="text"
            className="border-gray-300 border-2 rounded-lg h-14 px-5 text-black"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey="6LfNEHkoAAAAAC7k82JBrbmJuL8MteR50uM74wBg"
            onChange={handleRecaptcha}
          />
        </div>
        {errors}
        <button
          disabled={!verified}
          className=" bg-blue-600 text-white h-14 w-full rounded-full my-3 hover:bg-blue-400 transition duration-300 ease-in-out"
        >
          SignUp
        </button>
        <div className="flex justify-center">
          <span>
            Already have an account? <a href="/auth/signin">Sign In</a>
          </span>
        </div>
      </form>

      {/* Render the OTP verification modal if showModal is true */}
      {showModal && (
        <OtpVerificationModal
          rollno={rollno}
          onClose={() => setShowModal(false)} // Close the modal when needed
        />
      )}
    </div>
  );
};

export default Signup;
