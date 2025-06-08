import { useEffect } from 'react';
import './app.css';
import './telegram-webapp.d.ts';
import Header from './components/header/header.tsx';
import useTelegram from './components/hooks/useTelegram.tsx';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/product-list/product-list.tsx';
import Form from './components/form/form.tsx';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (

    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path={'/form'} element={<Form />} />
      </Routes>
    </div>
  )
}

export default App;
