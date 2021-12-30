const ExchangeRate = ({exchangeRate, chosenCurrency, chosenSecondCurrency}) => {
    return (
        <div className="exchangeRate">
            <h3> Exchange Rate</h3>
            <h1>{exchangeRate}</h1>
            <p>from {chosenCurrency} to {chosenSecondCurrency}</p>

        </div>
    )
}
export default ExchangeRate;