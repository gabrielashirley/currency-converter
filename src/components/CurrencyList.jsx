import React, { Component } from 'react';

export default class CurrencyList extends Component {
    render() {
        return (
            <li className="list-group-item p-4 d-flex justify-content-between">
                <div>
                    <h5>{ this.props.currency }</h5>
                    <small className="text-muted">{ `1 ${this.props.current} = ${this.props.rate.toLocaleString()} ${this.props.currency}` }</small>
                    <div className="mt-3">
                        <button className="btn btn-danger" onClick={e => { e.preventDefault(); this.props.removeConversion() } }>Remove</button>
                    </div>
                </div>
                <span className="text-muted">{ this.props.amount.toLocaleString() }</span>
            </li> 
        );
    }
}
