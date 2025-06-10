import React, { useCallback, useEffect, useState } from 'react';
import './form.css';
import useTelegram from '../hooks/useTelegram';

function Form() {
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [subject, setSubject] = useState('physical');

  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = { country, street, subject };
    tg.sendData(JSON.stringify(data))
  }, [country, street, subject]); // useCallback используем, чтобы сохранить ссылку на функцию 

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData); // подписались

    return () => {
      tg.offEvent('mainButtonClicked', onSendData); // отписались
    }
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({ text: 'Отправить данные' })
  }, []);

  useEffect(() => {
    if (!country || !street) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street]);

  const onChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value)
  };

  const onChangeStreet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value)
  };

  const onChangeSubject = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSubject(e.target.value)
  };

  return (
    <form className='form'>
      <h3>Введите ваши данные</h3>
      <input
        className='input'
        type="text"
        placeholder={'Страна'}
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className='input'
        type="text"
        placeholder={'Улица'}
        value={street}
        onChange={onChangeStreet}
      />

      <select className='select' value={subject} onChange={onChangeSubject}>
        <option value={'physical'}>Физ. лицо</option>
        <option value={'legal'}>Юр. лицо</option>
      </select>
    </form>
  )
}

export default Form;