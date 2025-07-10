import DarkLogo from "../assets/img/Logo-dark.svg";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer class="footer">
            <div class="container">
            <div class="footer__top">
                <div class="footer__logo">
                <img src={DarkLogo} alt="Логотип Velo" class="footer__logo-image"/>
                </div>
                <nav class="footer__nav">
                <ul class="footer__menu">
                    <li class="footer__menu-item"><Link to="/catalog" class="footer__menu-link">Каталог</Link></li>
                    <li class="footer__menu-item"><Link to="/" class="footer__menu-link">Подготовка велосипеда</Link></li>
                    <li class="footer__menu-item"><Link to="/" class="footer__menu-link">Политика конфиденциальности</Link></li>
                    <li class="footer__menu-item"><Link to="/" class="footer__menu-link">Пользовательское соглашение</Link></li>
                    <li class="footer__menu-item"><Link to="/" class="footer__menu-link">Профиль</Link></li>
                    <li class="footer__menu-item"><Link to="/" class="footer__menu-link">Контакты</Link></li>
                </ul>
                </nav>
            </div>
        
            <div class="footer__bottom">
                <p class="footer__copyright">
                © 2025 Интернет-магазин. Все права защищены.
                </p>
            </div>
            </div>
        </footer>
    );
}