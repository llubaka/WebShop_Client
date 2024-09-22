import { useCallback, useEffect, useState } from "react";
import { React100vhDiv } from "../React100vhDiv";
import "./makeOrder.scss";
import emailjs from "emailjs-com";
import { Input } from "../Input/Input";
import { useCartContext } from "../../../context/cartContext";
import {
  calcFullPrice,
  calcFullPriceWithDiscount,
  mapCartToProducts,
} from "../../../helpers/cartFunctions";

type MakeOrderProps = {
  isVisible: boolean;
  closeModal: () => void;
};

export const MakeOrder: React.FC<MakeOrderProps> = ({
  isVisible,
  closeModal,
}) => {
  const { cart } = useCartContext();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    telephone: "",
    address: "",
    products: "",
    price: "",
    discount: "",
  });

  const mapProducts = useCallback(() => {
    return mapCartToProducts(cart).map((el) => {
      return {
        count: el.count,
        name: el.product.info,
        id: el.product.id,
      };
    });
  }, [cart]);

  const stringifyProducts = useCallback(() => {
    let str = "";
    mapProducts().forEach((el) => {
      <div>
        <div>Продукт: {el.name} </div>;<div> Брой: {el.count} </div>;
        <div> id: {el.id}</div>;
      </div>;
    });

    return str;
  }, [mapProducts]);

  useEffect(() => {
    setFormValues((curr) => {
      return {
        ...curr,
        products: stringifyProducts(),
        discount: `${(
          calcFullPrice(cart) - calcFullPriceWithDiscount(cart)
        ).toFixed(2)}лв.`,
        price: `Цена на продукти: ${calcFullPriceWithDiscount(cart).toFixed(
          2
        )}лв.`,
      };
    });
  }, [cart, mapProducts, stringifyProducts]);

  const sendEmail = (e: any) => {
    e.preventDefault();

    if (!process.env.REACT_APP_EMAIL_SERVICE_ID) {
      console.log("Email service id is undefined.");
      return;
    }
    if (!process.env.REACT_APP_EMAIL_TEMPLATE_ID) {
      console.log("Email template id is undefined.");
      return;
    }
    if (!process.env.REACT_APP_EMAIL_PUBLIC_KEY) {
      console.log("Email public key is undefined.");
      return;
    }

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_EMAIL_PUBLIC_KEY
      )
      .then(
        (result) => {
          window.location.reload();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleInnerContainerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  if (!isVisible) return <></>;

  return (
    <React100vhDiv onClick={closeModal} className="make-order-container">
      <div
        onClick={handleInnerContainerClick}
        className="make-order-container__inner-container"
      >
        <form className="contact-form" onSubmit={sendEmail}>
          <Input
            label="Име"
            type="text"
            name="name"
            value={formValues.name}
            onChange={(e) =>
              setFormValues((curr) => {
                return { ...curr, name: e.target.value };
              })
            }
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues((curr) => {
                return { ...curr, email: e.target.value };
              })
            }
          />

          <Input
            label="Телефон"
            type="text"
            name="telephone"
            value={formValues.telephone}
            onChange={(e) =>
              setFormValues((curr) => {
                return { ...curr, telephone: e.target.value };
              })
            }
          />

          <Input
            label="Адрес"
            type="text"
            name="address"
            value={formValues.address}
            onChange={(e) =>
              setFormValues((curr) => {
                return { ...curr, address: e.target.value };
              })
            }
          />

          <input
            hidden
            type="text"
            name="products"
            value={formValues.products}
          />

          <input
            hidden
            type="text"
            name="discount"
            value={formValues.discount}
          />

          <input hidden type="text" name="price" value={formValues.price} />

          <input type="submit" value="Send" />
        </form>
      </div>
    </React100vhDiv>
  );
};
