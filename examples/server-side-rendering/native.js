import React, { useState } from 'react'

export default () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button type="button" onClick={() => setCounter(counter + 1)}>
        click me
        {counter}
      </button>
    </div>
  );
};