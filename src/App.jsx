import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";
import AppRouter from "./routes/AppRouter"
function App() {
  return (
    <>
    <AppRouter/>
    <ToastContainer
      position='top-right'
      />
    <Toaster richColors />
    </>
  )
}
export default App;
