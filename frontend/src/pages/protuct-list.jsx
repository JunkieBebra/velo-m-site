import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/header';
import ProductCard from '../components/productCard';


export default function ProductList() {
    const [bicycles, setBicycles] = useState([]);
    const [loadint, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost/api/bicycles/',{
            // headers: {
            //     'Authorization': 'token 167f821f821016edd7aa0ab4281d816f3dff3fec'
            // }
        })
            .then(response => response.json())
            .then( data => {
                setBicycles(data);
                console.log("Данные успешно загружены:", data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="product-list">
            <Header />

              <section class="catalog">
                <div class="container">

                <div class="catalog__filter">
                    <h2 class="catalog__title">Взрослые велосипеды</h2>
                    <div class="catalog__filter-options">
                    <span class="catalog__filter-label">Подберите велосипед:</span>
                    <select class="catalog__filter-select">
                        <option value="all">Все</option>
                        <option value="mountain">Горный</option>
                        <option value="city">Городской</option>
                        <option value="touring">Туристический</option>
                    </select>
                    </div>
                </div>

                <div class="catalog__grid">
                    {loadint ? (
                        <p>Загрузка...</p>
                    ) : (
                        bicycles.map(bike => (
                            <ProductCard key={bike.uuid} bike={bike} />
                        ))
                    )}
                    <ProductCard/>

                </div>
                </div>
            </section>
        </div>
    );
}