var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); // this is the blockchain url

function init(){
    let contractAddr = "0x8fF08D3401f8ce54Ba55643c5412Ab21aA869C10";
    let ABI = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_repo_id",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_event_string",
                    "type": "string"
                }
            ],
            "name": "saveEvent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_repo_id",
                    "type": "string"
                }
            ],
            "name": "getHistoryFromID",
            "outputs": [
                {
                    "internalType": "string[]",
                    "name": "",
                    "type": "string[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "historyTable",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "repo_id",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_str",
                    "type": "string"
                }
            ],
            "name": "stringToBytes32",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        }
    ];
    return new web3.eth.Contract(ABI, contractAddr);
}

exports.send_to_contract = async function(repo_id, event_string, payment_addr) {
    let GithubHistory = init();
    let event_string_json = JSON.parse(event_string);
    return new Promise(resolve => {
        console.log("action" in event_string_json);
        let important_info = "";
        if ("action" in event_string_json) {
            important_info = "{'action':'"+event_string_json.action+"','repo_id':'"+ event_string_json.repository.id+"','repo_name':'"+event_string_json.repository.name+"','repo_url':'"+event_string_json.repository.html_url+"','sender':'"+event_string_json.sender.login+"', 'sender_url':'"+event_string_json.sender.html_url+"'}";
        } else {
            important_info = "{'ref':'"+ event_string_json.ref+"','repo_id':'"+ event_string_json.repository.id+"','repo_name':'" + event_string_json.repository.name+"','created':'"+event_string_json.created+"','deleted':'"+event_string_json.deleted+"','forced':'"+event_string_json.forced+"','commit_timestamp':'"+event_string_json.head_commit.timestamp+"','commit_message':'"+event_string_json.head_commit.message+"','commit_url':'"+event_string_json.head_commit.url+"','commit_author':'"+event_string_json.head_commit.author.name+"','commit_author_email':'"+event_string_json.head_commit.author.email+"','commit_added':'"+event_string_json.head_commit.added+"','commit_removed':'"+event_string_json.head_commit.removed+"','commit_modified':'"+ event_string_json.head_commit.modified+"'}";
        }
        GithubHistory.methods.saveEvent(repo_id.toString(), important_info).send({from: payment_addr}).on('error', function (error) {
            console.log(error);
        }).then(function(result){
            console.log("[INFO]\t Tx Hash: " + result.transactionHash);
            console.log("[INFO]\t Event for repo ID ("+repo_id+") saved to blockchain");
            resolve(true);
        });
    });
}

exports.get_history = async function(repo_id, from_addr) {
    let GithubHistory = init();
    return new Promise(resolve => {
        GithubHistory.methods.getHistoryFromID(repo_id).call({from: from_addr}).then(function(result){
            console.log("[INFO]\t Retrieved history for repo ID ("+repo_id+") from blockchain");
            resolve(result);
        });
    });
}