# Generated by Django 4.1.13 on 2024-04-22 13:54

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0010_alter_comment_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='picture',
            field=models.ImageField(upload_to='./static/img/'),
        ),
    ]
