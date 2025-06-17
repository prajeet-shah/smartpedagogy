import Student from "../pages/students/Student";
import Teacher from "../pages/teachers/Teacher";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((store) => store.user);

  if (!user) return <div>Loading...</div>;

  return <div>{user.role === "Student" ? <Student /> : <Teacher />}</div>;
};

export default Home;
