import React,{useState, useEffect, createContext} from "react";
import {ethers} from "ethers";
import {contractABI, contractAddress} from "../utils/appUtils"
export const AppContext = createContext();
const {ethereum} = window;




export const AppProvider = ({children}) => {
    const [wallet, setWallet] = useState("");
    const [limitPeopleInEvent, setLimitPeopleInEvent] = useState("");
    const [attendeeList, setAttendeeList] = useState([]);
    // name, age, occupation, city, email
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [occupation, setOccupation] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");





    const getEthereumContract = () =>{
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log(contract, provider, signer)   
        return contract;
    }
    
    
    const connectWallet = async() =>{
        if(!ethereum){
          alert("please download metamask")
          return;
        }
        const accounts = await ethereum.request({method: 'eth_requestAccounts'});
        setWallet(accounts[0]);
    }

    
    const disconnectWallet = () =>{
          setWallet("");
    }


    const getLimitPeopleInEvent = async() =>{
        try {            
            if(!ethereum){
                alert("please download metamask")
                return;
            }
    
            const contract = getEthereumContract();
            console.log("response converted to String",limitPeopleInEvent.toString());
            setLimitPeopleInEvent(limitPeopleInEvent.toString());
        } catch (error) {
            console.log(error);
            
        }
    }

    const setLimitOfPeopleInEvent = async(numberOfPeople) =>{
        try {
            if(!ethereum){
                alert("please download metamask")
                return;
            }
            const contract = getEthereumContract();
            const tx = await contract.setLimitPeople(numberOfPeople);
            await tx.wait();
            console.log("transaction mined", tx);
            getLimitPeopleInEvent();

            
        } catch (error) {
            console.log(error);
            
        }
    }

    const getAttendeeList = async() =>{
        try {
            if(!ethereum){
                alert("please download metamask")
                return;
            }
            const contract = getEthereumContract();
            const attendeeList = await contract.getAttendeeList();
            console.log("exact response",attendeeList);
            console.log("response converted to String",attendeeList.toString());
            setAttendeeList(attendeeList.toString());
            
        } catch (error) {
            console.log(error);
        }
    }


    const setAttendeeInformation = async() =>{
        try {
            if(!ethereum){
                alert("please download metamask")
                return;
            }
            const contract = getEthereumContract();
            const tx = await contract.setAttendeeDetail(name, age, occupation, city, email);
            await tx.wait();
            console.log("transaction mined", tx);
            getAttendeeList();
            
        } catch (error) {
            
        }
    }





    return (
        <AppContext.Provider value={{connectWallet, disconnectWallet, wallet, getEthereumContract, getLimitPeopleInEvent, limitPeopleInEvent, setLimitOfPeopleInEvent, getAttendeeList, attendeeList, setAttendeeInformation, setName, setAge, setCity, setEmail, setOccupation}}>
            {children}
        </AppContext.Provider>  
    )
}