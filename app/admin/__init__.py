from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

from .. import db
from ..models import Envelope, Budget



def create_admin(app):
    admin = Admin(app)

    admin.add_view(ModelView(Envelope, db.session))
    admin.add_view(ModelView(Budget, db.session))

    return admin
