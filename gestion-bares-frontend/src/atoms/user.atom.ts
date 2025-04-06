import { atom } from "jotai";
import { IUser } from "../types/User";

const baseUserAtom = atom<IUser | null>(null);

export const userAtom = atom(
  (get) => {
    const user = get(baseUserAtom);
    if (user) return user;
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  },
  (_get, set, newUser: IUser | null) => {
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
    set(baseUserAtom, newUser);
  }
);
