import logo from './logo.svg';
import './App.css';
import react, { useState, useContext } from 'react';
import ethers from 'ethers';
import { AppContext } from './context/appcontext';

function App() {
  const { connectWallet, disconnectWallet, wallet, getEthereumContract, getLimitPeopleInEvent, limitPeopleInEvent,setLimitOfPeopleInEvent, getAttendeeList, attendeeList, setAttendeeInformation, setName, setAge, setCity, setEmail, setOccupation } = useContext(AppContext);
  const [data, setData] = useState();
  const [limit, setLimit] = useState();
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
        <br/>
        <input type='number' placeholder='Enter the limit of people who can attend this event' onChange={(e)=>(setLimit(e.target.value))} />
        <button onClick={()=>(setLimitOfPeopleInEvent(limit))} >Set Limit of people who can attend this event</button>
        <br/>
        {/* <button onClick={getLimitPeopleInEvent} >Get Limit of people who can attend this event</button> */}
        <p>{limitPeopleInEvent}</p>
        <br />
        <button onClick={getAttendeeList} >Get Attendee List</button>
        <p>{attendeeList}</p>
        <br/>
        <input type='text' placeholder='Enter your name' onChange={(e)=>(setName(e.target.value))} />
        <input type='number' placeholder='Enter your age' onChange={(e)=>(setAge(e.target.value))} />
        <input type='text' placeholder='Enter your occupation' onChange={(e)=>(setOccupation(e.target.value))} />
        <input type='text' placeholder='Enter your city' onChange={(e)=>(setCity(e.target.value))} />
        <input type='text' placeholder='Enter your email' onChange={(e)=>(setEmail(e.target.value))} />
        <button onClick={()=>(setAttendeeInformation())} >Set Attendee Information</button>


         
        
      </header>
    </div>
  );
}

export default App;
