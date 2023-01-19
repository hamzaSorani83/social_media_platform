import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IVarient } from '../../Formik/FormComponent';

export interface IState {
  loading: boolean;
  overlay: boolean;
  varient: IVarient;
  commentModal: boolean;
}

const initialState: IState = {
  loading: false,
  overlay: true,
  varient: 'purple',
  commentModal: true,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
        // overlay: action.payload,
      }
    },
    setOverlay: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        overlay: action.payload,
      }
    },
    setCommentModal: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        overlay: action.payload,
        commentModal: action.payload,
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

export const { setLoading, setOverlay, setVarient, setCommentModal } = mainSlice.actions;

export const selectLoading = (state: RootState) => state.main.loading;
export const selectOverlay = (state: RootState) => state.main.overlay;
export const selectCommentModal = (state: RootState) => state.main.commentModal;
export const selectVarient = (state: RootState) => state.main.varient;

export default mainSlice.reducer;

