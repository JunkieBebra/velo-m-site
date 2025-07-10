import Header from '../components/header';
import Footer from '../components/footer';
import { Link } from "react-router-dom";

import Hero from "../assets/img/hero.png"
import KidsBikes from "../assets/img/kids-bikes.svg";
import AdultsBikes from "../assets/img/adult-bikes.svg"
import StepOne from "../assets/img/step-one.png"
import StepTwo from "../assets/img/step-two.png"
import StepThree from "../assets/img/step-three.png"
import Email from "../assets/img/email.svg"
import Phone from "../assets/img/phone.svg"
import Telegram from "../assets/img/telegram.svg"
// import Instagram from "../assets/img/instagram.svg"
import WhatsApp from "../assets/img/watsapp.svg"

export default function Home() {
    return (
        <div className="home">
            <Header />

            <section class="hero">
                <div class="container">
                <div class="hero__wrapper">
                    <div class="hero__content">
                    <h1 class="hero__title">ОТКРОЙТЕ МИР ВЕЛОСПОРТА</h1>
                    <p class="hero__description">
                        Велоспорт — это не просто хобби, это стиль жизни. Здесь вы найдете всё необходимое для того, чтобы начать или продолжить свои приключения на велосипеде.
                    </p>
                    <Link to="/catalog"><button class="hero__button">Перейти в каталог</button> </Link>
                    </div>
                    <div class="hero__image">
                    <img src={Hero} alt="Человек едет на велосипеде" class="hero__image-main"/>
                    </div>
                </div>
                </div>
            </section>

            <section class="variables">
                <div class="container">
                <h2 class="variables__title">Большой выбор велосипедов</h2>
                <div class="variables__cards">
                    <div class="variables__card">
                    <img src={KidsBikes} alt="Детский велосипед" class="variables__image"/>
                    <div class="variables__content">
                        <h3 class="variables__card-title">Детские</h3>
                        <button class="variables__button">Смотреть</button>
                    </div>
                    </div>
                    <div class="variables__card">
                    <img src={AdultsBikes} alt="Взрослый велосипед" class="variables__image"/>
                    <div class="variables__content">
                        <h3 class="variables__card-title">Взрослые</h3>
                        <button class="variables__button">Смотреть</button>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <section class="stages">
                <div class="container">
                <h2 class="stages__title">Подготовка велосипеда</h2>
                <div class="stages__card">
                    <div class="stages__header">
                    <h3 class="stages__card-title">Этап 1</h3>
                    <p class="stage__card-subtitle">Осмотр на наличие повреждений</p>
                    </div>
                    <div class="stages__content">
                    <div class="stages__text">
                        <p class="stages__description">
                        Даже если велосипед новый и прибыл в коробке, осмотр перед сборкой обязателен. Проверьте раму на наличие царапин, сколов краски или мелких деформаций, которые могли возникнуть при транспортировке.
                        </p>
                        <a href="#" class="stages__button">Подробнее</a>
                    </div>
                    <img src={StepOne} alt="Этап 1: Осмотр на наличие повреждений" class="stages__image"/>
                    </div>
                </div>
            
                <div class="stages__card">
                    <div class="stages__header">
                    <h3 class="stages__card-title">Этап 2</h3>
                    <p class="stage__card-subtitle">Сборка</p>
                    </div>
                    <div class="stages__content stages__content-reverse">
                    <div class="stages__text stages__text-reverse">
                        <p class="stages__description stages__description-reverse">
                        На этом этапе сборки велосипеда выполняется последовательная установка и настройка всех его компонентов. Процесс начинается с распаковки и проверки комплектации: рама, колеса, руль, сиденье, педали и другие детали.
                        </p>
                        <a href="#" class="stages__button">Подробнее</a>
                    </div>
                    <img src={StepTwo} alt="Этап 2: Сборка" class="stages__image"/>
                    </div>
                </div>
            
                <div class="stages__card">
                    <div class="stages__header">
                    <h3 class="stages__card-title">Этап 3</h3>
                    <p class="stage__card-subtitle">Настройка</p>
                    </div>
                    <div class="stages__content">
                    <div class="stages__text">
                        <p class="stages__description">
                        На этом этапе сборки велосипеда выполняется последовательная установка и настройка всех его компонентов. Процесс начинается с распаковки и проверки комплектации: рама, колеса, руль, сиденье, педали и другие детали.
                        </p>
                        <a href="#" class="stages__button">Подробнее</a>
                    </div>
                    <img src={StepThree} alt="Этап 3: Настройка" class="stages__image"/>
                    </div>
                </div>
                </div>
            </section>

            <section class="contacts" id="contacts">
                <div class="container">
                <h2 class="contacts__title">Контакты</h2>
                <div class="contacts__info">

                    <div class="contacts__icon-container">
                        <a href="#" class="contacts__icon contacts__icon--telegram"><img src={Telegram} alt="Telegram"/></a>
                        <a href="#" class="contacts__icon contacts__icon--instagram"><img src={Telegram} alt="Instagram"/></a>
                        <a href="#" class="contacts__icon contacts__icon--whatsapp"><img src={WhatsApp} alt="WhatsApp"/></a>
                    </div>
            
                    <div class="contacts__email">
                    <img src={Email} alt="Email" class="contacts__icon contacts__icon--email"/>
                    <span class="contacts__text">milanzakh@gmail.com</span>
                    </div>
            
                    <div class="contacts__phone">
                    <img src={Phone} alt="Phone" class="contacts__icon contacts__icon--phone"/>
                    <span class="contacts__text">+7 905 519 4397</span>
                    </div>
                </div>
            
                <div class="contacts__schedule">
                    <h3 class="contacts__subtitle">График работы менеджера</h3>
                    <p class="contacts__schedule-text">
                    Понедельник - Пятница: 10:00 — 20:00<br/>
                    Суббота: 10:00 — 18:00<br/>
                    Воскресенье: выходной
                    </p>
                </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}