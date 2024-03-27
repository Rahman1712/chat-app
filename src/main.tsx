import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import store from './store/index.tsx'
import { persistor } from './store/index.tsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { injectStore } from './config/axiosConfig.jsx'

injectStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  // </React.StrictMode>,
)
