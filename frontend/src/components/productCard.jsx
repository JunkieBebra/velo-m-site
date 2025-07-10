import { unstable_RouterContextProvider, useNavigate } from 'react-router-dom';
import DummyBikePhoto from "../assets/img/bike-dummy.png";

export default function ProductCard({ bike }) {

    const navigate = useNavigate();
    const handleBuyClick = (uuid) => {
        navigate(`/product/${uuid}`);
    };

    if (!bike) return null;

    return (
        <div className="catalog__card">
            <img
                src={bike.image || require("../assets/img/bike-dummy.png")}
                alt={bike.brand + " " + bike.model_name}
                className="catalog__image"
            />
            <div className="catalog__info">
                <h3 className="catalog__name">{bike.brand}</h3>
                <p className="catalog__model">{bike.model_name}</p>
                <div className="catalog__price-block">
                    <div className="prise-ability-wrapper">
                        <p className="catalog__price">{bike.price} ₽</p>
                        <span className="catalog__availability">
                            {bike.number_in_stock > 0 ? "в наличии" : "нет в наличии"}
                        </span>
                    </div>
                    <button
                        className="catalog__button"
                        onClick={() => handleBuyClick(bike.uuid)}
                        disabled={bike.number_in_stock === 0}
                    >
                        {bike.number_in_stock > 0 ? "Купить" : "Узнать"}
                    </button>
                </div>
            </div>
        </div>
    );
}
