import { useState } from "react";
import Router from "next/router";
import useRequest from "../../../hooks/use-request";
import animationData from "../../../assets/hero-bg-animation-2.json";
import Lottie from "lottie-react";
import { useDispatch } from 'react-redux';



export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch();
  const { doRequest, errors } = useRequest({
    url: "/api/admin/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: (data) =>{
      Router.push("/admin")
    },
  });

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
      <h1 className=" text-2xl font-bold mt-2">Admin</h1>
      <h1 className=" text-2xl font-bold mb-3 mt-0">Sign in to TT University</h1>
      <form className="w-full max-w-[400px] my-3" onSubmit={onSubmit}>
        <div className="flex flex-col my-3">
          <label className=" font-medium">Enter your email</label>
          <input
            type="text"
            className=" border-gray-300 border-2 rounded-lg h-14 px-5 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col my-3">
          <label className=" font-medium">Password</label>
          <input
            type="password"
            className=" border-gray-300 border-2 rounded-lg h-14 px-5 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors}
        <button className=" bg-orange-500 text-white h-14 w-full rounded-full my-3 hover:bg-orange-400 transition duration-300 ease-in-out">
          SignIn
        </button>
      </form>
    </div>
  );
};
