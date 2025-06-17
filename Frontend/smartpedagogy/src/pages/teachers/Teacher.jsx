import React from "react";
import Performance_Dashboard from "./Performance_Dashboard";
import Assignment from "./Assignment";
import Classroom_Overview from "./Classroom_Overview";
import { Link } from "react-router";

const Teacher = () => {
  return (
    <div className="flex justify-around my-10 mx-20">
      <Link to={"/assignments"}>
        <div className="w-96 h-60 bg-gray-400 rounded-lg flex justify-center items-center text-2xl font-bold">
          Assignment Overview
        </div>
      </Link>

      <Link to={"/classroom-overview"}>
        <div className="w-96 h-60 bg-gray-400 rounded-lg flex justify-center items-center text-2xl font-bold">
          Classroom_Overview
        </div>
      </Link>

      <Link to={"/performance-dashboard"}>
        <div className="w-96 h-60 bg-gray-400 rounded-lg flex justify-center items-center text-2xl font-bold">
          Performance_Dashboard
        </div>
      </Link>
    </div>
  );
};

export default Teacher;
