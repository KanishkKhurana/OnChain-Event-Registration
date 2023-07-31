import logo from './logo.svg';
import './App.css';
import react, { useState, useContext } from 'react';
import ethers from 'ethers';
import { AppContext } from './context/appcontext';

function App() {
  const { connectWallet, disconnectWallet, wallet, getEthereumContract } = useContext(AppContext);
  const [data, setData] = useState();
  const [author, setAuthor] = useState();


  const getQuote = async() => {
    const url = 'https://api.quotable.io/random';
    const options = {method: 'GET', headers: {Accept: 'application/json'}};

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      setData(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>QuoteBoy</h1>
        {wallet} 
        <br />
        {data}
        <button className='myButton' onClick={getQuote}>Click me</button>
        <p className='author'>{author}</p>
        <button className='myButton' onClick={connectWallet}>Connect Wallet</button>
        <button className='myButton' onClick={disconnectWallet}>Disconnect Wallet</button>
        <button onClick={getEthereumContract} >Connect to the chain</button>
         
        
      </header>
    </div>
  );
}

export default App;
