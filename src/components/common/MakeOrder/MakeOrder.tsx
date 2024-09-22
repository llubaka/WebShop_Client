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
import ClipLoader from "../Loader/ClipLoader";
import { Link, useNavigate } from "react-router-dom";
import { getHomeRouteLink } from "../../../globals/Routes";

type MakeOrderProps = {
  isVisible: boolean;
  closeModal: () => void;
  showSnackbar: () => void;
};

const initFormValues = {
  name: "",
  email: "",
  telephone: "",
  address: "",
  products: "",
  price: "",
  discount: "",
};
const initErrors = {
  name: true,
  email: true,
  telephone: true,
  address: true,
};

export const MakeOrder: React.FC<MakeOrderProps> = ({
  isVisible,
  closeModal,
  showSnackbar,
}) => {
  const { cart, clearCart } = useCartContext();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [formActivated, setFormActivated] = useState(false);
  const [formValues, setFormValues] = useState(initFormValues);

  const [errors, setErrors] = useState(initErrors);

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
      const name = el.name.replaceAll("<", "");
      const count = el.count.toString().replaceAll("<", "");
      const id = el.id.replaceAll("<", "");
      str += `Продукт: ${name}<br>Брой: ${count}<br>id: ${id}<br><br>`;
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
        price: `${calcFullPriceWithDiscount(cart).toFixed(2)}лв.`,
      };
    });
  }, [cart, mapProducts, stringifyProducts]);

  const sendEmail = async (e: any) => {
    e.preventDefault();
    setFormActivated(true);
    validateForm();

    if (Object.values(errors).some((err) => err === true)) {
      return;
    }

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

    setIsSending(true);

    await emailjs.sendForm(
      process.env.REACT_APP_EMAIL_SERVICE_ID,
      process.env.REACT_APP_EMAIL_TEMPLATE_ID,
      e.target,
      process.env.REACT_APP_EMAIL_PUBLIC_KEY
    );

    setIsSending(false);
    closeModal();
    clearCart();
    showSnackbar();
    navigate(getHomeRouteLink());
  };

  const handleInnerContainerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const validateName = (str: string) => {
    setErrors((curr) => {
      return { ...curr, name: !str };
    });
  };

  const validateEmail = (str: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setErrors((curr) => {
      return { ...curr, email: !emailRegex.test(str) };
    });
  };

  const validateTelephone = (str: string) => {
    const regex = /^0\d{9}$/;

    setErrors((curr) => {
      return { ...curr, telephone: !regex.test(str) };
    });
  };

  const validateAddress = (str: string) => {
    setErrors((curr) => {
      return { ...curr, address: !str };
    });
  };

  const validateForm = () => {
    validateEmail(formValues.email);
    validateName(formValues.name);
    validateTelephone(formValues.telephone);
    validateAddress(formValues.address);
  };

  const closeMakeOrderModal = () => {
    closeModal();
    setErrors(initErrors);
    setFormValues(initFormValues);
  };

  const formatNumber = (value: string) => {
    return value
      .split("")
      .map((char, index) => {
        if (
          (index === 2 && value.length > 3) ||
          (index === 4 && value.length > 5) ||
          (index === 6 && value.length > 7)
        ) {
          return char + " ";
        }
        return char;
      })
      .join("");
  };

  if (isSending) return <ClipLoader className="make-order-loader" />;

  if (!isVisible) return <></>;

  return (
    <React100vhDiv
      onClick={closeMakeOrderModal}
      className="make-order-container"
    >
      <div
        onClick={handleInnerContainerClick}
        className="make-order-container__inner-container"
      >
        <div className="make-order-navbanner-copy">
          <Link
            onClick={closeMakeOrderModal}
            to={getHomeRouteLink()}
            aria-label="Navigate to home"
            className="make-order-navbanner-copy__title"
          >
            OnyxGold
          </Link>
          <span className="make-order-navbanner-copy__slash">/</span>
          <span className="make-order-navbanner-copy__info">
            Завършване на поръчка
          </span>
        </div>
        <form className="contact-form" onSubmit={sendEmail}>
          <Input
            label="Име или фамилия"
            type="text"
            name="firstName"
            value={formValues.name}
            hasError={errors.name}
            maxLength={50}
            forceShowError={formActivated}
            errorMessage="Въведете: Вашето име или фамилия"
            onBlur={() => validateName(formValues.name)}
            onChange={({ target: { value } }) => {
              let newValue = value.replace(/\s+/g, "").trim();

              if (newValue !== "" && !/^[A-Za-zА-Яа-я]+$/.test(newValue)) {
                return;
              }

              validateName(newValue);
              setFormValues((curr) => {
                return { ...curr, name: newValue };
              });
            }}
          />

          <Input
            label="Вашият имейл адрес"
            type="text"
            name="email"
            maxLength={100}
            value={formValues.email}
            hasError={errors.email}
            forceShowError={formActivated}
            onBlur={() => validateEmail(formValues.email)}
            errorMessage="Въведете: Email за връзка"
            onChange={({ target: { value } }) => {
              let newValue = value.replace(/\s+/g, "").trim();
              validateEmail(newValue);
              setFormValues((curr) => {
                return { ...curr, email: newValue };
              });
            }}
          />

          <Input
            label="Телефон за връзка"
            type="text"
            name="telephone"
            inputMode="numeric"
            value={formatNumber(formValues.telephone)}
            hasError={errors.telephone}
            maxLength={13}
            onBlur={() => validateTelephone(formValues.telephone)}
            forceShowError={formActivated}
            errorMessage="Въведете: Телефон - 0XX XX XX XXX"
            onChange={({ target: { value } }) => {
              let newValue = value.replace(/\s+/g, "").trim();

              if (newValue !== "" && !/^\d+$/.test(newValue)) {
                return;
              }

              if (newValue.length === 1 && newValue !== "0")
                newValue = `0${newValue}`;

              validateTelephone(newValue);
              setFormValues((curr) => {
                return { ...curr, telephone: newValue };
              });
            }}
          />

          <Input
            label="Адрес за доставка"
            type="text"
            name="address"
            value={formValues.address}
            hasError={errors.address}
            forceShowError={formActivated}
            errorMessage="Въведете: Адрес за доставка"
            onBlur={() => validateAddress(formValues.address)}
            onChange={({ target: { value } }) => {
              let newValue = value.trimStart();
              if (
                value.length > 2 &&
                value[value.length - 1] === " " &&
                value[value.length - 2] === " "
              ) {
                newValue = newValue.substring(0, newValue.length - 1);
              }

              validateAddress(newValue);
              setFormValues((curr) => {
                return { ...curr, address: newValue };
              });
            }}
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

          <button
            type="submit"
            value="Send"
            className="cart-order__delivery-pay-price-container--finish-order make-order-button"
          >
            Направи поръчка
          </button>
        </form>
      </div>
    </React100vhDiv>
  );
};
