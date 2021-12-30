import ExchangeRate from './ExchangeRate';
import {useState} from 'react';
import axios from 'axios';

const CurrencyConverter = () => {

    const currency = ['USD', 'EUR', 'BTC', 'LTC', 'ETH', 'XRP'];
    const [chosenCurrency, setChosenCurrency] = useState('BTC');
    const [chosenSecondCurrency, setChosenSecondCurrency] = useState('USD');
    const [amount, setAmount] = useState(1);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [result, setResult] = useState(0);

    // console.log("1st " + chosenCurrency);
    // console.log("2nd " + chosenSecondCurrency);
    // console.log(amount)


    const convert = () => {

        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {
                from_currency: chosenCurrency,
                function: 'CURRENCY_EXCHANGE_RATE',
                to_currency: chosenSecondCurrency
            },
            headers: {
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
            }
        };

        axios.request(options).then((response) => {
            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setResult(amount * response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
        }).catch((error) => {
            console.error(error);
        });
    }


    return (
        <div className="currency-converter">
            <h2>CurrencyConverter</h2>

            <div className={"input-box"}>
                <table>
                    <thead>
                    <tr>
                        <th>From</th>
                        <th>Amount</th>
                        <th>To</th>
                        <th>Result</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <select
                                value={chosenCurrency}
                                name={"currency-option-1"}
                                className={'currency-options'}
                                onChange={(e) => setChosenCurrency(e.target.value)}
                            >
                                {currency.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>


                        <td>
                            <input type="number" name={"currency-amount"} value={amount}
                                   onChange={(e) => {
                                       setAmount(e.target.value);
                                   }}
                            />
                        </td>

                        <td>
                            <select
                                value={chosenSecondCurrency}
                                name={"currency-option-2"}
                                className={'currency-options'}
                                onChange={(e) => setChosenSecondCurrency(e.target.value)}
                            >
                                {currency.map((currency, _index) => (<option key={_index}>{currency}</option>))}

                            </select>
                        </td>
                        <td>
                            <input type="number" value={result} disabled placeholder={"result"}/>
                        </td>
                    </tr>

                    </tbody>
                </table>

                <button id={"convert-btn"} onClick={convert}>Convert</button>
            </div>


            <ExchangeRate exchangeRate={exchangeRate}
                          chosenCurrency={chosenCurrency}
                          chosenSecondCurrency={chosenSecondCurrency}
            />
        </div>

    )
}
export default CurrencyConverter;