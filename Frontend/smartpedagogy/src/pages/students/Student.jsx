import { Link } from "react-router";

const Student = () => {
  return (
    <div className="flex items-center justify-center px-4 py-24 bg-base-100">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-around">
        <Link to={"/assignments-overview"}>
          <div
            className="w-72 h-48 md:w-96 md:h-60 mx-4 rounded-lg shadow-lg bg-cover bg-center relative group"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1581091012184-7f3c721d1d85?auto=format&fit=crop&w=800&q=60')",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg group-hover:bg-opacity-30 transition duration-300"></div>
            <div className="absolute inset-0 flex justify-center items-center text-white text-xl md:text-2xl font-bold">
              Assignment Overview
            </div>
          </div>
        </Link>

        <Link to={"/dashboard-overview"}>
          <div
            className="w-72 h-48 md:w-96 md:h-60 mx-4 rounded-lg shadow-lg bg-cover bg-center relative group"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=800&q=60')",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg group-hover:bg-opacity-30 transition duration-300"></div>
            <div className="absolute inset-0 flex justify-center items-center text-white text-xl md:text-2xl font-bold">
              Dashboard Overview
            </div>
          </div>
        </Link>

        <Link to={"/feedback-and-score"}>
          <div
            className="w-72 h-48 md:w-96 md:h-60 mx-4 rounded-lg shadow-lg bg-cover bg-center relative group"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1629904853716-f0bc54eea481?auto=format&fit=crop&w=800&q=60')",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg group-hover:bg-opacity-30 transition duration-300"></div>
            <div className="absolute inset-0 flex justify-center items-center text-white text-xl md:text-2xl font-bold">
              Feedback & Score
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Student;
