import React, { Component } from 'react';
import './CurrencyList';
import CurrencyList from './CurrencyList';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'currencies': [],
            'currency': '',
            'active_converts': [],
            'amount': 1,
            'new_currency': '',
        }
    }
    componentDidMount() {
        const axios = require('axios');
        axios.get('https://api.exchangeratesapi.io/latest').then(response => {
            let rates = response.data.rates;
            let currencies = [];
            for (let key in rates) {
                if (!rates.hasOwnProperty(key)) continue;

                currencies.push({
                    'currency': key,
                    'rate': rates[key],
                });
            }
            if (currencies.findIndex(c => c.currency === response.data.base) === -1) {
                currencies.push({
                    'currency': response.data.base,
                    'rate': 1,
                });
            }

            this.setState({
                'currencies': currencies.sort((c1, c2) => c1.currency.localeCompare(c2.currency)),
                'currency': response.data.base,
            });
        }).catch(err => {
            console.log(err);
        });
    }
    render() {
        if (this.state.currencies.length === 0) return false;
        const currency_options = this.state.currencies.map((currency, i) => {
            return (
                <option key={ currency.currency } value={ currency.currency }>{ currency.currency }</option>
            );
        });
        const currency_conversion = this.state.active_converts.map((convert, i) => {
            return (
                <CurrencyList 
                    key={ convert } 
                    currency={ convert } 
                    amount={ this.convert(this.state.amount, this.state.currency, convert) } 
                    rate={ this.state.currencies.find(c => c.currency === convert).rate } 
                    current={ this.state.currency }
                    removeConversion={ () => this.removeConversion(convert) }
                />
            );
        });
        return (
            <div className="container">
                <div className="py-5 text-center">
                    <h2>Currency Converter</h2>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card p-4">
                            <h4 className="mb-3">Base Currency</h4>
                            <form onSubmit={ e => e.preventDefault() }>
                                <div className="row">
                                    <div className="col-md-8">
                                        <label htmlFor="amount">Amount</label>
                                        <input type="number" id="amount" className="form-control" onChange={ e => this.updateAmount(e) } value={ this.state.amount } />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="currency">Currency</label>
                                        <select id="currency" className="form-control" value={ this.state.currency } onChange={ e => this.updateCurrency(e) }>
                                            { currency_options }
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h4 className="mb-3">Converted Values</h4>
                        <ul className="list-group mb-3">
                            { currency_conversion }
                        </ul>
                        <form className="card p-2 needs-validation" onSubmit={ e => { 
                            e.preventDefault();
                            this.addConversion(); 
                        } }>
                            <div className="input-group">
                                <input type="text" placeholder="Currency" className="form-control" onChange={ e => this.updateAddCurrency(e) } value={ this.state.new_currency } />
                                <div className="input-group-append">
                                    <button type="submit" className="btn btn-primary">Add</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
        );
    }
    updateAmount(event) {
        this.setState({
            'amount': event.target.value,
        });
    }
    updateCurrency(event) {
        this.setState({
            'currency': event.target.value,
        });
    }
    updateAddCurrency(event) {
        this.setState({
            'new_currency': event.target.value,
        });
    }
    addConversion() {
        if (this.state.active_converts.indexOf(this.state.new_currency) > -1) {
            alert('Currency has already been converted!');
            this.setState({
                'new_currency': '',
            });
        }
        else {
            if (this.state.currencies.findIndex(c => c.currency === this.state.new_currency) === -1) {
                alert('Invalid / Unsupported currency!');
                this.setState({
                    'new_currency': '',
                });
            }
            else {
                this.setState({
                    'active_converts': [...this.state.active_converts, this.state.new_currency],
                    'new_currency': '',
                });
            }
        }
    }
    removeConversion(key) {
        if (this.state.active_converts.indexOf(key) === -1) return;

        let idx = this.state.active_converts.indexOf(key);
        this.setState({
            'active_converts': [...this.state.active_converts.slice(0, idx), ...this.state.active_converts.slice(idx + 1)],
        });
    }
    convert(amount, from, to) {
        let currency_from = this.state.currencies.find(c => c.currency === from);
        let currency_to = this.state.currencies.find(c => c.currency === to);
        return (currency_to.rate / currency_from.rate) * parseFloat(amount);
    }
}
