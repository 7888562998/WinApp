import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { useDispatch } from "react-redux";
import { setInitialbalance } from "../redux/feature/bet/betSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const prices = [100, 200, 400, 700, 1500, 2000, 4000, 7000];

function ChildModal({ price, allCloseModal }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const confirmHandle = () => {
    dispatch(setInitialbalance(price));
    setOpen(false);
    allCloseModal();
  };

  return (
    <Box pt={4}>
      <Button variant="contained" color="success" onClick={handleOpen}>
        Ok
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 200,
            textAlign: "center",
            border: "2px solid #1976D2",
            borderRadius: "10px",
          }}
        >
          <h2 id="child-modal-title">Are you sure?</h2>
          <p id="child-modal-description">Confirm to add Rs:{price}!</p>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={confirmHandle}>Yes</Button>
        </Box>
      </Modal>
    </Box>
  );
}

export function FundModal() {
  const [price, setPrice] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [payIndex, setPayIndex] = React.useState(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setPayIndex(null);
  };
  const allCloseModal = React.useCallback(() => {
    setPayIndex(null);
    setOpen(false);
  }, []);
  return (
    <div>
      <Button onClick={handleOpen}>Add Fund</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 400,
            border: "2px solid #1976D2",
            borderRadius: "10px",
          }}
          textAlign={"center"}
        >
          <h2 id="parent-modal-title">Add Funds</h2>
          <p
            id="parent-modal-description"
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              paddingBottom: "10px",
            }}
          >
            Choose your price you want to add.
          </p>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
            flexWrap={"wrap"}
            gap={4}
          >
            {prices.map((value, key) => {
              return (
                <div style={{ position: "relative" }}>
                  <Button
                    variant="contained"
                    key={key}
                    onClick={() => {
                      setPrice(value);
                      setPayIndex(key);
                    }}
                  >
                    {value}
                  </Button>
                  {payIndex === key && (
                    <DoneOutlineIcon
                      sx={{
                        color: "white",
                        position: "absolute",
                        left: "1px",
                        bottom: "3px",
                        fontSize: "14px",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </Box>
          <ChildModal price={price} allCloseModal={allCloseModal} />
        </Box>
      </Modal>
    </div>
  );
}
