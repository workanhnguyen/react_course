import { User } from "../../interfaces";
import AxiosClient from "./AxiosClient";

const UserApi = {
	getUsers: (email?: string) => {
		// http://localhost:9090/api/v1/users?email=user@example.com
		return AxiosClient.get(`/users${email !== null && `?email=${email}`}`);
	},
	saveUser: (user: User) => {
		return AxiosClient.post("/users/new", {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		});
	},
	editUser: (user: User) => {
		return AxiosClient.post("/users/edit", {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		});
	},
	deleteUser: (email: string) => {
		return AxiosClient.delete("/users/delete", { data: email });
	},
};

export default UserApi;