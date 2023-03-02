import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import CountryDropdown from "../components/CountryDropdown";
export type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  country: string;
};
const Contact = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
  } = useForm<FormData>();
  const router = useRouter();
  const SubmitFormData = (data: FormData) => {
    console.log(data);
    localStorage.setItem("items", JSON.stringify(data));
    router.push("/Success");
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center  bg-[#D3E5FE]">
      <div className="w-1/2  min-w-[300px] h-3/4 overflow-auto bg-[#FFFFFF] px-10">
        <p className="text-center lg:text-start text-2xl  font-extralight mt-5">
          Get In Touch
        </p>
        <form onSubmit={handleSubmit(SubmitFormData)}>
          {/* First and last name div */}
          <div className="flex flex-col items-center justify-center lg:flex-row lg:space-x-20 space-y-5 lg:space-y-0 mt-10 text-xs">
            <div className=" w-40 lg:w-80">
              <input
                className="outline-none w-full h-10 border-[1px] pl-2 border-[#DDDDDD] rounded-md"
                placeholder="First Name"
                {...register("first_name", { required: true })}
              />
              {errors?.first_name && (
                <p className="text-red-500 mt-2 text-[10px]">
                  This is required
                </p>
              )}
            </div>
            <div className=" w-40 lg:w-80">
              <input
                className="outline-none w-full h-10 border-[1px] pl-2 border-[#DDDDDD] rounded-md"
                placeholder="Last Name"
                {...register("last_name", { required: true })}
              />
              {errors?.last_name && (
                <p className="text-red-500 mt-2 text-[10px]">
                  This is required
                </p>
              )}
            </div>
          </div>
          {/* Email mobile div */}
          <div className="flex flex-col items-center justify-center lg:flex-row lg:space-x-20 space-y-5 lg:space-y-0 mt-5 text-xs">
            <div className=" w-40 lg:w-80">
              <input
                className="outline-none w-full h-10 border-[1px] pl-2 border-[#DDDDDD] rounded-md"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                })}
              />
              {errors?.email && (
                <p className="text-red-500 mt-2 text-[10px]">
                  Invalid Email Address
                </p>
              )}
            </div>
            <div className=" w-40 lg:w-80">
              <input
                className="outline-none w-full h-10 border-[1px] pl-2 border-[#DDDDDD] rounded-md"
                placeholder="Mobile Number"
                type="number"
                {...register("mobile", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                })}
              />
              {errors?.mobile && (
                <p className="text-red-500 mt-2 text-[10px]">
                  Invalid Mobile Number
                </p>
              )}
            </div>
          </div>
          {/* Country Dropdown */}
          <div className="w-40 lg:w-full mx-auto  mt-5">
            <CountryDropdown
              register={register}
              setValue={setValue}
              clearErrors={clearErrors}
              errors={errors}
            />
          </div>
          <div className="flex justify-center mt-10 lg:mt-20">
            <button
              onClick={() => {
                handleSubmit(SubmitFormData);
              }}
              className="border-[1px] border-[#DDDDDD]  w-40 h-10 hover:bg-green-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Contact;
