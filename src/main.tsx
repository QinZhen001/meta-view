import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import store from "./store"
import { Provider } from 'react-redux';
import "./css/global.css"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
