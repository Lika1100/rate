import { createSlice } from "@reduxjs/toolkit";
import { getDistributionType } from "./weeksPage";
import { views } from "../domain/studentPage/viewsKeys";


export const viewKeyStudentPageSlice = createSlice({
    name: 'viewKeyStudentPage',
    initialState: {
        type: 'price'
    },
    reducers: {
        setViewKey(state) {
            state.type = getDistributionType(views, state.type)
        }
    }
})


export const {setViewKey} = viewKeyStudentPageSlice.actions