# Generated by Django 4.1.13 on 2024-05-09 03:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0015_product_size'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='views',
            field=models.JSONField(default=list),
        ),
    ]