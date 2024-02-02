import { Backdrop, CircularProgress } from "@mui/material";

import "./style.scss";

const CustomLoading = () => {
  return (
    <Backdrop open={true} className="loading__wrapper">
      <CircularProgress sx={{ color: "#fff" }} />
    </Backdrop>
  );
};

export default CustomLoading;
