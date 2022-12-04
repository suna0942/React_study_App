import { useEffect, useState } from "react";

function CoinTracker() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState(0);
  const [convert, setConvert] = useState(0);
  const [sym, setSym] = useState("");
  const [currency, setCurrency] = useState(true);
  const [rate, setRate] = useState(0);

  const changeCurrency = () => {
    setCurrency(prev => !currency);
    setAmount(0);
  };
  const onChange = (e) => setAmount(prev => e.target.value);
  const selectChange = (e) => {
    setConvert(prev => e.target.value);
    const idx = e.target.selectedIndex;
    const sym = e.target[idx].dataset.name;
    setSym(prev => sym);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then(response => response.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
        setConvert(prev => data[0].quotes.USD.price);
        setSym(prev => data[0].symbol);
      });
    
    fetch("https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD")
    .then(response => response.json())
    .then(data => {
      setRate(prev => data[0].basePrice);
    });
  }, []);
  return (
    <div>
      <h1>🧮The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <h3>코인 가격</h3>
      {loading ? 
        <strong>Loading...</strong> : 
        <div>
          <select onChange={selectChange}>
          {coins.map((coin) => (
            <option key={coin.id} data-name={coin.symbol} value={coin.quotes.USD.price}>
              {coin.name}({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
          </select>
          <h3>코인 변환기</h3>
          <label htmlFor="inputPrice">{currency ? '$' : '￦'}</label>
          <input value={amount} onChange={onChange} id="inputPrice" type="number" placeholder="금액을 입력해주세요"/>
          <button onClick={changeCurrency}>
            {currency ? '$ → won' : 'won → $'}
          </button><br/>
          <label htmlFor="changePrice">↔ {sym} </label>
          <input 
            value={currency ? amount / convert : Math.ceil(amount / rate * 100) / 100 / convert}
            id="changePrice" readOnly/>
          <p>현재 환율: 1$(USD) - {rate.toLocaleString('ko-KR')}원(KRW)</p>
        </div>
      }
    </div>
  );
}

export default CoinTracker;