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


@app.route("/getAllUsers", methods=["GET"])
def getUsers():
    if users:
        return dumps(users), 200

    else:
        return jsonify({"msg": "probleme dans la recuperation des utilisateurs"}), 401

@app.route("/getAllArticles", methods=["GET"])
def getArticles():
    if articles:
        return dumps(articles), 200
    else:
        return jsonify({"msg": "probleme dans la recuperation des articles"}), 401


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


@app.route("/user_info_article", methods=["GET"])
@jwt_required()
def user_info_article():
    username = request.args.get("username")
    user_info_cursor = users.find({"username": username})
    user_info = list(user_info_cursor)
    if user_info:
        return dumps(user_info), 200
    else:
        return jsonify({"msg": "User not found"}), 404


@app.route("/get_articles", methods=["GET"])
@jwt_required()
def get_articles():
    user_password = get_jwt_identity()
    user = users.find_one({"password": user_password})
    articless = list(articles.find())

    if user:
        favorite_articles = user.get("favorite_articles", [])
        all_articles = [
            article for article in articless if article["_id"] 
        ]
        favorite_ids = [article["_id"] for article in favorite_articles]
        men = [
            article for article in all_articles if ((article["category"] == "man" ) ) 
        ]
        women = [
            article for article in all_articles if ((article["category"] == "woman") ) 
        ]
        articless = [
            article for article in articless if article["_id"] not in favorite_ids
        ]
       
        data_to_return = {"favorite_articles": favorite_articles, "articles": articless, "men": men, "women": women}
        return dumps(data_to_return), 200
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


@app.route("/addToFav", methods=["POST"])
@jwt_required()
def addToFav():
    id = request.json["id"]
    username = request.json["username"]
    price = request.json["price"]
    name = request.json["name"]
    image = request.json["image"]
    category = request.json["category"]

    user_password = get_jwt_identity()
    user = users.find_one({"password": user_password})

    if user:
        collection = user.get("favorite_articles", [])

        # Check if the article with the given ID already exists in the favorites
        if any(article["_id"] == id for article in collection):
            return jsonify({"error": "Article already exists in favorites"}), 400

        new_fav = {
            "_id": id,
            "username": username,
            "price": price,
            "name": name,
            "image": image,
            "category": category
        }
        collection.append(new_fav)
        users.update_one(
            {"password": user_password}, {"$set": {"favorite_articles": collection}}
        )
        return jsonify({"msg": "L'article a bien été ajouté au favoris"}), 200
    else:
        return jsonify({"error": "User not found"}), 404



@app.route("/removefromfavoris", methods=["DELETE"])
@jwt_required()
def removefromfavoris():
    try:
        name = request.json["name"]
        current_user_password = get_jwt_identity()
        user = users.find_one({"password": current_user_password})
        favorite_articels = user.get("favorite_articles", [])
        updated_favorite_articels = [
            article for article in favorite_articels if article.get("name") != name
        ]
        users.update_one(
            {"password": current_user_password},
            {"$set": {"favorite_articles": updated_favorite_articels}},
        )
        return jsonify({"msg": f"articel with name {name} removed from favorites"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/addArticle", methods=["POST"])
@jwt_required()
def addArticle():
    price = request.json["price"]
    name = request.json["name"]
    image = request.json["image"]
    category = request.json["category"]

    id = "".join(random.choices(string.ascii_letters + string.digits, k=20))

    user_password = get_jwt_identity()
    user = users.find_one({"password": user_password})
    username = user.get("username")

    if user:
        collection = user.get("my_articles", [])
        new_article = {
            "_id": id,
            "username": username,
            "price": price,
            "name": name,
            "image": image,
            "category": category
        }
        collection.append(new_article)
        users.update_one(
            {"password": user_password}, {"$set": {"my_articles": collection}}
        )

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
    user = users.find_one({"password": user_password})

    if user:
        collection = user.get("cart", [])
        new_article = {"_id": id, "price": price, "name": name, "image": image}
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
    image = request.json.get("image")
    id = request.json.get("id")

    user_password = get_jwt_identity()
    user = users.find_one({"password": user_password})
    
    #get favorites and articles of this user
    if user:
        my_articles = user.get("my_articles", [])
        favs = user.get("favorite_articles", [])
        cart = user.get("cart", [])


        for article in my_articles:
            if "_id" in article and article["_id"] == id:
                print("modif articl")
                article["price"] = price
                article["name"] = name
                article["image"] = image
                
        for a in favs:
            if "_id" in a and a["_id"] == id:
                print("modif fav")
                a["price"] = price
                a["name"] = name
                a["image"] = image
                break
        for a in cart:
            if "_id" in a and a["_id"] == id:
                print("modif fav")
                a["price"] = price
                a["name"] = name
                a["image"] = image
                break
                
        articles.update_one(
            {"_id": id}, {"$set": {"name": name, "price": price, "image": image}}
        )
        users.update_one(
            {"password": user_password}, {"$set": {"my_articles": my_articles}}
        )
        #update liste des fav 
        users.update_one(
            {"password": user_password}, {"$set": {"favorite_articles": favs}}
        )
        users.update_one(
            {"password": user_password}, {"$set": {"cart": cart}}
        )
        return jsonify({"msg": "L'article a bien été modifé"}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route("/removeArticle", methods=["PUT"])
@jwt_required()
def removeArticle():
    user_password = get_jwt_identity()
    user = users.find_one({"password": user_password})
    if not user:
        return jsonify({"error": "User not found"}), 404

    favs = user.get("favorite_articles", [])
    article_id = request.json.get("id")

    result = articles.delete_one({"_id": article_id})
    if result.deleted_count == 0:
        return jsonify({"error": "No article found with the specified ID."}), 404

    favs = [fav for fav in favs if fav["_id"] != article_id]
    users.update_one({"password": user_password}, {"$set": {"favorite_articles": favs}})

    my_articles = [item for item in user.get("my_articles", []) if item["_id"] != article_id]
    users.update_one({"password": user_password}, {"$set": {"my_articles": my_articles}})

    return jsonify({"msg": "Article has been deleted successfully."}), 200
    
    

@app.route("/editProfile", methods=["PUT"])
@jwt_required()
def editProfile():
    user_password = get_jwt_identity()
    user = users.find_one({"password": user_password})

    username = request.json.get("username")
    phone = request.json.get("phone")
    email = request.json.get("email")
    image = request.json.get("image")

    if user:
        update_data = {
            "username": username,
            "phone": phone,
            "email": email,
            "image": image,
        }
        users.update_one({"password": user_password}, {"$set": update_data})

        return jsonify({"msg": "Le profil a bien été modifé"}), 200
    else:
        return jsonify({"error": "User not found"}), 404


@app.route("/remove_from_cart", methods=["PUT"])
@jwt_required()
def removeFromCart():
    user_password = get_jwt_identity()
    user = users.find_one({"password": user_password})

    id = request.json.get("id")

    if user:
        user["cart"] = [item for item in user["cart"] if item["_id"] != id]

        users.update_one({"password": user_password}, {"$set": {"cart": user["cart"]}})

        return jsonify({"msg": "L'article a bien été supprimé"}), 200
    else:
        return jsonify({"error": "User not found"}), 404


if __name__ == "__main__":
    # app.run(debug=True)
    app.run(host="localhost")
