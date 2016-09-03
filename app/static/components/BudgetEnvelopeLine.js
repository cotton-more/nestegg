import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

export default class BudgetEnvelopeLine extends React.Component {
    static defaultProps = {
        id: null,
        guid: null,
        type: null,
        amount: 0,
        comment: ""
    }

    static propTypes = {
        guid: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        amount: React.PropTypes.number.isRequired,
        comment: React.PropTypes.string,
        amountChangeHandler: React.PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            editComment: false
        };

        this.updateAmount = this.updateAmount.bind(this);


        this.showEditComment = this.showEditComment.bind(this);
        this.cancelEditComment = this.cancelEditComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.editComment) {
            ReactDOM.findDOMNode(this.commentInput).focus();
        }
    }

    updateAmount(event) {
        const amount = parseInt(event.target.value, 10) || 0;

        this.props.amountChangeHandler(this.props.guid, Math.abs(amount));
    }

    updateComment(event) {
        const comment = this.commentInput.value;

        this.props.commentChangeHandler(this.props.guid, comment);

        this.cancelEditComment();
    }

    cancelEditComment() {
        this.setState({
            editComment: false,
        });
    }

    showEditComment() {
        this.setState({editComment: true});
    }

    renderEditCommentBlock() {
        return (
            <div>
                <div className="input-group input-group-sm">
                    <input
                        type="text"
                        className="form-control"
                        ref={(ref) => this.commentInput = ref}
                        placeholder="Comment" />
                    <span className="input-group-btn">
                        <button className="btn btn-success" type="button" onClick={this.updateComment}>
                            <i className="glyphicon glyphicon-ok"></i>
                        </button>
                        <button className="btn btn-warning" type="button" onClick={this.cancelEditComment}>
                            <i className="glyphicon glyphicon-remove"></i>
                        </button>
                    </span>
                </div>
            </div>
        )
    }

    renderCommentBlock() {
        return (
            <span className="help-block">{this.props.comment}</span>
        )
    }

    render() {
        const { editComment } = this.state;
        const editCommentBlock = this.renderEditCommentBlock();

        const { comment } = this.props;

        return (
            <div>
                <div className="form-group form-group-sm">
                    <label className="col-sm-3 control-label">{this.props.name}</label>

                    <div className="col-sm-7">
                        <div className={classnames('input-group', {'hidden': editComment})}>
                            <span className="input-group-addon">
                                <i className="glyphicon glyphicon-rub"></i>
                            </span>
                            <input
                                className="form-control"
                                type="text"
                                value={this.props.amount}
                                onChange={this.updateAmount} />
                            <span className="input-group-addon">.00</span>
                        </div>

                        <div className={classnames({'hidden': !editComment})}>{editCommentBlock}</div>

                        <p onClick={this.showEditComment}>
                            <i className="glyphicon glyphicon-comment"></i> {comment || "Add comment..."}
                        </p>
                    </div>

                    <div className="col-sm-2">
                        <div className="btn-group btn-group-justified">
                            <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-warning">
                                    <i className="glyphicon glyphicon-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}