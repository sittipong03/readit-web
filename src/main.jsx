import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import PaymentSuccess from './pages/user/PaymentPage'

createRoot(document.getElementById('root')).render(
    <App />
    // <PaymentSuccess />
)
