import axios from "axios";
// @ts-ignore
import Cookies from "js-cookie";

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_HOST,
	timeout: 15 * 1000,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosClient.interceptors.request.use(
	async (config) => {
		const token = Cookies.get("token");
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
	async (response) => { return response; },
	async (error) => Promise.reject(error),
);

export default axiosClient;