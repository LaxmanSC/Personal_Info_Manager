import functools
import os
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity

from flask import (
    Blueprint,jsonify, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from PIM.db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        obj = request.json
        username = obj.get('username')
        password = obj.get('password')
        db = get_db()
        error = None
        success = None
        if not username:
            error = 'Username is required.'
            return jsonify({'error': error}), 400
        elif not password:
            error = 'Password is required.'
            return jsonify({'error': error}), 400
        elif db.execute(
            'SELECT id FROM Users WHERE Username = ?', (username,)
        ).fetchone() is not None:
            error = f"Username:'{username}' is already registered."
            return jsonify({'error': error}), 400

        if error is None:
            db.execute(
                'INSERT INTO Users (Username, PassKey) VALUES (?, ?)',
                (username, generate_password_hash(password))
            )
            db.commit()
            return redirect(url_for('auth.login'))

@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        obj = request.json
        username = obj.get('username')
        password = obj.get('password')
        db = get_db()
        error= None;
        user = db.execute(
            'SELECT * FROM Users WHERE Username = ?', (username,)
        ).fetchone()

        if user is None:
            error = 'Error:Username does not exist.'
            return jsonify(error=error), 401
        elif not check_password_hash(user['PassKey'], password):
            error = 'Error: Incorrect password.'
            return jsonify(error=error), 401

        if error is None:
            access_token = create_access_token(identity=username)
            return jsonify(access_token=access_token), 200

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM Users WHERE id = ?', (user_id,)
        ).fetchone()

@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view

# username = get_jwt_identity()