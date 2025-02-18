import { RouterProvider } from "react-router";
import { router } from "./Routes/Routes";

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
