import { atom } from "jotai";

interface Breadcrumb {
  label: string;
  path: string;
}

export const breadcrumbsAtom = atom<Breadcrumb[]>([]);