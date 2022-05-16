import { useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState } from './Store';

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
