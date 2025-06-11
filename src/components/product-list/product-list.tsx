import { useCallback, useEffect, useState } from 'react';
import ProductItem from '../product-item/product-item';
import './priduct-list.css';
import useTelegram from '../hooks/useTelegram';

type ProductType = {
  id: string,
  title: string,
  description: string,
  price: number,
};

const products = [
  { id: '1', title: 'Джинсы', description: 'Синего цвета', price: 5000 },
  { id: '2', title: 'Куртка', description: 'Теплаяб зимняя', price: 5000 },
  { id: '3', title: 'Телефон', description: 'Классный, модный', price: 5000 },
  { id: '4', title: 'Полотенце', description: 'Мягкое и мохровое', price: 5000 },
  { id: '5', title: 'Чехол', description: 'Молодежный', price: 5000 },
  { id: '6', title: 'Кофта', description: 'С пупсиком', price: 5000 },
];

const getTotalPrice = (items: ProductType[]) => {
  return items.reduce((acc, item) => {
    return acc += item.price
  }, 0)
}

function ProductList() {
  const [addedItem, setAddedItem] = useState<ProductType[]>([]);

  const { tg, query_id, onClose } = useTelegram();

  const onSendData = useCallback(async () => {
    const data = {
      query_id,
      products: addedItem,
      totalPrice: getTotalPrice(addedItem)
    };
    await fetch('http://44.226.145.213:8000/web-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }, [addedItem]); // useCallback используем, чтобы сохранить ссылку на функцию 

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData); // подписались

    return () => {
      tg.offEvent('mainButtonClicked', onSendData); // отписались
    }
  }, []);

  const onAdd = (product: ProductType) => {
    const alreadyAdded = addedItem.find((item: ProductType) => item.id === product.id);
    let newItem = [];

    if (alreadyAdded) {
      newItem = addedItem.filter((item: ProductType) => item.id !== product.id)
    } else {
      newItem = [...addedItem, product]
    }

    setAddedItem(newItem);

    // if (newItem.length === 0) {
    //   tg.MainButton.hide();
    // } else {
    //   tg.MainButton.show();
    //   tg.MainButton.setParams({
    //     text: `Купить ${getTotalPrice(newItem)}`,
    //   })
    //   tg.MainButton.onClick(() => {
    //     onSendData().then(onClose).catch((e) => {
    //       tg.MainButton.setParams({
    //         text: `Упс ${e.message}`,
    //       })
    //     })
    //   })
    // }
  };


  return (
    <div className='list'>
      {
        products.map((item: ProductType) => (
          <ProductItem key={item.id} product={item} className={'item'} onAdd={onAdd} />
        ))
      }
    </div>
  )
}

export default ProductList;