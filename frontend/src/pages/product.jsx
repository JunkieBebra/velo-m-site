import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/header';

import DummyBikePhoto from "../assets/img/bike-dummy.png"


export default function Product() {
    const navigate = useNavigate();
    const { uuid } = useParams();
    const [bike, setBike] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost/api/bicycles/${uuid}/`, {
            headers:{
                'Authorization': 'token 167f821f821016edd7aa0ab4281d816f3dff3fec'
            }
        })
            .then(response => response.json())
            .then(data => {
                setBike(data);
                console.log("Данные велосипеда успешно загружены:", data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных велосипеда:', error);
                setLoading(false);
            });
    }, [uuid]);

    const handleCloseClick = () => {
        navigate(-1);
    };

    if (loading) {
        return <p>Загрузка...</p>;
    }
    if (!bike) {
        return <p>Велосипед не найден.</p>;
    }

    return (
        <div className="product">
            <Header />

            <section className="bike-details">
                <div className="container details-container">
                    <div className="bike-details__header">
                        <button 
                            className="bike-details__close"
                            onClick={handleCloseClick}>
                            Закрыть
                        </button>
                        <div className="bike-details__main">
                            <h1 className="bike-details__title">{bike.brand + " " + bike.model_name}</h1>
                            <p className="bike-details__price">{bike.price} ₽</p>
                        </div>
                    </div>
                    
                    <div className="bike-details__content">
                        <div className="bike-details__image">
                        <img src={bike.image || DummyBikePhoto} alt={bike.brand + " " + bike.model_name} className="bike-details__image-main"/>
                        </div>
                        
                        <div className="bike-details__description">
                            <div className="bike-info__wrapper">
                                <h2 className="bike-details__subtitle">Взрослый велосипед</h2>
                                <p className="bike-details__text">
                                    <strong>{bike.model_name}</strong> — {bike.brief_description}
                                </p>
                            </div>
                            <div className="delivery-info__wrapper">
                                <h3 className="bike_delivery__title"></h3>
                                <p className="bike-details__text">
                                    Доставка по Москве и Московской области:<br />
                                    • Свой курьер<br />
                                    • Яндекс.Доставка<br />
                                    • Достависта<br /><br />
                                    Доставка по России транспортными компаниями:<br />
                                    • ПЭК<br />
                                    • СДЭК<br />
                                    • Деловые Линии<br /><br />
                                    Если у вас есть вопросы или требуется помощь с выбором способа доставки, свяжитесь с нашими менеджерами!<br />
                                    +7 977 988 4971
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bike-details__options">
                        <div className="bike-details__option">
                        <label htmlFor="frame-size">Размер рамы:</label>
                        <select id="frame-size" className="bike-details__select">
                            <option value="">Выбрать...</option>
                            <option value="small">S (48 см)</option>
                            <option value="medium">M (52 см)</option>
                            <option value="large">L (56 см)</option>
                        </select>
                        </div>
                        <div className="bike-details__option">
                        <label htmlFor="frame-color">Цвет рамы:</label>
                        <select id="frame-color" className="bike-details__select">
                            <option value="">Выбрать...</option>
                            <option value="red">Красный</option>
                            <option value="blue">Синий</option>
                            <option value="black">Черный</option>
                        </select>
                        </div>
                    </div>
                    
                    {/* <button className="bike-details__buy-button">Купить</button> */}
                </div>
            </section>

        </div>
    );
}