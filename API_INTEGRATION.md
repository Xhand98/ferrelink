# API Integration Guide for FerreLink

## Overview
This document describes how to migrate FerreLink from localStorage to your Python/Peewee backend API.

## Current Architecture

### Data Flow
```
Svelte Components → API Adapter → LocalStorage Service → Browser LocalStorage
```

### Future Architecture (with API)
```
Svelte Components → API Adapter → HTTP Requests → Python/Flask API → Peewee ORM → SQLite Database
```

## Migration Steps

### Step 1: Enable API Mode
In `src/services/api.adapter.js`, change:
```javascript
const USE_API = false;  // Change to true
const API_BASE_URL = 'http://localhost:5000/api';  // Update with your API URL
```

### Step 2: Implement Backend Endpoints

Your Python/Flask API should implement the following endpoints:

#### Authentication Endpoints
```
POST   /api/auth/login
  Body: { "correo": "email", "password": "password" }
  Response: { "user": {...}, "token": "jwt_token" }

POST   /api/auth/register
  Body: { "correo": "email", "password": "password", "primer_nombre": "...", ... }
  Response: { "user": {...} }

POST   /api/auth/logout
  Response: { "success": true }
```

#### CRUD Endpoints Pattern
For each resource (roles, users, products, providers, sales):

```
GET    /api/{resource}              # Get all
GET    /api/{resource}/{id}         # Get by ID
POST   /api/{resource}              # Create
PUT    /api/{resource}/{id}         # Update
DELETE /api/{resource}/{id}         # Delete
```

#### Specific Resource Endpoints

**Roles**
```
GET    /api/roles
POST   /api/roles
PUT    /api/roles/{id}
DELETE /api/roles/{id}
```

**Users**
```
GET    /api/users
GET    /api/users/{id}
POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}
```

**Products**
```
GET    /api/products
GET    /api/products/{codigo}       # Note: codigo is the primary key
POST   /api/products
PUT    /api/products/{codigo}
DELETE /api/products/{codigo}

Body schema:
{
  "codigo": "PRD-XXXXX",
  "nombre": "Product Name",
  "precio": 10.50,
  "descripcion": "Description",
  "stock": 100
}
```

**Providers**
```
GET    /api/providers
GET    /api/providers/{id}
POST   /api/providers
PUT    /api/providers/{id}
DELETE /api/providers/{id}

Body schema:
{
  "nombre_compania": "Company Name",
  "numero_contacto": "+503 1234-5678",
  "correo_contacto": "contact@company.com"
}
```

**Sales**
```
GET    /api/sales
GET    /api/sales/{id}
POST   /api/sales

Body schema for creation:
{
  "usuario_id": "user_id",
  "items": [
    {
      "product_codigo": "PRD-XXXXX",
      "cantidad": 2,
      "precio_unitario": 10.50,
      "subtotal": 21.00
    }
  ],
  "total": 21.00
}
```

**Sale Items**
```
GET    /api/sale_items?sale_id={id}
```

## Expected JSON Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* resource data */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": 400
}
```

### List Response (with pagination - optional)
```json
{
  "success": true,
  "data": [ /* array of resources */ ],
  "meta": {
    "total": 100,
    "page": 1,
    "per_page": 30
  }
}
```

## Database Schema Compatibility

The frontend is designed to work with your Peewee models:

### Roles Table
```python
class Roles(BaseModel):
    id = AutoField()
    nombre = CharField(unique=True, max_length=20)
    description = CharField(max_length=60)
```

### Users Table
```python
class Users(BaseModel):
    id = AutoField()
    rol_id = ForeignKeyField(Roles, backref="users")
    primer_nombre = CharField(max_length=50)
    segundo_nombre = CharField(max_length=50, null=True)
    primer_apellido = CharField(max_length=50)
    segundo_apellido = CharField(max_length=50, null=True)
    correo = CharField(max_length=60, unique=True)
    password = CharField()  # hashed
```

### Products Table
```python
class Products(BaseModel):
    codigo = CharField(max_length=30, unique=True, primary_key=True)
    nombre = CharField()
    precio = DecimalField(max_digits=10, decimal_places=2)
    descripcion = TextField()
    stock = IntegerField()
    fecha_creacion = TimestampField(default=datetime.now)
    fecha_actualizacion = TimestampField(default=datetime.now)
```

### Providers Table
```python
class Providers(BaseModel):
    id = AutoField()
    nombre_compania = CharField()
    numero_contacto = CharField(max_length=15, unique=True)
    correo_contacto = CharField(max_length=60, unique=True)
```

### Providers_Products Table (Many-to-Many)
```python
class Providers_Products(BaseModel):
    provider_id = ForeignKeyField(Providers)
    product_id = ForeignKeyField(Products)
```

### Sales Tables (New - not in original model)
```python
class Sales(BaseModel):
    id = AutoField()
    usuario_id = ForeignKeyField(Users)
    fecha = TimestampField(default=datetime.now)
    total = DecimalField(max_digits=10, decimal_places=2)

class SaleItems(BaseModel):
    id = AutoField()
    sale_id = ForeignKeyField(Sales, backref="items")
    product_codigo = ForeignKeyField(Products)
    cantidad = IntegerField()
    precio_unitario = DecimalField(max_digits=10, decimal_places=2)
    subtotal = DecimalField(max_digits=10, decimal_places=2)
```

## CORS Configuration

Your Flask API needs CORS enabled:

```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
```

## Authentication Flow

1. User logs in via `/api/auth/login`
2. Backend validates credentials and returns JWT token
3. Frontend stores token in localStorage (`ferrelink_auth`)
4. All subsequent API requests include: `Authorization: Bearer <token>`
5. Backend validates token on each request

## Error Handling

The API Adapter automatically handles:
- Network errors
- JSON parsing errors
- HTTP error codes

Backend should return consistent error messages:
```json
{
  "success": false,
  "error": "Usuario no encontrado",
  "code": 404
}
```

## Testing the Integration

1. Start your Python API server
2. Update `USE_API = true` in `api.adapter.js`
3. Clear browser localStorage
4. Register a new user
5. Login and test CRUD operations

## Rollback

If you need to rollback to localStorage:
1. Set `USE_API = false` in `api.adapter.js`
2. Refresh the application

## Notes

- The adapter pattern ensures minimal changes to Svelte components
- All business logic remains in the frontend
- Backend acts as data persistence layer
- Password hashing happens on backend during registration
- Stock updates are handled by the frontend (could be moved to backend)

## Example Flask Route

```python
@app.route('/api/products', methods=['GET'])
@jwt_required()
def get_products():
    try:
        products = Products.select()
        return jsonify({
            'success': True,
            'data': [model_to_dict(p) for p in products]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/products', methods=['POST'])
@jwt_required()
def create_product():
    try:
        data = request.get_json()
        product = Products.create(**data)
        return jsonify({
            'success': True,
            'data': model_to_dict(product)
        }), 201
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400
```

## Contact

If you encounter any issues during integration, check:
1. CORS configuration
2. JWT token format
3. Field names match between frontend and backend
4. Decimal/number serialization
