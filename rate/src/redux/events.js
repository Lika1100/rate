import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { readEventsFromLocalStorage } from "../domain/parser/readEventsFromLocalStorage";
import { file2text, text2events } from "../domain/parser/text2events";

export const eventsSlice = createSlice({
  name: 'events',
  initialState: readEventsFromLocalStorage(),
  reducers: {
    setEvents: (state, action) => {
      return action.payload;
    },
  }
})

const { setEvents } = eventsSlice.actions

export const uploadEvents = createAsyncThunk('events/uploadEvents', async (file, { dispatch }) => {
  const text = await file2text(file);
  const events = text2events(text);

  dispatch(setEvents(events));
  localStorage.setItem("events", JSON.stringify(events));
});

