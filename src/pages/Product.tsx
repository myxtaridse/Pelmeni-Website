import React from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";

import { addCartValue } from "../redux/cartSlice/slicesCart";

import { SkeletProduct } from "../components/index";

type ProductProps = {
  id: string;
  count: number;
  imageUrl: string;
  name: string;
  price: number;
  sizes: any;
  types: any;
  composition: number;
};

const Product: React.FC = () => {
  // React.FC - это функциональный компонент - тип
  const typesNames = ["без бульона", "с бульоном"];

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const [productItems, setProductItems] = React.useState<ProductProps>();
  const { id } = useParams();

  const navigate = useNavigate();

  React.useEffect(() => {
    async function productShow() {
      try {
        const res = await Axios.get(
          `https://66028e549d7276a755538691.mockapi.io/items/${id}`
        );

        setProductItems(res.data);
      } catch (error) {
        alert("error");
        navigate("/");
      }
    }
    productShow();
  }, []);

  const dispatch = useDispatch();

  if (!productItems) {
    return (
      <div>
        <SkeletProduct />
      </div>
    );
  }

  let item = { ...productItems };
  const typesChange = typesNames[activeType];
  const sizesChange = item.sizes[activeSize];

  //console.log(typesNames[types], sizes[activeType]);

  // const { types, sizes, ...delProps } = productItems;
  // console.log(productItems.types);
  // console.log(delProps);

  const onClickAdd = () => {
    Object.defineProperty(item, "types", {
      value: typesChange,
    });
    Object.defineProperty(item, "sizes", {
      value: sizesChange,
    });
    //console.log(item);

    dispatch(addCartValue(item));
  };

  // console.log(types, sizes);

  return (
    <div className="container product">
      <div className="product__img">
        <img src={productItems.imageUrl} alt="product" />
      </div>
      <div className="product__character">
        <h1>{productItems.name}</h1>
        <h4>
          Состав:{" "}
          <b className="product__composition">{productItems.composition}</b>
        </h4>
        <div className="product__selector">
          <ul>
            {productItems.types.map((type: any) => {
              return (
                <li
                  key={type}
                  className={activeType === type ? "active" : ""}
                  onClick={() => setActiveType(type)}
                >
                  {typesNames[type]}
                </li>
              );
            })}
          </ul>
          <ul>
            {productItems.sizes.map((size: number, i: number) => {
              return (
                <li
                  key={size}
                  onClick={() => setActiveSize(i)}
                  className={activeSize === i ? "active" : ""}
                >
                  {size} гр.
                </li>
              );
            })}
          </ul>
        </div>
        <div className="product__bottom-buttons">
          <Link
            to="/"
            className="button button--outline button--add go-back-btn"
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>

            <span>Вернуться назад</span>
          </Link>
          <div onClick={onClickAdd} className="button pay-btn">
            <span>Добавить в корзину</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
