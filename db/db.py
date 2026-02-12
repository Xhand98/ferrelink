# import models as 
from .models import database, Roles, Users, Providers, Products, Providers_Products
class DBM():
    
    def create_table(self):
        try:
            
            database.connect()
            database.create_tables([Roles, Users, Providers, Products, Providers_Products])
            return {
                "status": 200,
                "message": "Tablas creadas correctamente!"
            }
        except Exception as e:
            return {
                "status": 409,
                "message": "Tables were already made!",
                "error": str(e)
            }
        finally:
            database.close()