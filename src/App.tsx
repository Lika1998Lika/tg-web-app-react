import { useEffect } from 'react';
import './app.css';
import './telegram-webapp.d.ts';

const tg = window.Telegram.WebApp;

function App() {

  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close()
  }
  return (
    <>
      <button onClick={onClose}>Close</button>
    </>
  )
}

export default App
