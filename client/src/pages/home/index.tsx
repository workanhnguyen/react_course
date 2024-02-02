import { Box } from "@mui/material";

import Layout from "../../components/layouts";
import UserTable from "./UserTable";
import AddUserAction from "./AddUserAction";
import "./style.scss";

const HomePage = () => {
  return (
    <Layout>
      <Box className="home-page__wrapper">
        <AddUserAction />
        <UserTable />
      </Box>
    </Layout>
  );
};

export default HomePage;
