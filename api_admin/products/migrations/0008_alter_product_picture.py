# Generated by Django 4.1.13 on 2024-04-16 07:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0007_alter_product_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='picture',
            field=models.ImageField(upload_to='./static/img/'),
        ),
    ]
