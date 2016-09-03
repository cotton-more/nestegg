from app.models import Envelope
from flask_wtf import Form
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import Required

class EnvelopeForm(Form):
    name = StringField('Envelope name', validators=[Required()])
    type = SelectField('Envelope type', choices=[
        (Envelope.INCOME, Envelope.INCOME),
        (Envelope.EXPENCE, Envelope.EXPENCE),
    ])
    submit = SubmitField('Ok')
