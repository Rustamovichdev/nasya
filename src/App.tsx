import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/route";

const App = () => {
  return <main>
    <Suspense fallback="Loading...">
      <RouterProvider router={router}/>
    </Suspense>
  </main>
}
export default App;