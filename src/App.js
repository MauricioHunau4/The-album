import "./app.css"
import * as React from 'react';
import Title from "./Components/Title";
import Papers from "./Components/Papers"
import firebaseInit from "./firebase/firebaseConfig";

firebaseInit();
function App() {
  return (
    <>
      <Title />
      <Papers />
    </>
  );
}

export default App;
