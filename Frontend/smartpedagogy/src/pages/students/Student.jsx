import { Link } from "react-router";

const Student = () => {
  return (
    <div className=" flex items-center justify-center px-4 py-36 bg-base-100">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-around">
        <Link to={"/assignments-overview"}>
          <div className="w-72 h-48 md:w-96 md:h-60 mx-10 bg-gray-400 rounded-lg flex justify-center items-center text-xl md:text-2xl font-bold hover:bg-gray-500 transition">
            Assignment Overview
          </div>
        </Link>

        <Link to={"/dashboard-overview"}>
          <div className="w-72 h-48 md:w-96 md:h-60 mx-10 bg-gray-400 rounded-lg flex justify-center items-center text-xl md:text-2xl font-bold hover:bg-gray-500 transition">
            Dashboard Overview
          </div>
        </Link>

        <Link to={"/feedback-and-score"}>
          <div className="w-72 h-48 md:w-96 md:h-60 mx-10 bg-gray-400 rounded-lg flex justify-center items-center text-xl md:text-2xl font-bold hover:bg-gray-500 transition">
            Feedback & Score
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Student;
