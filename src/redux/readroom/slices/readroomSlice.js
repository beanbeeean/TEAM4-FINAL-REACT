import { createSlice } from "@reduxjs/toolkit";

//initialState
const readroomState = {
  roomDto: [
    {
      re_no: 0,
      re_room_no: 1,
      re_seat: 0,
      re_reservation: "",
      re_state: 0,
    },
  ],
};

const readroomSlice = createSlice({
  name: "readroom",
  initialState: readroomState,
  //action을 담자.
  reducers: {
    fetchRoomDto: (state, action) => {
      // state.roomDto = action.payload;
      console.log("state.roomDto: ", state.roomDto);
    },
  },
});

export const readroomActions = readroomSlice.actions;
export default readroomSlice.reducer;
