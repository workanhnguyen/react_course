import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";

import { AppDispatch, RootState } from "../../redux/store";
import { addNewUser, saveUserThunk } from "../../redux/reducers/UserReducer";
import PopupForm from "../../components/popup-form";

const AddUserAction = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loadingSaveUser, savedUser, errorSaveUser } = useSelector(
    (state: RootState) => state.user
  );

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Zod
  const userSchema = z.object({
    firstName: z.string().min(1, "Must be greater than 1 character"),
    lastName: z.string().min(1, "Must be greater than 1 character"),
    email: z.string().min(1, "Must be greater than 1 character"),
  });

  type UserInfo = z.infer<typeof userSchema>;

  //   React hook form
  const { register, handleSubmit, formState } = useForm<UserInfo>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
  });

  const { errors } = formState;

  const handleSaveUser = (data: UserInfo) => {
    dispatch(saveUserThunk(data));
  };

  useEffect(() => {
    if (savedUser !== null) {
      dispatch(addNewUser(savedUser));
      handleClose();
    }
  }, [dispatch, loadingSaveUser, savedUser, errorSaveUser]);

  return (
    <>
      <Button
        variant="contained"
        sx={{ marginBottom: "12px" }}
        onClick={handleOpen}
      >
        Add new user
      </Button>

      <PopupForm open={open} title="Add new user">
        {/* Add user form here */}
        <Box component="form" onSubmit={handleSubmit(handleSaveUser)}>
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
        </Box>
      </PopupForm>
    </>
  );
};

export default AddUserAction;
