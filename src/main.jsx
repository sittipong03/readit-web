import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PaymentSuccess from './pages/PaymentSuccess'

createRoot(document.getElementById('root')).render(
    <App />
    // <PaymentSuccess />
)
