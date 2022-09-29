import React from "react";
import Pages from "./pages";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div>
      <Toaster className="text-sm" />
      <Pages />
    </div>
  );
}

export default App;
