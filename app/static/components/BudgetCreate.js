import React, { Component } from 'react';
import { v4 } from 'node-uuid';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import BudgetAddEnvelope from './BudgetAddEnvelope.js';
import BudgetEnvelopeLine from './BudgetEnvelopeLine.js';
import BudgetTotal from './BudgetTotal.js';
import BudgetSave from './BudgetSave.js';

class BudgetCreate extends Component {
    constructor() {
        super();
        this.state = {
            envelopes: []
        }

        this.changeEnvelopeAmount = this.changeEnvelopeAmount.bind(this);
        this.changeEnvelopeComment = this.changeEnvelopeComment.bind(this);

        this.addEnvelopes = this.addEnvelopes.bind(this);
    }
    componentDidMount() {


        this.addEnvelopes({
            name: "test",
            type: "income",
            amount: 1000
        });
        $.getJSON(
            "/api/v1.0/envelopes/",
            (resp) => {
                this.addEnvelopes(...resp.envelopes);
            }
        )
    }

    addEnvelopes(...data) {
        let envelopes = data.map((item) => ({
            guid: v4(),
            amount: 0,
            comment: "",
            ...item,
        }));

        envelopes = this.state.envelopes.concat(envelopes);

        const sortByName = (a, b) => {
            let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();

            if (nameA < nameB) {
                return -1;
            }

            if (nameA > nameB) {
                return 1;
            }

            return 0;
        };

        const incomes = envelopes
            .filter((e) => 'income' === e.type)
            .sort(sortByName);

        const expences = envelopes
            .filter((e) => 'expence' === e.type)
            .sort(sortByName);

        this.setState({
            envelopes: incomes.concat(expences)
        });
    }

    changeEnvelopeAmount(guid, amount) {
        const envelopes = this.state.envelopes.map((envelope) => {
            if (guid === envelope['guid']) {
                return {
                    ...envelope,
                    amount,
                };
            }

            return envelope;
        });

        this.setState({
            envelopes
        });
    }

    changeEnvelopeComment(guid, comment) {
        const envelopes = this.state.envelopes.map((envelope) => {
            if (guid === envelope['guid']) {
                return {
                    ...envelope,
                    comment,
                };
            }

            return envelope;
        });

        this.setState({
            envelopes
        });
    }

    render() {
        const lines = this.state.envelopes.map((e) => (
            <BudgetEnvelopeLine
                key={e.guid}
                {...e}
                amountChangeHandler={this.changeEnvelopeAmount}
                commentChangeHandler={this.changeEnvelopeComment} />
        ));

        const total = this.state.envelopes.reduce((sum, e) => (
            sum + e.amount
        ), 0);

        return (
            <div>
                <BudgetAddEnvelope
                    envelopes={this.state.envelopes}
                    envelopeAddHandler={this.addEnvelopes} />
                <div className="form-horizontal">{lines}</div>
                <BudgetTotal total={total} />
                <BudgetSave envelopes={this.state.envelopes} />
            </div>
        )
    }
}

ReactDOM.render(<BudgetCreate />, document.getElementById('budget'));