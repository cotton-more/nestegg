from . import db

class Envelope(db.Model):
    INCOME = 'income'
    EXPENCE = 'expence'

    __tablename__ = 'envelopes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    type = db.Column(db.Enum(INCOME, EXPENCE), nullable=False, default=EXPENCE)

    def __repr__(self):
        return 'Envelope({0})'.format(self.id)

    def to_json(self):
        envelope_json = {
            'id': self.id,
            'type': self.type,
            'name': self.name
        }

        return envelope_json

class Budget(db.Model):
    __tablename__ = 'budgets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    comment = db.Column(db.Text)

    envelopes = db.relationship('BudgetEnvelope', backref='budget')

    def __repr__(self):
        return 'Budget({0})'.format(self.id)

class BudgetEnvelope(db.Model):
    __tablename__ = 'budget_envelopes'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Numeric(scale=2), default=0)
    about = db.Column(db.String)
    comment = db.Column(db.String)

    budget_id = db.Column(db.Integer, db.ForeignKey('budgets.id'))
    envelope_id = db.Column(db.Integer, db.ForeignKey('envelopes.id'))

    envelope = db.relationship('Envelope')

    def __repr__(self):
        return 'BudgetEnvelope({0})'.format(self.id)