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
  searchBookDto: [{}],
};

const bookSlice = createSlice({
  name: "book",
  initialState: bookState,
  //action을 담자.
  reducers: {
    updateBookInfo: (state, action) => {
      state.bookDto.forEach((e, idx) => {
        if (e.b_no === action.payload.b_no) {
          const { cnt, bookState } = action.payload;

          state.bookDto[idx].b_stock = cnt;
          state.bookDto[idx].b_state = bookState;
          state.bookDto[idx].b_mod_date = new Date();
          console.log(
            "state.bookDto[idx].b_stock : ",
            state.bookDto[idx].b_stock
          );
          console.log("state.bookDto 1: ", state.bookDto);
        }
      });
    },

    updateStock: (state, action) => {
      state.bookDto.forEach((e, idx) => {
        if (e.b_no === action.payload && e.b_stock > 0) {
          state.bookDto[idx].b_stock -= 1;
          console.log(
            "state.bookDto[idx].b_stock : ",
            state.bookDto[idx].b_stock
          );
          console.log("state.bookDto 1: ", state.bookDto);
        }
      });
    },

    fetchSearchBook: (state, action) => {
      state.searchBookDto = action.payload;
      console.log("state.searchBookDto: ", state.searchBookDto);
    },

    fetchBookDto: (state, action) => {
      state.bookDto = action.payload.dtos;
      console.log("state.bookDto: ", state.bookDto);
    },
  },
});

export const bookActions = bookSlice.actions;
export default bookSlice.reducer;
