import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function FormRow({ prop }) {
  return (
    <React.Fragment>
      <Grid item xs={3}>
        <Item>{prop._id}</Item>
      </Grid>
      <Grid item xs={3}>
        {prop.randomNumber > 5 ? (
          <Item sx={{color:'white',backgroundColor:"red"}}>{prop.randomNumber}</Item>
        ) : (
          <Item sx={{color:'white',backgroundColor:'green'}}>{prop.randomNumber}</Item>
        )}
      </Grid>
      <Grid item xs={3}>
        <Item>{prop.createdDate}</Item>
      </Grid>
      <Grid item xs={3}>
        {prop.randomNumber > 5 ? (
          <Item  sx={{color:'white',backgroundColor:"red"}}>Red</Item>
        ) : (
          <Item sx={{color:'white',backgroundColor:'green'}}>Green</Item>
        )}
      </Grid>
    </React.Fragment>
  );
}

export function GridButtons({ data }) {
  return (
    <>
      <Grid container spacing={1} mt={10}>
        <Grid item xs={3}>
          <Item sx={{ color: "black", fontSize: "18px" }}>Id</Item>
        </Grid>
        <Grid item xs={3}>
          <Item sx={{ color: "black", fontSize: "18px" }}>RandomNumber</Item>
        </Grid>
        <Grid item xs={3}>
          <Item sx={{ color: "black", fontSize: "18px" }}>CreatedDate</Item>
        </Grid>
        <Grid item xs={3}>
          <Item sx={{ color: "black", fontSize: "18px" }}>Color</Item>
        </Grid>
        {data?.map((val) => {
          return (
            <>
              <Grid container item spacing={3} key={val.id}>
                <FormRow prop={val} />
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
}
