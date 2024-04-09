import Box from "@mui/material/Box";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { useDispatch } from "react-redux";
import { setBetValue } from "../redux/feature/bet/betSlice";
import { useSelector } from "react-redux";

export function BetButtons({ num, bgColor, bet, getBalance }) {
  const dispatch = useDispatch();
  const betValue = useSelector((state) => state.betValue);

  const handleClick = (num) => {
    console.log("hi", num);
    const total = getBalance - bet;
    console.log("total", total,total >= 0);
    if (total >= 0) {
      console.log("totla","if",total >= 0)
      const obj = {
        betValue: num,
        betAmount: bet,
      };
      if (betValue.value.length != 4) {
        dispatch(setBetValue(obj));
      }
    }
  };

  return (
    <Box
      sx={{ backgroundColor: bgColor, cursor: "pointer", position: "relative" }}
      width={"10.2%"}
      textAlign={"center"}
      p={2}
      m={1}
      onClick={() => {
        handleClick(num);
      }}
    >
      {num}
      {betValue.value != []
        ? betValue.value.map((value) => {
            return num == value ? (
              <DoneOutlineIcon
                key={value}
                sx={{
                  color: "white",
                  position: "absolute",
                  left: "6px",
                  bottom: "5px",
                  fontSize: "20px",
                }}
              />
            ) : (
              ""
            );
          })
        : ""}
    </Box>
  );
}
