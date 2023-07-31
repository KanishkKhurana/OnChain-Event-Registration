import React,{useState, useEffect, createContext} from "react";
import {ethers} from "ethers";
import {contractABI, contractAddress} from "../utils/appUtils"
export const AppContext = createContext();
const {ethereum} = window;




export const AppProvider = ({children}) => {
    const [wallet, setWallet] = useState("");



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




    return (
        <AppContext.Provider value={{connectWallet, disconnectWallet, wallet, getEthereumContract}}>
            {children}
        </AppContext.Provider>  
    )
}