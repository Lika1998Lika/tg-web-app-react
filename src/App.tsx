import { useEffect } from 'react';
import './app.css';
import './telegram-webapp.d.ts';
import Header from './components/header/header.tsx';

const tg = window.Telegram.WebApp;

function App() {

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <>
      <Header />
    </>
  )
}

export default App
