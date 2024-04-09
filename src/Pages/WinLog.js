import { useEffect, useState } from "react";
import { GridButtons } from "../Components/Grid";
import { getData } from "../services/service";

export function WinLog() {
  const [gridData, setGridData] = useState("");

  function getResultList() {
    const url = "https://localhost:7212/api/Win/get-win-list";
    const data = getData(url);
    data
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setGridData(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  useEffect(() => {
    getResultList();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>winning Logs</h1>
      {gridData != "" && <GridButtons data={gridData} />}
    </>
  );
}
