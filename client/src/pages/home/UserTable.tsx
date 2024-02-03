import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";
import {
  deleteUser,
  deleteUserThunk,
  getUsersThunk,
} from "../../redux/reducers/UserReducer";
import CustomLoading from "../../components/custom-loading";

export default function UserTable() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { users, loadingGetUsers, loadingDeleteUser, successDeleteUser } =
    useSelector((state: RootState) => state.user);

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [userEmailToDelete, setUserEmailToDelete] = useState("");

  const handleClose = () => setOpenConfirmDeleteDialog(false);

  const handleOpen = (email: string) => {
    setUserEmailToDelete(email);
    setOpenConfirmDeleteDialog(true);
  };

  const handleDeleteUser = () => {
    dispatch(deleteUserThunk(userEmailToDelete));
  };

  useEffect(() => {
    // { action: { type: 'getUsers', payload: ''} }
    dispatch(getUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    if (successDeleteUser) {
      dispatch(deleteUser(userEmailToDelete));
      setOpenConfirmDeleteDialog(false);
    }
  }, [successDeleteUser, dispatch]);

  if (loadingGetUsers) return <CustomLoading />;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{user.id}</TableCell>
                <TableCell align="right">{user.firstName}</TableCell>
                <TableCell align="right">{user.lastName}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" gap={1} justifyContent="flex-end">
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/user-detail/${user.email}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleOpen(user.email)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {openConfirmDeleteDialog && (
        <Dialog open={openConfirmDeleteDialog}>
          <DialogTitle>
            <Typography variant="h4">Are you sure delete this user?</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              This user will be deleted forever. Do you want to continue?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Stack direction="row" gap={1}>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteUser}
                disabled={loadingDeleteUser}
              >
                {loadingDeleteUser ? (
                  <CircularProgress size={24} />
                ) : (
                  <Typography variant="body1">Delete</Typography>
                )}
              </Button>
              <Button
                variant="outlined"
                onClick={handleClose}
                disabled={loadingDeleteUser}
              >
                Cancel
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
