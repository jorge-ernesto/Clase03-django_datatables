from django.db import models

# Create your models here.

class Programmer(models.Model):  # Modelo creado para ejecutar migraciones
    # Definir los datos de la clase (campos de la tabla)
    # Si no se especifica lo contrario, todos los campos seran requeridos por defecto, es decir NOT NULL
    name = models.CharField(max_length=50)
    country = models.CharField(max_length=3)
    birthday = models.DateField()
    score = models.PositiveSmallIntegerField()

    class Meta:
        db_table = 'programmer'
