import { useEffect } from 'react';
import './app.css';
import './telegram-webapp.d.ts';
import Header from './components/header/header.tsx';
import useTelegram from './components/hooks/useTelegram.tsx';

function App() {
  const { tg, onToggleButton } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <Header />
      <button onClick={onToggleButton}>toggle</button>
    </div>
  )
}

export default App;
