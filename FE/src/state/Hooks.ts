import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from './Store';

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useRootDispatch = () => useDispatch<AppDispatch>();
