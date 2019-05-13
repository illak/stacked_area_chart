import React from "react";
import useData from "./hooks/useData";
import Chart from "./components/Chart";

const App = () => {
  const data = useData();

  //console.log(data ? data[0] : "nothing");

  const margin = { top: 60, right: 20, bottom: 30, left: 50 };

  return data ? (
    <Chart data={data} margin={margin} width={600} height={400} />
  ) : (
    "fetching data..."
  );
};

export default App;
