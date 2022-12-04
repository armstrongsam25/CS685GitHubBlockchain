# CS685GitHubBlockchain
Track that history!

#### Create the chain
```geth --http --http.port 8545 --datadir ./data/TestChain init genesis.json```

#### Run the chain
```geth --http --http.corsdomain="<remix provided uri (if using)" --http.api web3,eth,debug,personal,net --http.port 8545 --vmdebug --datadir ./data/TestChain --networkid 42069 --nodiscover --allow-insecure-unlock```

#### Enter geth console
```geth attach \\.\pipe\geth.ipc``` (the pipe address may differ, check the output of the above command for your pipe address)
Start mining: ```miner.start()``` (leave this running)
Stop mining: ```miner.stop()```

#### Run the API
```cd ./js```
```npm start```

#### Add WebHook to Github
Settings > Webhooks > Add Webhook
url: ```http://your_IP:3000/event?from_addr=0x0000000000000000000000000000000000000000``` (replace address with your own, make sure it has money)

#### Retreive History
Send GET request to ```http://your_IP:3000/get-history?repo_id=REPO_ID&from_addr=0x0000000000000000000000000000000000000000``` (from_addr can be any valid address, no money required)
OR
Use remix
