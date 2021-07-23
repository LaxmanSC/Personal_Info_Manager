import os

from flask_cors import CORS

from flask import Flask, render_template


from flask_jwt_extended import JWTManager

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__,instance_relative_config=True)
    CORS(app)

    app.config["JWT_SECRET_KEY"] = "Hello123"  # Change this!
    jwt = JWTManager(app)

    app.config.from_mapping(
        SECRET_KEY = 'dev',
        DATABASE=os.path.join(app.instance_path, 'UserDeets.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    from . import db
    db.init_app(app)

    from . import auth
    app.register_blueprint(auth.bp)

    return app
