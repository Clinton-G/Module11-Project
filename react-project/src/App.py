from flask import Flask, jsonify, request
app = Flask(__name__)

customers = [{"id": 1, "name": "John Doe", "email": "john@example.com", "phone": "1234567890"}]
products = [{"id": 1, "name": "Product 1", "price": 29.99}]

@app.route('/api/customers', methods=['GET'])
def get_customers():
    return jsonify(customers)

@app.route('/api/customers', methods=['POST'])
def create_customer():
    customer = request.get_json()
    customers.append(customer)
    return jsonify(customer), 201

@app.route('/api/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    customer = next((c for c in customers if c['id'] == id), None)
    if customer:
        customers.remove(customer)
        return jsonify({"message": "Customer Deleted"}), 200
    return jsonify({"message": "Customer Not Found"}), 404

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(products)

@app.route('/api/products', methods=['POST'])
def create_product():
    product = request.get_json()
    products.append(product)
    return jsonify(product), 201

@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = next((p for p in products if p['id'] == id), None)
    if product:
        products.remove(product)
        return jsonify({"message": "Product Delleted"}), 200
    return jsonify({"message": "Product Not Found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
