import { distriburionTypes } from "../domain/weeksPage/weeksPageDistributionsTypes";
import { createSlice } from "@reduxjs/toolkit";

export const distributionTypeSlice = createSlice({
    name: "distributionType",
    initialState: {
        type: 'none',
    },
    reducers: {
        setDistributionType(state) {
            state.type = getDistributionType(distriburionTypes, state.type)
        },
    }
})


export function getDistributionType(types, prev) {
    return types[(types.indexOf(prev) + 1) % types.length]
}

export const { setDistributionType } = distributionTypeSlice.actions;
