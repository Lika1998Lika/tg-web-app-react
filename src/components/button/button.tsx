import type React from 'react';
import './button.css';

type Props = {
  onClose: () => void;
  children: React.ReactNode,
}
function Button(props: Props) {
  const { onClose, children } = props
  return (
    <button onClick={onClose} className='button'>
      {children}
    </button>
  )
}

export default Button;
