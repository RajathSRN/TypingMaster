import React, {useState} from 'react';
import Statistics from './components/Statistics';
import Screen from './components/Screen';
import './App.css';

function App() {
  const [time, setTime] = useState(60);
  return (
    <>
      <div className="App">
        <Statistics time={time} />
        <Screen time={time} setTime={setTime} />
      </div>
    </>
  );
}

export default App;
