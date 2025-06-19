import { Link } from "react-router";

const Student = () => {
  return (
    <div className="flex justify-around my-10 mx-20">
      <Link to={"/assignments-overview"}>
        <div className="w-96 h-60 bg-gray-400 rounded-lg flex justify-center items-center text-2xl font-bold">
          Assignment Overview
        </div>
      </Link>

      <Link to={"/dashboard-overview"}>
        <div className="w-96 h-60 bg-gray-400 rounded-lg flex justify-center items-center text-2xl font-bold">
          Dashboard_Overview
        </div>
      </Link>

      <Link to={"/feedback-and-score"}>
        <div className="w-96 h-60 bg-gray-400 rounded-lg flex justify-center items-center text-2xl font-bold">
          Feedback_And_Score
        </div>
      </Link>
    </div>
  );
};

export default Student;
