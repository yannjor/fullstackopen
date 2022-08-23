import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    updateNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return "";
    },
  },
});

let previousTimeoutId;
export const setNotification = (text, displayTime) => {
  return (dispatch) => {
    clearTimeout(previousTimeoutId);
    dispatch(updateNotification(text));
    previousTimeoutId = setTimeout(
      () => dispatch(clearNotification()),
      displayTime
    );
  };
};

export const { updateNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
