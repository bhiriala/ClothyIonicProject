from flask import Flask, request, jsonify, redirect
from flask_cors import CORS, cross_origin
import cv2
import base64
import numpy as np
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from bson.json_util import dumps
from datetime import timedelta
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)
client = MongoClient("localhost", 27017)
db = client.reclothy
users = db.users
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


if __name__ == "__main__":
    app.run(debug=True)
