# Generated by Django 4.1.13 on 2024-05-13 01:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0016_product_views'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='isDeleted',
            field=models.BooleanField(default=False),
        ),
    ]
