from .models import *

database.connect()

rol_admin = Roles(
    nombre="Administrador", 
    descripcion="Tiene todos los accesos del sistema y maneja otros usuarios"
).save()

rol_empleado = Roles(
    nombre="Empleado",
    descripcion="Solo tiene acceso a relacionados con ventas."
).save()

user_admin = Users(
    rol_id=1,
    primer_nombre="Admendio",
    primer_apellido="Minestrio",
    correo="admin@mail.com",
    contrasena="12345678"
)

user_empleado = Users(
    rol_id=2,
    primer_nombre="Empledio",
    primer_apellido="Trajundio",
    correo="empleado@mail.com",
    contrasena="12345678"
)

provider = Providers(
    nombre_compania="Ferrari",
    numero_contacto="+1 809 999 8888",
    correo_contacto="provencio@mail.com"
)

producto_brum = Products(
    codigo="FRRI-001",
    nombre="Ferrari Brum!",
    precio=103.3,
    descripcion="Es un vehiculo muy veloz!!",
    stock=1,    
)



database.close()