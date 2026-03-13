from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import bcrypt

app = Flask(__name__)
CORS(app)

# ================== DATABASE CONNECTION ==================
MONGO_URI = "mongodb+srv://shopeasyuser:StrongPassword123@cluster0.ku6a5az.mongodb.net/"

try:
    client = MongoClient(MONGO_URI)
    db = client["shopeasy"]
    print("✅ MongoDB Atlas connected successfully")
except Exception as e:
    print("❌ MongoDB connection error:", e)

users_collection = db["users"]
products_collection = db["products"]
cart_collection = db["cart"]

# ================== USER SIGNUP ==================
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "All fields are required!"}), 400

    # Check if user already exists
    if users_collection.find_one({"email": email}):
        return jsonify({"error": "User already exists!"}), 400

    # Hash password
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    # Insert user
    users_collection.insert_one({
        "username": username,
        "email": email,
        "password": hashed_pw
    })

    return jsonify({"message": "User registered successfully!"}), 201


# ================== USER LOGIN ==================
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required!"}), 400

    user = users_collection.find_one({"email": email})

    if not user:
        return jsonify({"error": "User not found!"}), 404

    if bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({
            "message": "Login successful!",
            "username": user["username"],
            "email": user["email"]
        }), 200
    else:
        return jsonify({"error": "Invalid password!"}), 401


# ================== PRODUCTS API ==================
@app.route("/api/products", methods=["GET"])
def get_products():
    products = list(products_collection.find({}, {"_id": 0}))
    return jsonify(products), 200


# ================== CART API ==================

# Add to Cart
@app.route("/api/cart", methods=["POST"])
def add_to_cart():
    data = request.json
    email = data.get("email")
    product = data.get("product")

    if not email or not product:
        return jsonify({"error": "Missing user or product info"}), 400

    result = cart_collection.insert_one({
        "email": email,
        "product": product
    })

    return jsonify({
        "message": "Product added to cart!",
        "cart_id": str(result.inserted_id)
    }), 201


# Get User Cart
@app.route("/api/cart/<email>", methods=["GET"])
def get_cart(email):
    cursor = cart_collection.find({"email": email})
    items = []

    for doc in cursor:
        items.append({
            "_id": str(doc["_id"]),
            "email": doc.get("email"),
            "product": doc.get("product")
        })

    return jsonify(items), 200


# Remove item from Cart
@app.route("/api/cart/item/<item_id>", methods=["DELETE"])
def delete_cart_item(item_id):
    try:
        res = cart_collection.delete_one({"_id": ObjectId(item_id)})

        if res.deleted_count == 1:
            return jsonify({"message": "Item removed from cart"}), 200
        else:
            return jsonify({"error": "Item not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# ================== START SERVER ==================
if __name__ == "__main__":
    app.run(debug=True)





