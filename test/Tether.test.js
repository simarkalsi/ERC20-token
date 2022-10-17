const { expect } = require("chai");
const { ethers } = require("hardhat");


describe('Tethers', () => {
  let owner,account1, account2,token, hardhatToken

  before(async () => {
    [owner, account1, account2,account3] = await ethers.getSigners();
    console.log("signers object : ", owner);


    token = await ethers.getContractFactory("Tether"); //instance contract
    hardhatToken = await token.deploy(); //deploy contract


  });



  describe('Tether token', () => {
    it('tranfer of total supply to owner account', async function () {
      const ownerBalance = await hardhatToken.balances(owner.address);
      console.log("Owner Address : ", owner.address); //getting address of owner

      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); //equation to proof

    })
    it("tranfer function",async function(){
      
      await hardhatToken.transfer(account1.address,100);
      expect(await hardhatToken.balances(account1.address)).to.equal(100);

      await hardhatToken.connect(account1).transfer(account2.address,50);
      expect(await hardhatToken.balances(account2.address)).to.equal(50);

    })
    it("allocation of funds", async function(){
       await hardhatToken.allocation(account2.address,100);

       expect(await hardhatToken.allowanceBalances(owner.address,account2.address)).to.equal(100);

    })
    it("allocation transaction", async function(){
      await hardhatToken.allocation(account3.address,100);
      await hardhatToken.connect(account3).allowanceTransfer(owner.address,100);
      expect( await hardhatToken.balances(account3.address)).to.equal(100)
    })
  });
});