import { useEffect, useState } from "react";
import { tsv, timeParse } from "d3";

const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("[FETCH]: Fetching data...");

    const parseDate = timeParse("%Y %b %d");

    // Function to apply to each object (or row)
    // watch d3.tsv() documentation
    // parse date + numeric values + percentage values
    const row = d => {
      d.date = parseDate(d.date);
      Object.keys(d)
        .slice(1)
        .forEach(k => (d[k] = +d[k] / 100));
      return d;
    };

    tsv(
      "https://raw.githubusercontent.com/illak/" +
        "data_for_test/master/data_tsv/" +
        "stacked_area1.tsv",
      row
    )
      .then(res => setData(res))
      .catch(error => console.log("[FETCH]: ", error));
  }, []);

  return data;
};

export default useData;
