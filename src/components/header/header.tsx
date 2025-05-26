import Button from '../button/button';
import useTelegram from '../hooks/useTelegram';
import './header.css';

function Header() {
  const { onClose, user } = useTelegram();

  return (
    <div className='header'>
      <Button onClose={onClose}>Закрыть</Button>
      <span className='username'>{user?.username}</span>
    </div>
  );
}

export default Header;
