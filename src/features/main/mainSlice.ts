import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IVarient } from '../../Formik/FormComponent';

export interface IState {
  loading: boolean;
  overlay: boolean;
  varient: IVarient;
  openCommentModal: boolean;
  commentModalId: string | null;
}

const initialState: IState = {
  loading: false,
  overlay: false,
  varient: 'purple',
  openCommentModal: false,
  commentModalId: '',
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
        overlay: action.payload,
      }
    },
    setOverlay: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        overlay: action.payload,
        loading: !action.payload ? false : state.loading,
        openCommentModal: !action.payload ? false : state.openCommentModal,
      }
    },
    closeCommentModal: (state) => {
      return {
        ...state,
        overlay: false,
        openCommentModal: false,
        commentModalId: null,
      }
    },
    setCommentModal: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        overlay: action.payload !== '',
        openCommentModal: action.payload !== '',
        commentModalId: action.payload,
      }
    },
    setVarient: (state, action: PayloadAction<IVarient>) => {
      return {
        ...state,
        varient: action.payload,
      }
    },
  }
} )

export const { setLoading, setOverlay, setVarient, closeCommentModal, setCommentModal } = mainSlice.actions;

export const selectLoading = (state: RootState) => state.main.loading;
export const selectOverlay = (state: RootState) => state.main.overlay;
export const selectOpenCommentModal = (state: RootState) => state.main.openCommentModal;
export const selectCommentModalId = (state: RootState) => state.main.commentModalId;
export const selectVarient = (state: RootState) => state.main.varient;

export default mainSlice.reducer;

