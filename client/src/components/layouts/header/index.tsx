import { Box, Typography } from "@mui/material";
import { List } from "@phosphor-icons/react";

import "./style.scss";

const Header = () => {
  return (
    <Box className="header__wrapper">
      <List size={32} color="#fff" cursor="pointer" />
      <Typography variant="h4" sx={{ color: "#fff" }}>
        React Course
      </Typography>
    </Box>
  );
};

export default Header;
