from flask import Blueprint, jsonify
from models.results_loader import load_prices, load_change_points, load_events

api_blueprint = Blueprint("api", __name__)

@api_blueprint.route("/prices", methods=["GET"])
def get_prices():
    try:
        data = load_prices()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_blueprint.route("/change-points", methods=["GET"])
def get_change_points():
    try:
        data = load_change_points()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_blueprint.route("/events", methods=["GET"])
def get_events():
    try:
        data = load_events()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500