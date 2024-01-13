import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PreLoginHome from "./PreLoginHome";
import PostLoginHome from "./PostLoginHome";
import WriteMail from "./Components/WriteMail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PreLoginHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
