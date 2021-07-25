from flask import (request, Blueprint, jsonify, g)

from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

from PIM.db import get_db

bp = Blueprint('main', __name__, url_prefix='/main')

@bp.route('/',methods=('GET', 'POST'))
@jwt_required()
def mainPage():
  num=0
  if request.method == 'GET':
    db = get_db()
    user = get_jwt_identity()
    if user is not None:
      data = db.execute(
        'SELECT COUNT(*) FROM UserNotes').fetchone()
      for row in data:
        num = row
    return jsonify({'num': num}), 200

