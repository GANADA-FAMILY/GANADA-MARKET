import { useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState } from "./store";

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
