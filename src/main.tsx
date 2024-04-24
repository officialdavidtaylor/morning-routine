import './index.css';
import { Provider as JotaiProvider, createStore } from 'jotai';
import App from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';

// similar to React context; the jotaiStore can be used throughout the app
// as long as the components are children of the Provider
export const jotaiStore = createStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* The Jotai Provider ensures that updates to the store trigger re-renders */}
    <JotaiProvider store={jotaiStore}>
      <App />
    </JotaiProvider>
  </React.StrictMode>,
);
