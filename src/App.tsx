import './App.module.scss';
import { BrowserRouter } from 'react-router-dom'
import BaseLayout from './components/BaseLayout'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {

  return (
    <>
     <div>
         <BrowserRouter>
            <BaseLayout />
         </BrowserRouter>
      </div>
    </>
  )
}

export default App
