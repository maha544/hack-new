import './App.css';
import AppRouter from './config/AppRouter';
import { Provider } from 'react-redux';
import store from './reduxtoolkit/store';

function App() {
  return (
    <Provider store={store}>
    <AppRouter />
  </Provider>
  );
}

export default App;
