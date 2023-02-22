import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
} from "recharts";
import { chart_Dataset } from "../data/Chart";
import { useMediaQuery } from "react-responsive";

const Chart = () => {
  const [val, setVal] = useState(0);
  const [currentData, setCurrentData] = useState<
    Array<{ time: number; ECG: number }>
  >([]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (val + 200 > chart_Dataset.length) setVal(0);
      else setVal(val + 200);
      setCurrentData(chart_Dataset.slice(0 + val, 200 + val));
    }, 1000);
    return () => clearInterval(interval);
  }, [val]);
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  return (
    <div className="w-screen h-screen ">
      <div className="flex justify-center items-center h-full w-full ">
        {currentData.length === 0 ? (
          <p>Loading</p>
        ) : (
          <ResponsiveContainer
            width="100%"
            height={"50%"}
            aspect={isDesktop ? 4 : 1}
          >
            <LineChart
              data={currentData}
              width={100}
              margin={
                isDesktop
                  ? { top: 0, right: 50, left: 50, bottom: 30 }
                  : { top: 0, right: 100, left: 50, bottom: 30 }
              }
            >
              <XAxis
                padding={{ left: 50 }}
                allowDuplicatedCategory={false}
                dataKey="time"
                type="number"
                domain={["dataMin", "dataMax"]}
              >
                <Label value="time" position="bottom" />
              </XAxis>

              <YAxis
                dataKey="ECG"
                scale="linear"
                type="number"
                domain={["dataMin", "dataMax"]}
                interval={0}
              >
                <Label value="ECG" position="left" />
              </YAxis>
              <Line dataKey="ECG" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Chart;
