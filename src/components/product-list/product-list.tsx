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
  const [addedItems, setAddedItems] = useState<ProductType[]>([]);

  const { tg, queryId } = useTelegram();

  // useCallback используем, чтобы сохранить ссылку на функцию
  const onSendData = useCallback(async () => {
    const data = {
      queryId,
      products: addedItems,
      totalPrice: getTotalPrice(addedItems)
    };
    await fetch('http://44.226.145.213:8000/web-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }, [addedItems]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData); // подписались

    return () => {
      tg.offEvent('mainButtonClicked', onSendData); // отписались
    }
  }, [onSendData]);

  const onAdd = (product: ProductType) => {
    const alreadyAdded = addedItems.find((i) => i.id === product.id);

    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((i) => i.id !== product.id)
    } else {
      newItems = [...addedItems, product]
    }

    setAddedItems(newItems);

    if (products.length === 0) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
      tg.MainButton.setParams({ text: `Купить ${getTotalPrice(newItems)}` })
    }
  };


  return (
    <div className='list'>
      {
        products.map((item: ProductType) => (
          <ProductItem key={item.id} product={item} className={'item'} onAdd={() => onAdd(item)} />
        ))
      }
    </div>
  )
}

export default ProductList;