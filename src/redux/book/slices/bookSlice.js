import { createSlice } from "@reduxjs/toolkit";

//initialState
const bookState = {
  bookDto: [
    {
      b_no: 1,
      b_category: 0,
      b_isbn: "",
      b_cover: "",
      b_title: "",
      b_author: "",
      b_publisher: "",
      b_publish_date: "",
      b_description: "",
      b_link: "",
      b_stock: 0,
      b_state: 1,
      b_reg_date: "",
      b_mod_date: "",
    },
  ],
};

const bookSlice = createSlice({
  name: "book",
  initialState: bookState,
  //action을 담자.
  reducers: {
    updateStock: (state, action) => {
      state.bookDto.forEach((e, idx) => {
        if (e.b_no === action.payload && e.b_stock > 0) {
          state.bookDto[idx].b_stock -= 1;
          console.log("state.bookDto 1: ", state.bookDto);
        }
      });
    },

    fetchBookDto: (state, action) => {
      state.bookDto = action.payload.dtos;
      console.log("state.bookDto: ", state.bookDto);
    },
  },
});

export const bookActions = bookSlice.actions;
export default bookSlice.reducer;