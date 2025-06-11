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
  onAdd: () => void;
}

function ProductItem({ product, className, onAdd }: ProductItemType) {
  return (
    <div className={'product ' + className}>
      <div className="img" />
      <div className="title">{product.title}</div>
      <div className="description">{product.description}</div>
      <div className="price">
        <span>Стоимость: <b>{product.price}</b></span>
      </div>
      <button onClick={onAdd}>Добавить в корзину</button>
    </div>
  )
};

export default ProductItem;

