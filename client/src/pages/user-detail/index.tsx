import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";
import CustomLoading from "../../components/custom-loading";
import Layout from "../../components/layouts";
import {
  editUserThunk,
  getUserByEmailThunk,
} from "../../redux/reducers/UserReducer";
import "./style.scss";

const UserDetailPage = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { userByEmail, loadingSaveUser, savedUser, loadingGetUserByEmail } =
    useSelector((state: RootState) => state.user);

  // Zod
  const userSchema = z.object({
    firstName: z.string().min(1, "Must be greater than 1 character"),
    lastName: z.string().min(1, "Must be greater than 1 character"),
    email: z.string().min(1, "Must be greater than 1 character"),
  });

  type UserInfo = z.infer<typeof userSchema>;

  //   React hook form
  const { register, handleSubmit, formState, reset } = useForm<UserInfo>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
  });

  const { errors } = formState;

  const handleEditUser = (data: UserInfo) => {
    dispatch(editUserThunk(data));
  };

  const handleClose = () => {
    navigate("/", { replace: true });
  };

  // Run firstly
  useEffect(() => {
    email && dispatch(getUserByEmailThunk(email));
  }, [dispatch, email]);

  // Run secondly if dispatch(getUserByEmailThunk(email)) called successfully
  useEffect(() => {
    userByEmail && reset({ ...userByEmail });
  }, [userByEmail, reset]);

  // Back to home page when updating user sucessfully
  useEffect(() => {
    if (savedUser) navigate("/", { replace: true });
  }, [savedUser, navigate]);

  if (loadingGetUserByEmail) return <CustomLoading />;
  if (userByEmail === null)
    return (
      <Box className="user-detail-notfound">
        <Typography variant="h4">User not found!</Typography>
      </Box>
    );

  return (
    <Layout>
      {/* Add user form here */}
      <Box
        className="edit-user-form__wrapper"
        component="form"
        onSubmit={handleSubmit(handleEditUser)}
      >
        <Paper elevation={2} className="edit-user-form__inner">
          <Typography variant="h3">Edit user</Typography>
          <Stack
            direction="column"
            gap={1}
            sx={{ marginY: "12px", width: "500px" }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
            >
              <TextField
                type="text"
                variant="outlined"
                label="First Name"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                {...register("firstName")}
              />
              <TextField
                type="text"
                variant="outlined"
                label="Last Name"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                {...register("lastName")}
              />
            </Stack>
            <TextField
              type="email"
              variant="outlined"
              label="Email"
              fullWidth
              disabled
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
          </Stack>

          <Stack
            direction="row"
            gap={3}
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={loadingSaveUser}
            >
              {loadingSaveUser ? <CircularProgress size={24} /> : <>Save</>}
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleClose}
              disabled={loadingSaveUser}
            >
              Cancel
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Layout>
  );
};

export default UserDetailPage;
