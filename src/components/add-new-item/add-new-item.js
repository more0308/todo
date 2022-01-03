import React, {Component} from "react";

import "./add-new-item.css";

export default class AddNewItem extends Component {
    state = {
        label: ''
    };
    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdd(this.state.label);
        this.setState({label:''});
    };

    render() {
        return (
            <form className="add-button d-flex"
                  onSubmit={this.onSubmit}>
                <input type="text"
                       className="form-control"
                       placeholder="Input some message"
                       onChange={this.onLabelChange}
                       value={this.state.label}/>
                <button
                    className="btn btn-outline-secondary"
                >
                    Add New Item
                </button>
            </form>);
    }
}