import { useEffect } from 'react';
import './app.css';
import './telegram-webapp.d.ts';
import Button from './components/button/button.tsx';

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
      <Button />
    </>
  )
}

export default App
