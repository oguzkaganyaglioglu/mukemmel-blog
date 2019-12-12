import React from 'react';

function App() {

  function sayHello() {
    alert('Hello!');
  }
  
  return (
    <button onClick={sayHello}>
      Click me!
    </button>
  );
}

export default App;