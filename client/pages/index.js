import Discover from "../components/Discover";
import UserReportCard from "../components/UserReportCard";
import TicketThumbnail from "../components/TicketThumbnail";
import ReportCard from "../components/ReportCard ";
import { useRouter } from "next/router";

const LandingPage = () => {

  const router = useRouter();
  const { rollno } = router.query;

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
        {rollno ? <UserReportCard /> : <ReportCard />}
        <TicketThumbnail />
        <Discover />
      </div>
    </>
  );
};

export default LandingPage;
