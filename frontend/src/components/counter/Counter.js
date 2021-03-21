import React from 'react';

const Counter = () => {
  const [counter, setCounter] = React.useState(0);

  return (
    <div>
      <h1>This is counter app</h1>
      <div id="counter-value">{counter}</div>
      <button id="increment-btn" onClick={() => setCounter(counter + 1)}>Increment</button>
      <button id="decrement-btn" disabled={counter <= 0} onClick={() => setCounter(counter - 1)}>Decrement</button>
    </div>
  )
}

export default Counter;