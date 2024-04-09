import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { BetButtons } from "./BetButtons";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function ButtonsGrid({ data }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          {data.map((value) => {
            <Item>
              <BetButtons
                key={value.num}
                num={value.num}
                bgColor={value.bgColor}
              />
            </Item>;
          })}
        </Grid>
      </Grid>
    </Box>
  );
}
