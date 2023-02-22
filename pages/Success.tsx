import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FormData } from "./contact";

const Success = () => {
  const [data, setData] = useState<FormData>();
  const router = useRouter();
  useEffect(() => {
    const items = localStorage.getItem("items");
    if (!items) {
      router.push("/");
    } else {
      setData(JSON.parse(items));
    }
  }, []);
  useEffect(() => {
    if (data) {
      localStorage.removeItem("items");
    }
  }, [data]);
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center  bg-[#D3E5FE]">
      <div className="w-1/2  min-w-[300px] h-1/2 lg:h-1/3 overflow-auto bg-[#FFFFFF] px-10">
        <p className="text-center lg:text-start text-2xl  font-extralight mt-5">
          Thank You
        </p>
        {/* First and last name div */}
        <div className="flex flex-col items-center justify-center lg:flex-row lg:space-x-20 space-y-5 lg:space-y-0 mt-10 ">
          <div className=" w-40 lg:w-80">
            <p>{`First Name : ${data?.first_name}`}</p>
          </div>
          <div className=" w-40 lg:w-80">
            <p>{`Last Name : ${data?.last_name}`}</p>
          </div>
        </div>
        {/* Email mobile div */}
        <div className="flex flex-col items-center justify-center lg:flex-row lg:space-x-20 space-y-5 lg:space-y-0 mt-5 ">
          <div className=" w-40 lg:w-80">
            <p>{`Email : ${data?.email}`}</p>
          </div>
          <div className=" w-40 lg:w-80">
            <p>{`Mobile : ${data?.mobile}`}</p>
          </div>
        </div>
        {/* Country Dropdown */}
        <div className="w-40 lg:w-full mx-auto  mt-5">{`Country: ${data?.country}`}</div>
      </div>
    </div>
  );
};
export default Success;
