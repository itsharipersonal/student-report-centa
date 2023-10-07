import React, { useState, useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";
import animationData from "../../assets/hero-bg-animation.json";
import Lottie from "lottie-react";

const OtpVerificationModal = ({ rollno, onClose }) => {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(120);

  // Function to decrement the countdown timer
  const decrementTimer = () => {
    if (countdown > 0) {
      setCountdown(countdown - 1);
    }
  };

  useEffect(() => {
    // Start the countdown timer when the component mounts
    const timerInterval = setInterval(decrementTimer, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timerInterval);
  }, []); // You don't need to include decrementTimer as a dependency

  const { doRequest, errors } = useRequest({
    url: "/api/users/verify",
    method: "post",
    body: {
      otp,
      rollno,
    },
    onSuccess: (data) => {
      console.log("Data received:", data);
      const { user } = data; // Access the 'user' property
      const { rollno } = user; // Access the 'rollno' property within 'user'
      console.log("Rollno:", rollno);
      Router.push({
        pathname: "/",
        query: { rollno },
      });
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <Lottie
          style={{ objectFit: "contain" }}
          animationData={animationData}
        />
        <h1 className="text-2xl font-bold my-3 text-center text-black">Otp verification</h1>
        <p className=" text-black text-center">
          Time remaining: {Math.floor(countdown / 60)}:
          {countdown % 60 < 10 ? "0" : ""}
          {countdown % 60}
        </p>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col my-3">
            <label className="font-medium">Enter otp</label>
            <input
              type="text"
              className="border-gray-300 border-2 rounded-lg h-14 px-5 text-black"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          {errors}
          <button className="bg-blue-600 text-white h-14 w-full rounded-full my-3 hover:bg-blue-400 transition duration-300 ease-in-out">
            Verify Otp
          </button>
          <div className="flex justify-center">
            <button
              className="text-blue-600 hover:underline"
              onClick={() => onClose()}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpVerificationModal;
