import { styled } from "@mui/material";

export const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 540,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  borderRadius: 4,
  p: 4,
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "@media only screen and (max-width: 600px)": {
    width: "90%",
  },
};

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const SmallModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
