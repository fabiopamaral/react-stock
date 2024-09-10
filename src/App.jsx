import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";
import { StockContextProvider } from "./contexts/StockContext";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <StockContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </StockContextProvider>
  );
}

export default App;
