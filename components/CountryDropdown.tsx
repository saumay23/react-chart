import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { FormData } from "../pages/contact";
type CountryDropdown = {
  country: string;
  region: string;
};
const CountryDropdown = ({
  register,
  setValue,
  errors,
  clearErrors,
}: {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  errors: FieldErrors<FormData>;
  clearErrors: UseFormClearErrors<FormData>;
}) => {
  const ref = useRef<any>(null);
  const [country, setCountry] = useState<CountryDropdown[]>([]);
  const [option, setOption] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const fetchCountry = async () => {
    try {
      const response = await axios.get("api/country");
      setCountry(Object.values(response.data.country));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const checkIfClickedOutside = (e: { target: any }) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);
  useEffect(() => {
    fetchCountry();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full h-10 border-[1px] border-[#DDDDDD] rounded-md "
    >
      <div className="relative w-full h-full">
        <div
          className="w-full h-full flex pr-[5px]"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <input
            readOnly
            className=" pl-2 rounded-md cursor-pointer flex items-center w-[90%] h-full mr-1 outline-none text-xs"
            placeholder="Select Country"
            value={option}
            {...register("country", { required: "true" })}
          />

          {isOpen ? (
            <ChevronUpIcon className="w-[10%] max-w-[20px]" />
          ) : (
            <ChevronDownIcon className="w-[10%]  max-w-[20px]  " />
          )}
        </div>
        {errors?.country && (
          <p className="text-red-500 mt-2 text-[10px]">Country is Required</p>
        )}
        {isOpen ? (
          <div className="absolute w-full h-[200px] bg-[#FFFFFF]  top-12 border-[1px] border-[#DDDDDD] rounded-md rounded-t-none overflow-auto">
            {country?.map((data, idx) => {
              return (
                <p
                  onClick={() => {
                    setOption(data.country);
                    setValue("country", data.country);
                    clearErrors("country");
                    setIsOpen(false);
                  }}
                  className="p-2 hover:bg-[#DDDDDD] cursor-pointer"
                  key={idx}
                >
                  {data.country}
                </p>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CountryDropdown;
