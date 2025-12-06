const { expect } = require("chai");

describe("Token Contract (Basic)", function () {
  /**
   * Test that the total supply is assigned to the owner upon deployment
   */
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("TestToken");
    const hardhatToken = await Token.deploy();
    await hardhatToken.deployed();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    const totalSupply = await hardhatToken.totalSupply();

    expect(totalSupply).to.equal(ownerBalance);
    expect(ownerBalance).to.equal(ethers.utils.parseUnits("1000", 18));
  });

  /**
   * Test that tokens can be transferred between accounts
   */
  it("Should transfer tokens between accounts", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("TestToken");
    const hardhatToken = await Token.deploy();
    await hardhatToken.deployed();

    // Transfer 50 tokens from owner to addr1
    await hardhatToken.connect(owner).transfer(addr1.address, ethers.utils.parseUnits("50", 18));
    const addr1Balance = await hardhatToken.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(ethers.utils.parseUnits("50", 18));

    // Transfer 25 tokens from addr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, ethers.utils.parseUnits("25", 18));
    const addr2Balance = await hardhatToken.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(ethers.utils.parseUnits("25", 18));

    // Verify addr1 has 25 tokens left
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseUnits("25", 18));
  });

  /**
   * Test that approvals work correctly
   */
  it("Should approve spender to use tokens on behalf of owner", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("TestToken");
    const hardhatToken = await Token.deploy();
    await hardhatToken.deployed();

    const amount = ethers.utils.parseUnits("100", 18);
    await hardhatToken.connect(owner).approve(addr1.address, amount);

    const allowance = await hardhatToken.allowance(owner.address, addr1.address);
    expect(allowance).to.equal(amount);
  });

  /**
   * Test that transferFrom works with approved amounts
   */
  it("Should transfer tokens from owner to receiver via transferFrom", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("TestToken");
    const hardhatToken = await Token.deploy();
    await hardhatToken.deployed();

    const amount = ethers.utils.parseUnits("50", 18);

    // Approve addr1 to spend tokens on behalf of owner
    await hardhatToken.connect(owner).approve(addr1.address, amount);

    // Transfer from owner to addr2 using addr1's approval
    await hardhatToken.connect(addr1).transferFrom(owner.address, addr2.address, amount);

    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(amount);
  });

  /**
   * Test that transfers revert with insufficient balance
   */
  it("Should revert transfer with insufficient balance", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("TestToken");
    const hardhatToken = await Token.deploy();
    await hardhatToken.deployed();

    const largeAmount = ethers.utils.parseUnits("2000", 18);

    await expect(
      hardhatToken.connect(addr1).transfer(owner.address, largeAmount)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });

  /**
   * Test token name and symbol
   */
  it("Should have correct token name and symbol", async function () {
    const Token = await ethers.getContractFactory("TestToken");
    const hardhatToken = await Token.deploy();
    await hardhatToken.deployed();

    expect(await hardhatToken.name()).to.equal("TestToken");
    expect(await hardhatToken.symbol()).to.equal("TST");
    expect(await hardhatToken.decimals()).to.equal(18);
  });
});