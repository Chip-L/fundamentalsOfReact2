import { useState } from "react";
import "./App.css";

function App() {
  const url = "https://cdn2.thecatapi.com/images/ba6.jpg";

  return (
    <>
      <img src={url} alt="cat image" />
    </>
  );
}

export default App;
