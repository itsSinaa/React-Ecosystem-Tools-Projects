import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDisptach } from "./../store/index";

export const useAppDisptach: () => AppDisptach = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useLocalStroage = <T>(key: string, value: T) =>
  localStorage.setItem(key, JSON.stringify(value));
