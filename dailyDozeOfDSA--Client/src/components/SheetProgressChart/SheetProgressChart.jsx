import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { handleApiError } from "../../constants/reusableFunctions";
import { getUserProblemStatusCounts } from "../../services/problemSheetServices";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

ChartJS.register(ArcElement, Tooltip, Legend);

function SheetProgressChart({ SheetName, sheetEnum }) {
  const [chartDataObj, setChartDataObj] = useState(null);

  const navigate = useNavigate();
  const { setUserLoggedInStatusToFalse } = useContext(UserContext);

  useEffect(() => {
    (async function getChartData() {
      try {
        const response = await getUserProblemStatusCounts(sheetEnum);
        if (response.data.success) {
          const chartData = response.data.chartData;
          const chartDataArr = Array.from(
            Object.values(chartData),
            (currVal) => currVal
          );

          setChartDataObj({
            labels: ["Done", "Pending", "Revisit"],
            datasets: [
              {
                data: chartDataArr,
                backgroundColor: [
                  "rgb(34, 139, 34)",
                  "rgb(255, 165, 0)",
                  "rgb(30, 144, 255)",
                ],
              },
            ],
          });
        }
      } catch (error) {
        handleApiError(error, navigate, setUserLoggedInStatusToFalse);
      }
    })();
  }, []);

  const options = {
    cutout: "60%",
    borderColor: "black",
    borderWidth: 1,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="px-6 flex flex-col items-center">
      {chartDataObj && <Doughnut options={options} data={chartDataObj} />}
      <div className="mt-2">
        <span className="text-base capitalize font-light">{SheetName}</span>
      </div>
    </div>
  );
}

export default SheetProgressChart;
