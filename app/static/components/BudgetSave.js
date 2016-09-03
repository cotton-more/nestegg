import React from 'react';

export default class BudgetSave extends React.Component {
    constructor(props) {
        super(props);

        this.saveBudget = this.saveBudget.bind(this);
    }

    saveBudget() {
        console.log(this.props);
    }

    render() {
        return (
            <div className="budget-save">
                <hr />
                <button className="btn btn-primary btn-lg btn-block" onClick={this.saveBudget}>
                    <i className="glyphicon glyphicon-floppy-disk"></i> Save
                </button>
            </div>
        )
    }
}