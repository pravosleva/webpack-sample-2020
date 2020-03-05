import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inc, dec, incAsync } from '@/actions/counter';


const App = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter.value);

  return (
    <div className='centered flex-container'>
      <div className='flex-item'>redux & redux-saga</div>
      <div className='flex-item'><button onClick={() => dispatch(inc())}>+</button> {counter} <button onClick={() => dispatch(dec())}>-</button></div>
      <div className='flex-item'><button onClick={() => dispatch(incAsync())}>Inc async 1s</button></div>
    </div>
  )
};

export default App;
