from datetime import datetime
from peewee import *

DATABASE = "ferrelinkDB"
database = SqliteDatabase(DATABASE)

class BaseModel(Model):
    class Meta:
        database = database

class Roles(BaseModel):
    nombre = CharField(unique=True, max_length=20)
    descriction = CharField(max_length=60)
    
    class Meta:
        db_table = "roles"

class Users(BaseModel):
    rol_id = ForeignKeyField(Roles, backref="users")
    primer_nombre = CharField(max_length=50, null=False)
    segundo_nombre = CharField(max_length=50, null=True)
    primer_apellido = CharField(max_length=50, null=False)
    segundo_apellido = CharField(max_length=50, null=True)
    correo = CharField(max_length=60, unique=True)
    contrasena = CharField()
    
    class Meta:
        db_table = "users"

class Providers(BaseModel):
    nombre_compania = CharField()
    numero_contacto = CharField(max_length=15, unique=True)
    correo_contacto = CharField(max_length=60, unique=True)
    
    class Meta:
        db_table = "providers"

class Products(BaseModel):
    codigo = CharField(max_length=30, unique=True, primary_key=True)
    nombre = CharField()
    precio = DecimalField(max_digits=10, decimal_places=2)
    descripcion = TextField()
    stock = IntegerField()
    fecha_creacion = TimestampField(default=datetime.now)
    fecha_actualizacion = TimestampField(default=datetime.now)

    class Meta:
        db_table = "products"

class Providers_Products(BaseModel):
    provider_id = ForeignKeyField(Providers, backref="products")
    product_id = ForeignKeyField(Products, backref="providers")
    
    class Meta:
        db_table = "providers_products"
        indexes = (
            (('provider_id', 'product_id'), True),
        )
        
class Sales(BaseModel):
    usuario_id = ForeignKeyField(Users)
    fecha = TimestampField(default=datetime.now)
    total = DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'sales'


class SalesItems(BaseModel):
    venta_id = ForeignKeyField(Sales, backref="items")
    producto_codigo = ForeignKeyField(Products)
    cantidad = IntegerField(default=1)
    precio_unitario = DecimalField(max_digits=10, decimal_places=2)
    
    
    


class Queso(BaseModel):
    