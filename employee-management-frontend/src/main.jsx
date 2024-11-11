
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthApi from './API/authApi.jsx';


createRoot(document.getElementById('root')).render(
  <AuthApi>
     <App />
  </AuthApi>
   
 
)
