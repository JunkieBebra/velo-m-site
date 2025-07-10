import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Logo from "../assets/img/logo-light-desk.svg"
import Cart from "../assets/img/cart.svg"

export default function Header() {

    const location = useLocation();
    useEffect(() => {
        if(location.hash){
            const id = location.hash.replace("#", "");
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return (
        <header class="header">
        <div class="container header-contaniner">
            <img src={Logo} alt="Логотип Velo" class="header__logo-image"/>
            <nav class="header__nav">
                <ul class="header__menu">
                    <li class="header__menu-item"><Link to="/" class="header__menu-link">Главная</Link></li>
                    <li class="header__menu-item"><Link to="/catalog" class="header__menu-link">Каталог</Link></li>
                    <li class="header__menu-item"><a href="/#contacts" class="header__menu-link">Контакты</a></li>
                </ul>
            </nav>
            {/* <div class="header__user-wrapper">
                <button class="header__button header__button--login">Войти</button>
                <img src={Cart} width="40" height="40" alt="Корзина"/>
            </div> */}
        </div>
    </header>
  );
}