import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDisptach } from "./../app/store";

export const useAppDisptach: () => AppDisptach = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
