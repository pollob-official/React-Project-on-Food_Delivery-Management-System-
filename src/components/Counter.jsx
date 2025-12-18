import React, {useReducer, useState } from "react";


const Counter = () => {

    const [couter, setCounter] = useState(0);
    const initialStaste ={
        loading: false,
        count:0,
        err:false
    }

    const countReducer= (state, action) =>{
        switch(action.type){
            case "add":
                return{...state, count: state.count + 1};
            case "sub":
                return{...state, count: state.count - 1};
            case "addNumber":
                return{...state, count: state.count + action.payload};

            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(countReducer, initialStaste);


    const add = () =>{
        dispatch({type: "add"});
    }
    const sub = () =>{
        dispatch({type: "sub"});
    }
    const addNumber = (val) =>{
        dispatch({type: "addNumber", payload: val});
    }

 return (
    <div>
      <h1>Counter: {state.count}</h1>
      <button onClick={add} type="button">ADD</button>
      <button onClick={sub} type="button">SUB</button>
      <button onClick={() => addNumber(5)} type="button">ADD Number 5</button>
    </div>
  );
};

export default Counter;