import { useState } from "react";
import Header from "../../components/header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const LandingPage = ({ currentUser, studentMarklist }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fetchingData, setFetchingData] = useState(false);

  console.log("studentMarklist", studentMarklist);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setFetchingData(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setFetchingData(false);
          toast.success("File uploaded successfully");
          const responseData = await response.json(); // Parse the JSON response
          console.log("File uploaded successfully");
        } else {
          setFetchingData(false);
          toast.error("File upload failed");
          console.error("File upload failed");
        }
      } catch (error) {
        setFetchingData(false);
        toast.error("File upload failed");
        console.error("Error uploading file:", error);
      }

      setSelectedFile(null);
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
    <main>
      <Header currentUser={currentUser} />
      <ToastContainer />
      <h1 className="text-5xl text-center font-bold">Manage Student Report</h1>
      <section className="flex justify-center items-center">
        <div className="bg-white p-5 m-10 w-1/2 rounded-xl shadow-2xl flex flex-col justify-center items-center">
          <h4 className="text-2xl text-black font-semibold text-center">
            Upload student mark list
          </h4>
          <div className="flex items-center justify-center m-10">
            <input
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="text-black text-center"
              onChange={handleFileChange}
            />
            <button
              className="bg-blue-500 text-black px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={handleUpload}
              disabled={fetchingData}
            >
              {fetchingData ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center">
        <div className="bg-white p-5 m-10 w-1/2 rounded-xl shadow-2xl flex flex-col justify-center items-center">
          <div className=" bg-black rounded text-white p-3 hover:bg-white hover:text-black text-1xl">
            <Link href="/admin/report">View student marklist</Link>
          </div>
          <p className="m-2 text-black">
            **already uploaded you can view here
          </p>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
