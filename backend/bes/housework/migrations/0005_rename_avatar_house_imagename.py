# Generated by Django 4.2.13 on 2024-06-23 12:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('housework', '0004_house_avatar'),
    ]

    operations = [
        migrations.RenameField(
            model_name='house',
            old_name='avatar',
            new_name='imageName',
        ),
    ]
