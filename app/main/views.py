from flask import render_template, redirect, url_for
from .. import db
from . import main
from ..models import Budget

@main.route('/', methods=['GET'])
def home():
    budgets = Budget.query.all()

    return render_template('home.html', budgets=budgets)

@main.route('/budget/new', methods=['GET'])
def budget_new():
    return render_template('budget_new.html')

@main.route('/budget/<int:id>/view')
def budget(id):
    budget = Budget.query.get_or_404(id)

    return render_template('budget.html', budget=budget)
