import Button from '../button/button';
import './product-item.css';

type ProductType = {
  id: string,
  title: string,
  description: string,
  price: number,
};

type ProductItemType = {
  product: ProductType,
  className: string,
  onAdd: (product: ProductType) => void;
}

function ProductItem({ product, className, onAdd }: ProductItemType) {

  const onAddHandler = () => {
    onAdd(product)
  }

  return (
    <div className={'product ' + className}>
      <div className="img" />
      <div className="title">{product.title}</div>
      <div className="description">{product.description}</div>
      <div className="price">
        <span>Стоимость: <b>{product.price}</b></span>
      </div>
      <Button onClose={onAddHandler}>Добавить в корзину</Button>
    </div>
  )
};

export default ProductItem;

