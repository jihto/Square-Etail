# Generated by Django 4.1.13 on 2024-04-18 09:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0005_alter_order_userid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='userId',
            field=models.CharField(max_length=21),
        ),
    ]
