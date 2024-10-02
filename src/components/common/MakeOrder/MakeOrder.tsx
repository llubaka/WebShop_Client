import { useCallback, useEffect, useMemo, useState } from "react";
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
import {
  getLocalStorageItem,
  LocalStorageKeys,
  setLocalStorageItem,
} from "../../../helpers/localStorageFunctions";
import AppSettings from "../../../settings/appSettings.json";
import { Telephone } from "../../../svg/Telephone";
import { DropDown } from "../DropDown/DropDown";
import Cities from "../../../settings/econtCities.json";
import Offices from "../../../settings/econtOffices.json";
import Regions from "../../../settings/econtRegions.json";
import { Pagination } from "../Pagination/Pagination";

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
  additionalRequest: "",
};
const initErrors = {
  name: true,
  email: true,
  telephone: true,
  address: true,
  orderError: true,
};

enum OrderType {
  ADDRESS = "До адрес",
  ECONT_OFFICE = "До офис на Еконт",
}

export const MakeOrder: React.FC<MakeOrderProps> = ({ isVisible, closeModal, showSnackbar }) => {
  const { cart, clearCart } = useCartContext();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [formActivated, setFormActivated] = useState(false);
  const [formFirstStepActivated, setFormFirstStepActivated] = useState(false);
  const [formValues, setFormValues] = useState(initFormValues);
  const [reachedOrderLimit, setReachedOrderLimit] = useState(false);
  const [econtCity, setEcontCity] = useState({ city: "", id: "" as any });
  const [econtRegion, setEcontRegion] = useState({ city: "", id: "" as any });
  const [econtOffice, setEcontOffice] = useState("");
  const [orderType, setOrderType] = useState<OrderType | "">("");
  const [page, setPage] = useState(0);

  const handlePageChange = (page: number) => {
    if (page === 1) {
      handleNextStepClick();
      return;
    }
    setPage(page);
  };

  const handleOnChangeRegion = (value: string) => {
    setEcontRegion({ city: value, id: Regions.find((el) => el.city === value)?.id });
    setEcontOffice("");
    setEcontCity({ city: "", id: "" });
  };

  const handleOnChangeCity = (value: string) => {
    setEcontCity({ city: value, id: Cities.find((el) => el.city === value)?.id });
    setEcontOffice("");
  };

  const handleOnChageOffice = (value: string) => {
    setEcontOffice(value);
  };

  const handleOrderTypeChange = (value: string) => {
    setOrderType(value as OrderType);
    setEcontOffice("");
    setEcontCity({ city: "", id: "" });
    setFormValues((curr) => {
      return { ...curr, address: "" };
    });

    if (value === OrderType.ECONT_OFFICE) {
      setErrors((curr) => {
        return { ...curr, address: false };
      });
    }
  };

  const [errors, setErrors] = useState(initErrors);

  const regions = useMemo(() => {
    return Regions.map((el) => el.city);
  }, []);

  const cities = useMemo(() => {
    return Cities.filter((c) => c.region === econtRegion.city).map((el) => el.city);
  }, [econtRegion.city]);

  const offices = useMemo(() => {
    if (econtCity.id || econtCity.id === 0) {
      return Offices.filter((el) => el.cityId === econtCity.id).map(
        (el) => `${el.name} - ${el.address}`
      );
    }

    return [];
  }, [econtCity.id]);

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
        discount: `${(calcFullPrice(cart) - calcFullPriceWithDiscount(cart)).toFixed(2)}лв.`,
        price: `${calcFullPriceWithDiscount(cart).toFixed(2)}лв.`,
      };
    });
  }, [cart, mapProducts, stringifyProducts]);

  const has24HoursDifference = (lastOrderDate: Date): boolean => {
    const msIn24Hours = 24 * 60 * 60 * 1000; // milliseconds in 24 hours
    const timeDifference = Math.abs(new Date().getTime() - lastOrderDate.getTime());
    return timeDifference >= msIn24Hours;
  };

  const isSpamming = () => {
    const lastOrderDate = new Date(getLocalStorageItem(LocalStorageKeys.LAST_ORDER));
    const has24HoursDifferenceFromLastOrder = has24HoursDifference(lastOrderDate);

    const sendEmailsCount = getLocalStorageItem(LocalStorageKeys.SEND_EMAILS) || 0;

    if (sendEmailsCount < AppSettings.maxSendEmailCountForDay) {
      setLocalStorageItem(LocalStorageKeys.SEND_EMAILS, sendEmailsCount + 1);
      setLocalStorageItem(LocalStorageKeys.LAST_ORDER, new Date());

      return false;
    }

    if (
      sendEmailsCount >= AppSettings.maxSendEmailCountForDay &&
      has24HoursDifferenceFromLastOrder
    ) {
      setLocalStorageItem(LocalStorageKeys.SEND_EMAILS, 1);
      setLocalStorageItem(LocalStorageKeys.LAST_ORDER, new Date());

      return false;
    }

    setReachedOrderLimit(true);
    return true;
  };

  const sendEmail = async (e: any) => {
    e.preventDefault();
    setFormActivated(true);
    validateForm();

    if (!isFormValid()) return;

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

    if (isSpamming()) return;

    setIsSending(true);

    await emailjs.sendForm(
      process.env.REACT_APP_EMAIL_SERVICE_ID,
      process.env.REACT_APP_EMAIL_TEMPLATE_ID,
      e.target,
      process.env.REACT_APP_EMAIL_PUBLIC_KEY
    );

    setIsSending(false);
    closeMakeOrderModal();
    clearCart();
    showSnackbar();
    navigate(getHomeRouteLink());
  };

  //const separators = new Set(EcontCitiesFirstLetters);

  const handleInnerContainerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const validateName = (str: string) => {
    const isValid = !!str;

    setErrors((curr) => {
      return { ...curr, name: !isValid };
    });

    return isValid;
  };

  const validateEmail = (str: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(str);

    setErrors((curr) => {
      return { ...curr, email: !isValid };
    });

    return isValid;
  };

  const validateTelephone = (str: string) => {
    const regex = /^0\d{9}$/;
    const isValid = regex.test(str);

    setErrors((curr) => {
      return { ...curr, telephone: !isValid };
    });

    return isValid;
  };

  const validateAddress = (str: string) => {
    const isValid = !!str;

    setErrors((curr) => {
      return { ...curr, address: !isValid };
    });

    return isValid;
  };

  const validateOrderType = () => {
    if (!orderType) {
      setErrors((curr) => {
        return { ...curr, orderError: true };
      });

      return;
    }

    if (orderType === OrderType.ADDRESS) {
      validateAddress(formValues.address);
      setErrors((curr) => {
        return { ...curr, orderError: !formValues.address };
      });

      return;
    }

    if (orderType === OrderType.ECONT_OFFICE) {
      const officeError = !econtOffice;
      const cityError = !econtCity.city;

      setErrors((curr) => {
        return { ...curr, orderError: officeError || cityError };
      });
      return;
    }
  };

  const isFirstPageValid = () => {
    return (
      validateName(formValues.name) &&
      validateEmail(formValues.email) &&
      validateTelephone(formValues.telephone)
    );
  };

  const isSecondPageValid = () => {
    if (!orderType) return false;

    if (orderType === OrderType.ADDRESS) {
      return validateAddress(formValues.address);
    }

    if (orderType === OrderType.ECONT_OFFICE) {
      return !!econtOffice && !!econtCity.city && !!econtRegion;
    }
  };

  const isFormValid = () => {
    return isFirstPageValid() && isSecondPageValid();
  };

  const handleNextStepClick = () => {
    setFormFirstStepActivated(true);

    if (isFirstPageValid()) {
      setPage(1);
    }
  };

  const validateForm = () => {
    validateEmail(formValues.email);
    validateName(formValues.name);
    validateTelephone(formValues.telephone);
    validateOrderType();
  };

  const closeMakeOrderModal = () => {
    setPage(0);
    setFormFirstStepActivated(false);
    setEcontOffice("");
    setEcontRegion({ city: "", id: "" });
    setEcontCity({ city: "", id: "" });
    setOrderType("");
    setFormActivated(false);
    closeModal();
    setErrors(initErrors);
    setFormValues(initFormValues);
    setReachedOrderLimit(false);
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
    <React100vhDiv onClick={closeMakeOrderModal} className="make-order-container">
      <div onClick={handleInnerContainerClick} className="make-order-container__inner-container">
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
          <span className="make-order-navbanner-copy__info">Завършване на поръчка</span>
        </div>
        <form className="contact-form" onSubmit={sendEmail}>
          <div style={page === 1 ? { display: "none" } : {}}>
            <Input
              label="Име или фамилия"
              type="text"
              name="firstName"
              value={formValues.name}
              hasError={errors.name}
              maxLength={50}
              forceShowError={formActivated || formFirstStepActivated}
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
              forceShowError={formActivated || formFirstStepActivated}
              onBlur={() => validateEmail(formValues.email)}
              errorMessage="Въведете: Имейл адрес"
              onChange={({ target: { value } }) => {
                let newValue = value.replace(/\s+/g, "").trim();
                newValue = newValue.replace(",", ".");
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
              forceShowError={formActivated || formFirstStepActivated}
              errorMessage="Въведете: Телефон - 0XX XX XX XXX"
              onChange={({ target: { value } }) => {
                let newValue = value.replace(/\s+/g, "");

                if (newValue !== "" && !/^\d+$/.test(newValue)) {
                  return;
                }

                if (newValue.length === 1 && newValue !== "0") newValue = `0${newValue}`;

                validateTelephone(newValue);
                setFormValues((curr) => {
                  return { ...curr, telephone: newValue };
                });
              }}
            />
          </div>
          {page === 1 && (
            <>
              <div className="x-dropdown-container">
                <DropDown
                  value={orderType || ""}
                  options={[OrderType.ADDRESS, OrderType.ECONT_OFFICE]}
                  placeholder="Начин на доставка"
                  onChange={handleOrderTypeChange}
                  errorMessage="Изберете: Начин на доставка"
                  hasError={!orderType && formActivated}
                />
              </div>
              {orderType === OrderType.ADDRESS && (
                <>
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
                </>
              )}
              {orderType === OrderType.ECONT_OFFICE && (
                <>
                  <div className="x-dropdown-container">
                    <DropDown
                      value={econtRegion.city}
                      options={regions}
                      placeholder="Изберете област"
                      onChange={handleOnChangeRegion}
                      errorMessage="Изберете: Област за доставка"
                      hasError={!econtRegion.city && formActivated}
                    />
                  </div>
                  <div className="x-dropdown-container">
                    <DropDown
                      value={econtCity.city}
                      options={cities}
                      placeholder="Изберете населено място"
                      onChange={handleOnChangeCity}
                      errorMessage="Изберете: Населено място за доставка"
                      hasError={!econtCity.city && formActivated}
                    />
                  </div>
                  <div className="x-dropdown-container">
                    <DropDown
                      value={econtOffice}
                      options={offices}
                      placeholder="Изберете офис на Еконт"
                      onChange={handleOnChageOffice}
                      errorMessage="Изберете: Офис на Еконт"
                      hasError={!econtOffice && formActivated}
                    />
                  </div>
                </>
              )}
              {orderType && (
                <Input
                  label="Бележка"
                  type="text"
                  name="additionalRequest"
                  maxLength={100}
                  value={formValues.additionalRequest}
                  hasError={false}
                  forceShowError={false}
                  onBlur={() => {}}
                  errorMessage=""
                  onChange={({ target: { value } }) => {
                    setFormValues((curr) => {
                      return { ...curr, additionalRequest: value };
                    });
                  }}
                />
              )}
            </>
          )}

          <input
            hidden
            type="text"
            name="products"
            value={formValues.products}
            onChange={() => {}}
          />

          <input
            hidden
            type="text"
            name="discount"
            value={formValues.discount}
            onChange={() => {}}
          />

          <input hidden type="text" name="price" value={formValues.price} onChange={() => {}} />

          <input hidden type="text" name="orderType" value={orderType} onChange={() => {}} />

          <input
            hidden
            type="text"
            name="econtRegion"
            value={econtRegion.city}
            onChange={() => {}}
          />

          <input hidden type="text" name="econtCity" value={econtCity.city} onChange={() => {}} />

          <input hidden type="text" name="econtOffice" value={econtOffice} onChange={() => {}} />

          {reachedOrderLimit && (
            <div className="reached-limit">
              <div>Достигнахте лимит на поръчки.</div>
              <div>
                За да поръчате, моля свържете се с нас на телефон:
                <a
                  className="sp-additional-info--href"
                  href={`tel:${AppSettings.contact.telephone}`}
                >
                  <div className="sp-additional-info--href--contact">
                    <span className="sp-additional-info--icon">
                      <Telephone color="#e39606" />
                    </span>
                    {AppSettings.contact.telephone}
                  </div>
                </a>
              </div>
            </div>
          )}

          <Pagination
            className="make-order-pagination"
            pages={2}
            page={page}
            onChange={handlePageChange}
          />

          {page === 0 && (
            <button
              onClick={handleNextStepClick}
              type="button"
              className="cart-order__delivery-pay-price-container--finish-order make-order-button"
            >
              Следваща стъпка
            </button>
          )}
          {page === 1 && (
            <button
              type="submit"
              value="Send"
              className="cart-order__delivery-pay-price-container--finish-order make-order-button"
            >
              Направи поръчка
            </button>
          )}
        </form>
      </div>
    </React100vhDiv>
  );
};
