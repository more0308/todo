import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
    changaMessage = (e) => {
        this.props.onSearchPanel(e.target.value);
    };

    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   onChange={this.changaMessage}/>
        );
    }
};
