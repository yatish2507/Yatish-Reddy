import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router.ts';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { Suspense } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<div>Loading...</div>}>
        <I18nextProvider i18n={i18n}>
          <RouterProvider router={router} />
        </I18nextProvider>
      </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)

