import React from 'react';
import { formatMoney } from 'accounting';

export default class BudgetTotal extends React.Component {
    static defaultProps = {
        total: 0,
    }

    static propTypes = {
        total: React.PropTypes.number.isRequired,
    }

    render() {
        return (
            <div className="budget-total">
                <hr />
                <div className="row">
                    <div className="col-sm-6">
                        <b>Total:</b>
                    </div>
                    <div className="col-sm-6">
                        <p className="text-right">
                            <i className="glyphicon glyphicon-rub"></i> {formatMoney(this.props.total, {format: '%v'})}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}