import { ReactNode } from "react";
import { Box } from "@mui/material";

import Header from "./header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
};

export default Layout;
