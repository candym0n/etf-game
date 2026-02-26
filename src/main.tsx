import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DialogProvider } from './providers/DialogProvider';
import App from './App.tsx'
import './main.css';

ReactDOM.createRoot(document.getElementById('root')! as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <DialogProvider>
                <App />
            </DialogProvider>
        </BrowserRouter>
    </React.StrictMode>
)
