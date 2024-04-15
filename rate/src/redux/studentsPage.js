import { createSlice } from "@reduxjs/toolkit";
import { columns } from "../pages/StudentsPage/columns";


export const studentsPageSlice = createSlice({
    name: 'comparatorChange',
    initialState: {
        sorting: {
            keyExtractor: columns[2].keyExtractor,
            desc: true
        },
        counter: 0,
    },
    reducers: {
        setSorting(state, action) {
            const {keyExtractor, desc} = state.sorting

            if (keyExtractor === action.payload) {
                state.sorting.desc = !desc
            } else {
                state.sorting = {
                    keyExtractor: action.payload,
                    desc: true
                }
            }
        },
        increment(state) {
            state.counter = state.counter + 1
        },
        decrement(state) {
            state.counter = state.counter - 1
        }
    }
})


export const {setSorting, increment, decrement} = studentsPageSlice.actions