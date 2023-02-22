import type { NextPage } from "next";
import { useRouter } from "next/router";
import Contact from "./contact";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row  items-center justify-evenly ">
      <div>
        <button
          onClick={() => {
            router.push("/contact");
          }}
          className="p-5 rounded-lg w-56 hover:bg-blue-500 hover:text-white border-[#dddddd] border-[1px]"
        >
          Task 1
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            router.push("/chart");
          }}
          className="p-5 rounded-lg w-56 hover:bg-blue-500 hover:text-white border-[#dddddd] border-[1px]"
        >
          Task 2
        </button>
      </div>
    </div>
  );
};

export default Home;
