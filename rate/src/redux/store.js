import { configureStore } from '@reduxjs/toolkit';
import { eventsSlice } from "./events";
import { viewKeySlice } from './eventsPage';
import { distributionTypeSlice } from './weeksPage';
import { studentsPageSlice} from './studentsPage';
import { viewKeyStudentPageSlice } from './studentPage';

export const store = configureStore({
  reducer: {
    events: eventsSlice.reducer,
    viewKey: viewKeySlice.reducer,
    distributionType: distributionTypeSlice.reducer,
    studentsPage: studentsPageSlice.reducer,
    setViewKey: viewKeyStudentPageSlice.reducer
  },
});


