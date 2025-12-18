import React, { useCallback } from 'react'
import ChildButton from './ChildButton';

function UseCallBack() {
    const [count, setCount] = React.useState(0);
    const handleClick = useCallback(() => {
        console.log("Child button clicked");
    }, []);
    console.log("parent rendered");
    return (
        <div className="container mt-4">
            <h3>With use CallBack</h3>
            <p>Count: {count}</p>
            <button className="btn btn-success" 
            onClick={() => setCount(count + 1)}>
                Increment Count
            </button>
            <ChildButton onClick={handleClick} />   

        </div>
    );
}

export default UseCallBack