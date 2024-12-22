import Navbar from "@/components/Navbar";
import animationData from "@/assets/Animation.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/signup');
  }
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:px-20">
        <div className="hidden lg:block h-screen w-full overflow-hidden">
          <div>
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ height: 500, width: 500 }}
            />
          </div>
        </div>
        <div className="h-screen w-full overflow-hidden flex-col mt-32 ">
          <div className="w-auto text-4xl sm:text-6xl titillium-web-black ml-4">
            Stay Organized, Stay Relaxed.
            <p className="text-xl pt-2 w-3/4">Stay organized, boost productivity, and achieve your goals—all in one place.</p>
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="text-white bg-gradient-to-r from-green-300 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 mt-4 text-center me-2 mb-2 ml-4"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
