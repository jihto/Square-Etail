# Generated by Django 4.1.13 on 2024-05-03 02:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0011_orderdetails_seller'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orderdetails',
            old_name='seller',
            new_name='seller_name',
        ),
    ]
