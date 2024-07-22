import { TypedUseSelectorHook, useSelector } from "react-redux";

//@ts-ignore
import { RootState } from "@/store/reducers";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
