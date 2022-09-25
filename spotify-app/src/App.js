import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";

const App = () => {
  return (
    <div>
    <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          {/*<Route path='/details' element={<Details />} />
          <Route path="/settings" element={<Settings />} /> */}
    </Routes>
    </div>
  );
}

export default App;