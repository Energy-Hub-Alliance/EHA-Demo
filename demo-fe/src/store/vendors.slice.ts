import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { VendorResponseModel } from './connect/connectModel';

export const VENDORS_FEATURE_KEY = 'vendors';

export interface VendorsState {
  vendorsState: VendorResponseModel[];
}

const initialState: VendorsState = {
  vendorsState: [] as VendorResponseModel[],
};

export const vendorsSlice = createSlice({
  name: VENDORS_FEATURE_KEY,
  initialState,
  reducers: {
    clearVendors: (state) => {
      state.vendorsState = [];
    },
    setVendor: (
      state,
      { payload: vendor }: PayloadAction<VendorResponseModel>
    ) => {
      state.vendorsState.push(vendor);
    },
  },
});

export const { clearVendors, setVendor } = vendorsSlice.actions;

export const vendorsReducer = vendorsSlice.reducer;
