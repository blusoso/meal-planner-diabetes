import axios from "axios";
import Cookies from "js-cookie";
import { COOKIE_NAME } from "./cookies";

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    common: {
      Authorization: Cookies.get(COOKIE_NAME.TOKEN),
    },
  },
});

export default Axios;
