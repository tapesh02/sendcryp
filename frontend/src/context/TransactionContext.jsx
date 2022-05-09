import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionContract;
};

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [transactionDetails, setTransactionDetails] = useState({
        addressTo: "",
        amount: "0",
        message: "",
        keyword: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        setTransactionDetails((transactionDetails) => ({
            ...transactionDetails,
            [e.target.name]: e.target.value,
        }));
    };

    const IfWalletConnect = async () => {
        try {
            if (!ethereum) return alert("Please connect/install meta mask wallet");

            const accounts = await ethereum.request({
                method: "eth_accounts",
            });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No accounts connected");
            }
        } catch (error) {
            throw new Error("Wallet not connected");
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please connect/install meta mask wallet");

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error("Wallet not connected");
        }
    };

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please connect/install meta mask wallet");

            let addressTo = transactionDetails.addressTo;
            let amount = transactionDetails.amount;
            let message = transactionDetails.message;
            let keyword = transactionDetails.keyword;

            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208", //21000 GWEI
                        value: parsedAmount._hex, //0.00001
                    },
                ],
            });

            const transactionHash = await transactionContract.addToblockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            await transactionHash.wait();
            setIsLoading(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        IfWalletConnect();
    }, []);

    return <TransactionContext.Provider value={{ connectWallet, currentAccount, transactionDetails, handleChange, sendTransaction, isLoading }}> {children} </TransactionContext.Provider>;
};
