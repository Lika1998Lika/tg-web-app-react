import Button from '../button/button';
import './header.css';

function Header() {
  const tg = window.Telegram.WebApp;

  const onClose = () => {
    tg.close()
  };
  return (
    <div className='header'>
      <Button onClose={onClose}>Закрыть</Button>
      <span className='username'>{tg.initDataUnsafe?.user?.username}</span>
    </div>
  );
}

export default Header;
