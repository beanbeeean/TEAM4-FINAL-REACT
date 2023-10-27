import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './slices/counterSlice'

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          aria-label="decrement value"
          onClick={() => dispatch(decrement())}
        >
          decrement
        </button>
        <span>{count}</span>
      </div>
    </div>
  );
};
export default Counter;