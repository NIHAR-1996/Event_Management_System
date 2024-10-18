import "./App.css";
import Home from "./Routes/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />
      <Home />
    </div>
  );
}

export default App;
