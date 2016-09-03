import React from 'react';

export default class BudgetAddEnvelope extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary btn-lg btn-block">
                    <i className="glyphicon glyphicon-plus"></i> Add envelope
                </button>
            </div>
        );
    }
}