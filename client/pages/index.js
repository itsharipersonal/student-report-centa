import Discover from "../components/Discover";
import UserReportCard from "../components/UserReportCard";
import TicketThumbnail from "../components/TicketThumbnail";
import ReportCard from "../components/ReportCard ";
import Router, { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/sessionSlice";

const LandingPage = () => {
  const router = useRouter();
  console.log(router.query, "qry");

  const { user } = router.query;
  console.log(user,"serv-");

  const dispatch = useDispatch();

  dispatch(setUser(user));

  const isAuth = useSelector((state) => state.session.user);

  console.log(isAuth,"isssss");
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
          <ReportCard />
          <TicketThumbnail />
          <Discover />
        </div>
      </>
    );
  }
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
        <UserReportCard />
        <TicketThumbnail />
        <Discover />
      </div>
    </>
  );
};

export default LandingPage;
