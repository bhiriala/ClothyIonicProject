import random
import string
from flask import Flask, request, jsonify, redirect
from flask_cors import CORS, cross_origin
import base64
import numpy as np
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import re
from bson.json_util import dumps
from datetime import timedelta
from pymongo import MongoClient
import random
import string

app = Flask(__name__)
CORS(app)
client = MongoClient("localhost", 27017)
db = client.reclothy
users = db.users
articles = db.articles
app.config["JWT_SECRET_KEY"] = "skjdfbnbsrkjgb14541616"
jwt = JWTManager(app)


@app.route("/login", methods=["POST"])
def login():
    expires_in = timedelta(days=1)
    email = request.json["email"]
    password = request.json["password"]
    user = users.find({"$and": [{"email": email}, {"password": password}]})
    user_info = list(user)
    if user_info:
        access_token = create_access_token(identity=password, expires_delta=expires_in)
        return jsonify(access_token=access_token), 200

    else:
        return jsonify({"msg": "ce compte n'existe pas"}), 401


@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    username = request.json["username"]
    phone = request.json["phone"]
    password = request.json["password"]
    image = request.json["image"]
    favorite_articles = []
    my_articles = []
    cart = []

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"msg": "Format d'email invalide"}), 401

    existing_username = users.find_one({"username": username})
    if existing_username is not None:
        return (
            jsonify({"msg": "existing_username déjà utilisé par un autre utilisateur"}),
            405,
        )

    existing_email = users.find_one({"email": email})
    if existing_email is not None:
        return jsonify({"msg": "Email déjà utilisé par un autre utilisateur"}), 402
    if not phone.isdigit():
        return (
            jsonify(
                {"msg": "Le numéro de téléphone doit contenir uniquement des chiffres"}
            ),
            403,
        )
    existing_password = users.find_one({"password": password})
    if existing_password is not None:
        return (
            jsonify({"msg": "Mot de passe déjà utilisé par un autre utilisateur"}),
            404,
        )
    users.insert_one(
        {
            "username": username,
            "phone": phone,
            "email": email,
            "password": password,
            "image": image,
            "favorite_articles": favorite_articles,
            "my_articles": my_articles,
            "cart": cart,
        }
    )
    return jsonify({"msg": "Profil mis à jour avec succès"}), 200


@app.route("/user_info", methods=["GET"])
@jwt_required()
def user_info():
    current_user_password = get_jwt_identity()
    user_info_cursor = users.find({"password": current_user_password})
    user_info = list(user_info_cursor)
    if user_info:
        return dumps(user_info), 200
    else:
        return jsonify({"msg": "User not found"}), 404


@app.route("/get_articles", methods=["GET"])
@jwt_required()
def get_articles():
    articless = articles.find()
    # user_info = list(articles_cursor)
    if articless:
        return dumps(articless), 200
    else:
        return jsonify({"msg": "User not found"}), 404


@app.route("/get_fav", methods=["GET"])
@jwt_required()
def get_fav():
    current_user_password = get_jwt_identity()
    user = users.find_one({"password": current_user_password})
    if user:
        favs = user.get("favorite_articles", [])
        return dumps(favs), 200
    else:
        return jsonify({"error": "User not found"}), 404
    
@app.route("/get_cart", methods=["GET"])
@jwt_required()
def get_cart():
    current_user_password = get_jwt_identity()
    user = users.find_one({"password": current_user_password})
    if user:
        cart = user.get("cart", [])
        return dumps(cart), 200
    else:
        return jsonify({"error": "User not found"}), 404


@app.route("/addArticle", methods=["POST"])
@jwt_required()
def addArticle():
    price = request.json["price"]
    name = request.json["name"]
    image = request.json["image"]
    
    id = ''.join(random.choices(string.ascii_letters + string.digits, k=20))
    
    user_password = get_jwt_identity()
    user = users.find_one({ "password" : user_password })
    
    if user:
        collection = user.get('my_articles', [])
        new_article = {"_id": id , "price": price, "name": name, "image": image}
        collection.append(new_article)
        users.update_one({"password": user_password}, {"$set": {"my_articles": collection}})    
        
        articles.insert_one(new_article)

        return jsonify({"msg": "L'article a bien été ajouté"}), 200
    else:
        return jsonify({"error": "User not found"}), 404
    
    
@app.route("/addToCart", methods=["POST"])
@jwt_required()
def addToCart():
    id = request.json["id"]
    price = request.json["price"]
    name = request.json["name"]
    image = request.json["image"]

    user_password = get_jwt_identity()
    user = users.find_one({ "password" : user_password })
    
    if user:
        collection = user.get("cart", [])
        new_article = {"_id": id , "price": price, "name": name, "image": image}
        collection.append(new_article)
        users.update_one({"password": user_password}, {"$set": {"cart": collection}})    
        
        return jsonify({"msg": "L'article a bien été ajouté au panier"}), 200
    else:
        return jsonify({"error": "error in adding to cart"}), 404
    
    
@app.route("/editArticle", methods=["PUT"])
@jwt_required()
def editArticle():
    price = request.json.get("price")
    name = request.json.get("name")
    id = request.json.get("id")
    
    user_password = get_jwt_identity()
    user = users.find_one({ "password" : user_password })
    
    if user:
        my_articles = user.get('my_articles', [])
        
        for article in my_articles:
            if "_id" in article and article["_id"] == id: 
                article["price"] = price
                article["name"] = name
                break
        else:
            return jsonify({"error": "Article not found"}), 404
            
        users.update_one({"password": user_password}, {"$set": {"my_articles": my_articles}})
        articles.update_one({"_id": id}, {"$set": {"name": name, "price": price}})
        
        
        return jsonify({"msg": "L'article a bien été modifé"}), 200
    else:
        return jsonify({"error": "User not found"}), 404


@app.route("/editProfile", methods=["PUT"])
@jwt_required()
def editProfile():
    user_password = get_jwt_identity()
    user = users.find_one({ "password" : user_password })

    username = request.json.get("username")
    phone = request.json.get("phone")
    email = request.json.get("email")
    image = request.json.get("image")
    
    if user:
        update_data = {"username": username, "phone": phone, "email": email, "image": image}
        users.update_one({"password": user_password}, {"$set": update_data})

        return jsonify({"msg": "Le profil a bien été modifé"}), 200
    else:
        return jsonify({"error": "User not found"}), 404


@app.route("/remove_from_cart", methods=["PUT"])
@jwt_required()
def removeFromCart():
    user_password = get_jwt_identity()
    user = users.find_one({ "password" : user_password })

    id = request.json.get("id")

    if user:
        user["cart"] = [item for item in user["cart"] if item["_id"] != id]

        users.update_one({"password": user_password}, {"$set": {"cart": user["cart"]}})

        return jsonify({"msg": "L'article a bien été supprimé"}), 200
    else:
        return jsonify({"error": "User not found"}), 404

    
        

if __name__ == "__main__":
    app.run(debug=True)
