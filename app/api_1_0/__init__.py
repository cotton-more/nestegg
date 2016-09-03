from flask import Blueprint, json
from ..models import Envelope

api = Blueprint('api', __name__)


@api.route('/envelopes/', methods=['GET'])
def get_envelopes():
    envelopes = [e.to_json() for e in Envelope.query.all()]

    return json.jsonify({
        'envelopes': envelopes
    })
