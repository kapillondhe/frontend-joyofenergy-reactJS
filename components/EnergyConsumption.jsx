import React, { useEffect, useState } from "react";
import { renderChart } from "../utils/chart.js";
import { groupByDay, sortByTime } from "../utils/reading";
import calculateConsumption from "../utils/electricityConsumption.js"

export const EnergyConsumption = ({ readings }) => {
  const containerId = "usageChart";
  const [CCF, setCCF] = useState({});
  useEffect(() => {
    const days = 30;
    const lastNDaysReadings = sortByTime(groupByDay(readings)).slice(-1*days);
    const consumption = Math.round(calculateConsumption(lastNDaysReadings));
    setCCF({
      consumption : consumption,
      cost : Math.round(consumption * 0.138),
      footprint : (consumption * 0.0002532).toFixed(4)
    } )

    renderChart(containerId, lastNDaysReadings);
  }, []);

  return (
    <>
      <h1 className="regular darkgray line-height-1 mb3">Energy consumption</h1>
      <section className="mb3">
        <button
          className="
              h5
              inline-block
              shadow-2
              pl2
              pr2
              pt1
              pb1
              roundedMore
              border-grey
              bg-blue
              white
              bold
            "
        >
          Last 30 days
        </button>
      </section>
      <section className="chartHeight mb3">
        <canvas id={containerId} />
      </section>

      <div className="parent">
            <div  className="box shadow-2">
              <p className="boxTitle">Cost</p>
              <p className="boxNumber">{CCF.cost}</p>
              <p className="boxIcon">$</p>
            </div>
            <div  className="box shadow-2">
              <p className="boxTitle">Consumption</p>
              <p className="boxNumber">{CCF.cost}</p>
              <p className="boxIcon">kWh</p>
            </div>
            <div  className="box shadow-2">
              <p className="boxTitle">Footprint</p>
              <p className="boxNumber">{CCF.cost}</p>
              <p className="boxIcon">Tonnes</p>
            </div>
      </div>

    </>
  );
};
