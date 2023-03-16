import { atom } from "recoil";
import { KEYS } from "../keys";

const authState = atom({
  key: KEYS.AUTH,
  default: undefined,
});

export default authState;
