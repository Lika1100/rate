import { createSlice } from "@reduxjs/toolkit";
import { comparatorsKeys } from "../domain/eventsPage/eventsPageSort";
import { viewKeys } from "../domain/eventsPage/eventsPageView";
import { getNextValue } from "../domain/utils/getNextValue";

export const viewKeySlice = createSlice({
    name: "viewKey",
    initialState: {
      view: 'price',
      sort: 'last',
    },
    reducers: {
        rotateView(state) {
            state.view = getNextValue(viewKeys, state.view);
        },
        rotateSort(state) {
            state.sort = getNextValue(comparatorsKeys, state.sort);
        }
    }
});

export const {rotateView, rotateSort} = viewKeySlice.actions
