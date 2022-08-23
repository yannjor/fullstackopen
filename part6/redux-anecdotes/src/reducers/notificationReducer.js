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

export const setNotification = (text, displayTime) => {
  return (dispatch) => {
    dispatch(updateNotification(text));
    setTimeout(() => dispatch(clearNotification()), displayTime);
  };
};

export const { updateNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
