import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, CircularProgress, Divider, Paper, TextField } from "@mui/material";

import card from "../assets/card.png";
import "../Send/send.scss";

const Send = () => {
    const { connectWallet, currentAccount, transactionDetails, handleChange, sendTransaction, isLoading } = useContext(TransactionContext);

    const [storeData, setStoreData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currentAccount) {
            window.alert("please connect meta mask wallet");
        } else {
            sendTransaction();
        }
    };
    const getTransactions = async () => {
        const activeApi = `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${currentAccount}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${process.env.REACT_APP_ETHER_API}`;

        const nonActiveApi = `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=0x1671363cdf39196333f56818963f108066f776f9&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${process.env.REACT_APP_ETHER_API}`;
        try {
            const response = await fetch(currentAccount ? activeApi : nonActiveApi);
            const responseJson = await response.json();
            setStoreData(responseJson.result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTransactions();
    }, []);
    const columns = [
        { field: "id", headerName: "ID", width: 70, align: "left", flex: 7 },
        { field: "addressTo", headerName: "Address To", width: 130, align: "left", flex: 7 },
        { field: "addressFrom", headerName: "Address From", width: 130, align: "left", flex: 7 },
        { field: "amount", headerName: "Amount (in Eth)", width: 130, align: "left", flex: 7 },
        { field: "timestamp", headerName: "Timestamp", width: 130, align: "left", flex: 7 },
        { field: "status", headerName: "Status", width: 130, align: "left", flex: 7 },
        {
            field: "gasPrice",
            headerName: "Gas Price",
            type: "text",
            width: 90,
            align: "left",
            flex: 7,
        },
    ];

    let newId = 0;

    const rows = storeData?.map((row) => {
        newId += 1;

        return {
            id: `${newId}`,
            addressTo: `${row.to}`.slice(0, 5).concat(" ....", `${row.to}`.slice(`${row.to}`.length - 5)),
            addressFrom: `${row.from}`.slice(0, 5).concat("....", `${row.from}`.slice(`${row.from}`.length - 5)),
            amount: row.value / 10 ** 18, //convert wei to eth
            timestamp: new Date(row.timeStamp * 1000).toLocaleString(),
            status: `${row.isError}` == 0 ? "success " : "failed",
            gasPrice: `${row.gasPrice}`,
        };
    });

    return (
        <>
            <Box className="sendmain main">
                <Box className="maintitle">
                    <p className="title">Start Sending crypto across the world</p>
                    <p className="subtitle">Explore the world of crypto. Buy and Sell any cryptocurrencies easily on SendCryp.</p>
                    {!currentAccount && (
                        <Button color="inherit" className="btn" sx={{ background: "#2D3449" }} onClick={connectWallet}>
                            Connect Wallet
                        </Button>
                    )}

                    <Box className="maintags">
                        <Paper className="tags">Secure</Paper>
                        <Paper className="tags"> New</Paper>
                        <Paper className="tags"> Cheaper</Paper>
                    </Box>

                    <Box className="maintags">
                        <Paper className="tags"> Reliable</Paper>
                        <Paper className="tags"> Fast</Paper>
                        <Paper className="tags"> Trusted</Paper>
                    </Box>
                </Box>
                <Box className="mainimgform">
                    <Box className="cardImg">
                        <img src={card} alt="cImg" className="cimg" />
                    </Box>

                    <Box className="frominputs">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name="addressTo"
                                value={transactionDetails.addressTo}
                                onChange={handleChange}
                                required
                                fullWidth
                                margin="dense"
                                id="outlined-addressTo-input"
                                placeholder="Address To"
                                type="text"
                            />
                            <TextField
                                name="amount"
                                value={transactionDetails.amount}
                                onChange={handleChange}
                                required
                                fullWidth
                                margin="dense"
                                id="outlined-amount-input"
                                placeholder="Amount in Eth"
                                type="number"
                            />

                            <Divider sx={{ background: "white", opacity: "0.7", marginTop: "5%", marginBottom: "5%" }} />
                            {isLoading ? (
                                <Box style={{ display: "flex", justifyContent: "center" }}>
                                    <CircularProgress color="inherit" />
                                </Box>
                            ) : (
                                <Button color="inherit" sx={{ border: "1px solid white", width: "100%", height: "45px" }} type="submit">
                                    Send Now
                                </Button>
                            )}
                        </form>
                    </Box>
                </Box>
            </Box>
            <Box style={currentAccount ? { marginTop: "13%" } : {}}>
                <p className="recentTitle"> Recent Transactions</p>
            </Box>
            <Box className="datatable" sx={{ height: 363 }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableSelectionOnClick={true} sx={{ m: 2, width: "100%" }} />
            </Box>
        </>
    );
};

export default Send;
