import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";


const StudentReportCard = ({}) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const isAuth = useSelector((state) => state.session.user);
  const router = useRouter();


  useEffect(() => {
    // Convert isAuth to a JSON-serializable format, for example, as an object
    const requestBody = {
      isAuth: isAuth, // or simply isAuth if it's already in the right format
    };

    fetch("/api/users/viewfiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        console.log("success");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const PrintButton = () => {
    const handlePrint = () => {
      window.print();
    }
  }
  

  const {
    student_id,
    name,
    email,
    id,
    subject,
    test_taking_date,
    full_marks,
    mark_obtained,
    overall_percentage,
  } = data;

  const formattedDate = new Date(test_taking_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  
  

  if (!isAuth) {
    return (
      <>
        <div className=" flex flex-col items-center justify-center m-5 gap-5 mt-24">
          <h1 className=" text-5xl font-bold mb-10 text-center">
            Find your Student
            <span className=" text-5xl font-bold text-yellow-300">
              {" "}
              Report Card.
            </span>
          </h1>
          <h1 className=" text-3xl font-bold capitalize-"></h1>

        </div>
      </>
    );
  }

  return (
    <div className="flex justify-center mx-auto items-center my-20">
      <div
        id="report-card"
        className=" text-black bg-white p-4 shadow-lg rounded-lg flex flex-col justify-between items-center w-[500px]"
      >
        <h1 className=" text-black text-2xl font-bold text-center">
          TT University
        </h1>
        <p className=" mb-4">Affiliated to Mg </p>
        <div className=" text-black  ">
          <div className=" text-black col-span-2 sm:col-span-1 mt-5">
            {/* Student Information */}
            <p className=" text-black font-bold">Student ID: {student_id}</p>
            <p className=" text-black font-bold text-2xl my-2">Name: {name}</p>
            <p className=" text-black font-bold">Email: {email}</p>
          </div>
          <div className=" text-black col-span-2 sm:col-span-1 mt-5">
            {/* Test Information */}
            <p className=" text-black font-bold">ID: {id}</p>
            <p className=" text-black font-bold">Subject: {subject}</p>
            <p className=" text-black font-bold">
              Test Taking Date: {formattedDate}
            </p>
            <p className=" text-black font-bold">Full Marks: {full_marks}</p>
            <p className=" text-black font-bold">
              Mark Obtained: {mark_obtained}
            </p>
            <p className=" text-black font-bold">
              Overall Percentage: {overall_percentage}
            </p>
          </div>
        </div>
        <p className=" text-black text-center mt-4"></p>
        <div className=" text-center mt-4">
        <button onClick={PrintButton}>Download PDF</button>
        </div>
      </div>
    </div>
  );
};

export default StudentReportCard;
