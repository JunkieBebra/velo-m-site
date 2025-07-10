from django.db import models
from django.contrib.auth.models import User
import uuid


class Brand(models.Model):
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        verbose_name="Идентификатор")
    
    brand_name = models.CharField(
        max_length=32,
        verbose_name="Название",
        unique=True)
    
    brand_brief_description = models.CharField(
        max_length=256,
        blank=True,
        verbose_name="Краткое описание")
    
    brand_full_description = models.TextField()

    class Meta:
        verbose_name = "Бренд"
        verbose_name_plural = "Бренды"

    def __str__(self):
        return f'{self.brand_name}'
    

class Product(models.Model):
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        verbose_name="Идентификатор")
    
    price = models.DecimalField(
        decimal_places=2,
        max_digits=8,
        verbose_name="Стоимость")
    
    image = models.ImageField(
        upload_to='product_images/',
        null=True,
        blank=True,
        verbose_name="Изображение товара")

    number_in_stock = models.IntegerField(
        default=0,
        verbose_name="Количество на складе")

class Bicycle(Product):
    
    model_name = models.CharField(
        max_length=64,
        verbose_name="Модель")
    
    brand = models.ForeignKey(
        Brand,
        on_delete=models.PROTECT,
        verbose_name="Бренд")
    
    brief_description = models.CharField(
        max_length=256,
        verbose_name="Краткое описание")
    
    BICYCLE_TYPES = [
        ('L', 'Детский'),
        ('I', 'Взрослый')
    ]

    type = models.CharField(
        max_length=1,
        choices=BICYCLE_TYPES,
        verbose_name="Тип велосипеда")
    
    wheel_size = models.IntegerField(verbose_name="Диаметр колеса (inch.)")
    frame_size = models.IntegerField(verbose_name="Размер рамы (inch.)")
    characteristics_detailed = models.JSONField(verbose_name="Дополнительные характеристики", 
                                                blank=True,
                                                null=True)

    def __str__(self):
        return f'{self.model_name} ({self.brand})'
    
    class Meta():
        verbose_name = "Велосипед"
        verbose_name_plural = "Велосипеды"
        abstract = False
    

class Cart(models.Model):
    id = models.BigAutoField(primary_key=True, auto_created=True)
    user = models.OneToOneField(
        User, 
        verbose_name="Пользователь", 
        on_delete=models.CASCADE)
    
    def get_total_price(self):
        total_price = 0
        instances = ProductInstance.objects.filter(cart=self)
        for instance in instances:
            total_price += (instance.product.price * instance.instance_coef)
        return total_price
    
    class Meta():
        verbose_name = "Корзина"
        verbose_name_plural = "Корзины"
    
    def __str__(self):
        return f'Корзина {self.id} пользователя {self.user.username}'
    



class ProductInstance(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product= models.ForeignKey(Product, on_delete=models.CASCADE)
    instance_coef = models.IntegerField(default=1)

    def increment_instance(self):
        self.instance_coef += 1

    class Meta():
        verbose_name = "Экземпляр продукта"
        verbose_name_plural = "Экземпляры продуктов"


class ArchivedCart(models.Model):
    id = models.BigAutoField(primary_key=True, auto_created=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    detailes = models.JSONField()
    
    class Meta():
        verbose_name = "Архивированная корзина"
        verbose_name_plural = "Архивированные корзины"



# {
#   "brand": "DAKLN",
#   "description": "DAKLN — это современный велосипед, созданный для тех, кто ценит качество, стиль и универсальность. Независимо от того, используете ли вы его для ежедневных поездок по городу или для активного отдыха на природе, DAKLN станет вашим надежным спутником. Прочная алюминиевая рама с антикоррозийным покрытием обеспечивает долговечность, многоскоростная трансмиссия легко адаптируется к любым условиям, а дисковые тормоза гарантируют безопасность. Удобная геометрия и эргономичное седло делают поездки комфортными. Благодаря универсальной конструкции подходит как для города, так и для легкого бездорожья.",
#   "characteristics": {
#     "model_name": "DKALN",
#     "bicycle_type": "Городской / Гибридный (универсальный)",
#     "frame_size": "18\"",
#     "recommended_height": "160–175 см",
#     "frame_material": "Алюминиевый сплав (легкий и прочный), антикоррозийное покрытие",
#     "wheel_size": "26\"",
#     "tires": "Протектор средней агрессивности, подходящий для городских дорог и легкого бездорожья",
#     "rims": "Двойные алюминиевые, устойчивые к деформации",
#     "speed_count": "21",
#     "shifters": "Shimano Tourney или аналогичные",
#     "shifter_type": "Монетки (grip shift) или триггеры",
#     "brake_type": "Дисковые механические",
#     "rotor_size": "160 мм",
#     "fork_type": "Пружинно-эластомерная",
#     "fork_travel": "80 мм",
#     "rear_frame": "Жесткая для повышения эффективности педалирования",
#     "handlebar_type": "Прямой",
#     "grips": "Антискользящие, с мягкой подкладкой",
#     "saddle": "Эргономичное седло с анатомической формой. Регулировка: высота и угол наклона.",
#     "pedals": "Платформенные с противоскользящей поверхностью",
#     "color": "красный",
#     "additional_features": "Съемные крылья, центральная подножка, отражатели на спицы и задний фонарь",
#     "weight": "~13.5 кг",
#     "frame_warranty": "5 лет",
#     "components_warranty": "1 год",
#     "package": "Частично собранный. Необходима установка: педали, руль, седло. Инструкция включена.",
#     "target_audience": "Для начинающих и опытных велосипедистов. Подходит для ежедневных поездок, прогулок и легкого бездорожья."
#   },
#   "url": "https://example.com/bicycle-dakln-26-red ",
#   "availability": true,
#   "isFavorite": true
# }