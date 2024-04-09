import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { Box, Container, Typography } from "@mui/material";
import "../App.css";
import { BetButtons } from "../Components/BetButtons";
import { useEffect, useState, useRef, useCallback } from "react";
import { getData } from "../services/service";
import { GridButtons } from "../Components/Grid";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setBetValue,
  setBetEmpty,
  winBet,
  winColorBet,
} from "../redux/feature/bet/betSlice";
import { Link } from "react-router-dom";
import { FundModal } from "../Components/FundModal";
import { BetDropDown } from "../Components/BetDropDown";

export function Home() {
  var betValue = useSelector((state) => state.betValue);
  var getBalance = useSelector((state) => state.betValue.balance);
  const [gridData, setGridData] = useState();
  const [betColor, setBetColor] = useState("");
  let [counting, setCounting] = useState("");
  const [betAmount, setBetAmount] = useState(50);

  const preDateTime = useRef("empty");
  const dispatch = useDispatch();
  const Data = [
    { num: 1, bgColor: "green" },
    { num: 2, bgColor: "green" },
    { num: 3, bgColor: "green" },
    { num: 4, bgColor: "green" },
    { num: 5, bgColor: "green" },
    { num: 6, bgColor: "red" },
    { num: 7, bgColor: "red" },
    { num: 8, bgColor: "red" },
    { num: 9, bgColor: "red" },
    { num: 10, bgColor: "red" },
  ];

  function timeToSeconds(minutes, seconds) {
    return minutes * 60 + seconds;
  }

  function getTotalSeconds(startMinutes, startSeconds, endMinutes, endSeconds) {
    const startTimeInSeconds = timeToSeconds(startMinutes, startSeconds);
    const endTimeInSeconds = timeToSeconds(endMinutes, endSeconds);
    const totalSeconds = endTimeInSeconds - startTimeInSeconds;
    return totalSeconds;
  }
  var check = true;
  var num = 60;
  function getResultList() {
    const url = "https://win-api.vercel.app/api/get-ten-records";
    const data = getData(url);
    data
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
        if (result.length === 0) {
          if (check === true) {
            setCounting(num);
            check = false;
          } else {
            num = num - 1;
            setCounting(num);
          }
        }

        setGridData(result);
        const dateString = result[0].createdDate;
        console.log("dateString", dateString);
        var date = new Date(dateString);

        // Formatting the date into the desired format
        var formattedDate =
          date.getFullYear() +
          "-" +
          ("0" + (date.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + date.getDate()).slice(-2) +
          " " +
          ("0" + date.getHours()).slice(-2) +
          ":" +
          ("0" + date.getMinutes()).slice(-2) +
          ":" +
          ("0" + date.getSeconds()).slice(-2);
        console.log("formattedDate", formattedDate);
        const currentDate = new Date();
        const preDate = new Date(formattedDate);
        console.log(preDate.getMinutes(), "preDate");
        const preminutes = preDate.getMinutes();
        const preseconds = preDate.getSeconds();

        const curMinutes = currentDate.getMinutes();
        const curSeconds = currentDate.getSeconds();
        console.log("curMinutes", curMinutes);
        // console.log(preminutes, preseconds);
        // console.log(curMinutes, curSeconds);
        // console.log(dateString)

        const totalSeconds = getTotalSeconds(
          preminutes,
          preseconds,
          curMinutes,
          curSeconds
        );
        // console.log("totalSeconds", totalSeconds);
        const secResult = 55 - totalSeconds;
        console.log("secResult", secResult);
        setCounting(secResult);
        if (secResult === 59) {
          const winNumber = result[0].randomNumber;
          var openLottery = "Loss";
          console.log("bet", betValue.value);
          console.log("winNo", winNumber);
          betValue.value.map((val) => {
            console.log(val, winNumber, val === winNumber);

            if (val === winNumber) {
              openLottery = "Win";
              console.log("Win");
              dispatch(winBet(betAmount));
            }
            if (val === "R" && winNumber > 5) {
              console.log("win DoubleR");
              dispatch(winColorBet(betAmount));
            }
            if (val === "G" && winNumber <= 5) {
              console.log("doubleG");

              dispatch(winColorBet(betAmount));
            }
          });
          console.log(openLottery);
          dispatch(setBetEmpty());
          setBetColor("");
        } else {
          preDateTime.current = dateString;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    // console.log("getBalance", getBalance);
    getResultList();
    const interval = setInterval(() => {
      getResultList();
    }, 1000);
    return () => clearInterval(interval);
  }, [betValue]);

  const betAmountfun = useCallback((betAmount) => {
    console.log("betAmount", betAmount);
    setBetAmount(betAmount);
  }, []);
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Container maxWidth="sm">
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Link to="/">Home</Link>
            </Box>
            <Box>
              <Link to="/winning-logs">Winning Logs</Link>
            </Box>
            <Box>
              <FundModal />
            </Box>
            <Box>
              <Link to="/">About</Link>
            </Box>
          </Box>
        </Container>
        <Box>
          <Typography variant="h4" sx={{ float: "right", padding: "10px" }}>
            Rs :{getBalance}
          </Typography>
        </Box>
      </Box>

      <Box>
        <Box>
          <Typography textAlign={"center"}>{counting}</Typography>
        </Box>
        <Box position={"absolute"} right={550}>
          <BetDropDown betAmountfun={betAmountfun} />
        </Box>
      </Box>
      <Container maxWidth="sm">
        <Box width={"100%"} display={"flex"} justifyContent={"center"}>
          <Box display={"flex"} flexWrap={"wrap"} mt={10}>
            {Data.map((value) => {
              return (
                <BetButtons
                  key={value.num}
                  num={value.num}
                  bgColor={value.bgColor}
                  bet={betAmount}
                  getBalance={getBalance}
                />
              );
            })}

            <Box
              sx={{
                backgroundColor: "green",
                cursor: "pointer",
                position: "relative",
              }}
              width={"10.2%"}
              textAlign={"center"}
              p={2}
              m={1}
              onClick={() => {
                if (betColor === "") {
                  const total = getBalance - betAmount;
                  if (total >= 0) {
                    setBetColor("G");
                    const obj = {
                      betValue: "G",
                      betAmount: betAmount,
                    };
                    dispatch(setBetValue(obj));
                  }
                }
              }}
            >
              G
              {betColor === "G" && (
                <DoneOutlineIcon
                  sx={{
                    color: "white",
                    position: "absolute",
                    left: "6px",
                    bottom: "5px",
                    fontSize: "20px",
                  }}
                />
              )}
            </Box>
            <Box
              sx={{
                backgroundColor: "red",
                cursor: "pointer",
                position: "relative",
              }}
              width={"10.2%"}
              textAlign={"center"}
              p={2}
              m={1}
              onClick={() => {
                if (betColor === "") {
                  const total = getBalance - betAmount;
                  if (total >= 0) {
                    setBetColor("R");
                    const obj = {
                      betValue: "R",
                      betAmount: betAmount,
                    };
                    dispatch(setBetValue(obj));
                  }
                }
              }}
            >
              R
              {betColor === "R" && (
                <DoneOutlineIcon
                  sx={{
                    color: "white",
                    position: "absolute",
                    left: "6px",
                    bottom: "5px",
                    fontSize: "20px",
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Container>
      <GridButtons data={gridData} />
    </>
  );
}
