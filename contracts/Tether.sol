// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Tether {
    
    string symbol;
    string tether;
    uint public totalSupply =1000000000000000000000000;


    event transaction(address from, address to, uint amount);
    event allowanceTransaction(address from , address to , uint amount);

    mapping (address => uint) public balances;
    mapping (address => mapping(address=>uint)) public allowanceBalances;
 
    constructor(){
        balances[msg.sender]+=totalSupply;
    }

    function  transfer(address to, uint amount) public  returns (bool success) {
        require(balances[msg.sender]>=amount,"You dont have sufficient balance");

        balances[msg.sender]-=amount;
        balances[to]+=amount;

        emit transaction(msg.sender,to,amount);

        return true;

    }
   
   function allocation (address to, uint amount) public {
    require(balances[msg.sender]>=amount,"You dont have sufficient balance");

    allowanceBalances[msg.sender][to]+=amount;

    emit allowanceTransaction(msg.sender,to,amount);

   }

   function allowanceTransfer(address from ,uint amount) public returns (bool success) {
    require(allowanceBalances[from][msg.sender]>=amount,"Dont have enough allocated amount");

    balances[from]-=amount;
    allowanceBalances[from][msg.sender]-=amount;
    balances[msg.sender]+=amount;

    emit allowanceTransaction(from,msg.sender,amount);

    return true;
       }
}
