import Link from "next/link";
import Header from "../../components/header";
import Table from "../../components/Table";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";


const Report = ({ currentUser, studentMarklist }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReportGenerated, setIsReportGenerated] = useState(false);

  const generateReport = async () => {
    setIsGenerating(true);

    try {
      // Make a POST request to the report generation endpoint
      const response = await fetch("/api/admin/generatereportcard", {
        method: "POST",
      });

      if (response.ok) {
        toast.success("File Genarated successfully");
        toast.success("Send Email to Every Student");
        setIsGenerating(false);
        setIsReportGenerated(true);
      } else {
        setIsGenerating(false);
        toast.error("File Genaration failed");
        console.error("Report generation failed");
      }
    } catch (error) {
      setIsGenerating(false);
      toast.error("File genaration failed");
      console.error("Error generating report:", error);
    }
  };
  
  if (!currentUser) {
    return (
      <main>
        <div className="bg-blue-900 min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-4xl text-white font-semibold mb-6">
            TT University
          </h1>
          <p className="text-white text-lg mb-8">
            Welcome to the University's Report Card Generator
          </p>
          <Link
            href="/admin/auth/signin"
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300 ease-in-out"
          >
            Sign In to Generate Report Card
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="overflow-x-auto">
      <ToastContainer/>
      <Header currentUser={currentUser} />
      <h1 className="text-5xl text-center font-bold m-3">
        Genarate Student Report
      </h1>
      <div className=" flex justify-center">
        <Table datas={studentMarklist} />
      </div>
      <div className="flex justify-center mt-4">
        <div className=" text-center">
          <button
            onClick={generateReport}
            className={`bg-black text-white px-4 py-2 rounded ${
              isGenerating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Report"}
          </button>
          <p className="m-2">
            **By clicking this button you can genarate reportcard for students
            score more than 60%
          </p>
        </div>
      </div>
    </div>
  );
};

Report.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/admin/studentmarklist");

  return {
    studentMarklist: data,
  };
};

export default Report;
