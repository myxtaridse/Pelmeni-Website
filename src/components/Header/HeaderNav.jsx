import { Link } from "react-router-dom";

import LogoSvgWhite from "../../assets/img/logo-white.svg";
import LogoTextSvgWhite from "../../assets/img/logo-text-white.svg";
import stylesNav from "./HeaderNav.module.scss";

function HeaderNav() {
  return (
    <div className={stylesNav.header__left}>
      <Link to="/">
        <div className="header__logo__white">
          <img width="100" src={LogoSvgWhite} alt="Pelmeni logo" />
          <img width="180" src={LogoTextSvgWhite} alt="Pelmeni logo" />
        </div>
      </Link>
      <div className="header__navigation">
        <ul className="header__navigation">
          <li>
            <Link to="/">Меню</Link>
          </li>
          <li>
            <Link to="/">О нас</Link>
          </li>
          <li>
            <Link to="/">Отзывы</Link>
          </li>
          <li>
            <Link to="/">Контакты</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderNav;
