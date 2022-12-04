// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

contract GithubHistory {  

    // struct for storing the history
    struct History {
        string repo_id;
        string[] event_string_array;
    } 

    // key (repo id) to value (history struct mapping)
    mapping (bytes32=> History) public historyTable;

    // converts repo id to a 32 byte string
    function stringToBytes32(string memory _str) public pure returns (bytes32) {
        bytes32 convertedBytes;
        assembly {
            convertedBytes := mload(add(_str, 32))
        }
        return convertedBytes;
    }

    // saves the sent history to blockchain
    function saveEvent(string memory _repo_id, string memory _event_string) public {
        bytes32 newKey = stringToBytes32(_repo_id);
        historyTable[newKey].repo_id = _repo_id;
        historyTable[newKey].event_string_array.push(_event_string);
    }

    // gets all history given repo_id
    function getHistoryFromID(string memory _repo_id) public view returns (string [] memory) {
        bytes32 key = stringToBytes32(_repo_id);
        return historyTable[key].event_string_array;
    }
}