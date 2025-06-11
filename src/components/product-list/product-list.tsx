import { useEffect, useState } from 'react';
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
  const [cart, setCart] = useState<ProductType[]>([]);
  const { tg, query_id } = useTelegram();

  const onSendData = async () => {
    const data = {
      query_id,
      products: cart,
      totalPrice: getTotalPrice(cart)
    };
    const response = await fetch('http://44.226.145.213:8000/web-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    return response
  }; // useCallback используем, чтобы сохранить ссылку на функцию 

  // useEffect(() => {
  //   tg.onEvent('mainButtonClicked', onSendData); // подписались

  //   return () => {
  //     tg.offEvent('mainButtonClicked', onSendData); // отписались
  //   }
  // }, []);

  const onAdd = (product: ProductType) => {
    setCart([...cart, product]);
  };

  useEffect(() => {
    if (cart.length === 0) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(cart)}`,
      })
      tg.MainButton.onClick(async () => {
        try {
          const result = await onSendData()
          if (result.status === 200) {
            tg.MainButton.setParams({
              text: `Success ${getTotalPrice(cart)}`,
            })
          } else {
            tg.MainButton.setParams({
              text: `Status: ${result.status}`,
            })
          }
        } catch (e) {
          // if (e instanceof Error) {
          //   tg.MainButton.setParams({
          //     text: `Oops!! ${e.message}`,
          //   })
          // }
        }
      })
    }
  }, [cart])

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