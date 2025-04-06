import { atom } from "jotai";
import { IPaginationInfo, PaginationInfo } from "../types/Pagination";
import { IUser } from "../types/User";

interface IUserAtom {
    loading: boolean,
    content: IUser[],
    pagination: IPaginationInfo,
    totalPages: number,
}

const usersAtom = atom<IUserAtom>({
    loading: false,
    content: [],
    pagination: new PaginationInfo(),
    totalPages: 1
});

export { usersAtom };