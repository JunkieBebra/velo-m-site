from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver
from .models import Product

@receiver(post_delete, sender=Product)
def delete_image_on_product_delete(sender, instance, **kwargs):
    if instance.image:
        instance.image.delete(False)


@receiver(pre_save, sender=Product)
def delete_old_image_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return
    try:
        old_instance = Product.objects.get(pk=instance.pk)
    except Product.DoesNotExist:
        return
    
    if old_instance.image and old_instance.image != instance.image:
        old_instance.image.delete(False)