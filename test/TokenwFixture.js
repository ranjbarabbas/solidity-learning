const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Token Contract (With Fixtures)", function () {
  /**
   * Fixture: Deploy token and return it with signers
   * Using fixtures improves test performance by reusing setup across tests
   */
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("TestToken");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await Token.deploy();
    await hardhatToken.deployed();

    return { Token, hardhatToken, owner, addr1, addr2 };
  }

  /**
   * Test that the total supply is assigned to the owner
   */
  it("Should assign the total supply of tokens to the owner", async function () {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    const totalSupply = await hardhatToken.totalSupply();

    expect(totalSupply).to.equal(ownerBalance);
    expect(ownerBalance).to.equal(ethers.utils.parseUnits("1000", 18));
  });

  /**
   * Test that tokens can be transferred between accounts
   * Uses changeTokenBalances matcher for cleaner assertions
   */
  it("Should transfer tokens between accounts", async function () {
    const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
      deployTokenFixture
    );

    // Transfer 50 tokens from owner to addr1
    await expect(
      hardhatToken.transfer(addr1.address, ethers.utils.parseUnits("50", 18))
    ).to.changeTokenBalances(
      hardhatToken,
      [owner, addr1],
      [ethers.utils.parseUnits("-50", 18), ethers.utils.parseUnits("50", 18)]
    );

    // Transfer 25 tokens from addr1 to addr2
    await expect(
      hardhatToken.connect(addr1).transfer(addr2.address, ethers.utils.parseUnits("25", 18))
    ).to.changeTokenBalances(
      hardhatToken,
      [addr1, addr2],
      [ethers.utils.parseUnits("-25", 18), ethers.utils.parseUnits("25", 18)]
    );
  });

  /**
   * Test that approvals work correctly
   */
  it("Should approve spender to spend tokens", async function () {
    const { hardhatToken, owner, addr1 } = await loadFixture(deployTokenFixture);

    const amount = ethers.utils.parseUnits("500", 18);
    await expect(hardhatToken.approve(addr1.address, amount))
      .to.emit(hardhatToken, "Approval")
      .withArgs(owner.address, addr1.address, amount);

    expect(await hardhatToken.allowance(owner.address, addr1.address)).to.equal(amount);
  });

  /**
   * Test that transferFrom works correctly with approvals
   */
  it("Should transfer from approved spender", async function () {
    const { hardhatToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

    const amount = ethers.utils.parseUnits("300", 18);

    // Owner approves addr1 to spend tokens
    await hardhatToken.approve(addr1.address, amount);

    // addr1 transfers tokens from owner to addr2
    await expect(
      hardhatToken.connect(addr1).transferFrom(owner.address, addr2.address, amount)
    ).to.changeTokenBalances(
      hardhatToken,
      [owner, addr2],
      [ethers.utils.parseUnits("-300", 18), ethers.utils.parseUnits("300", 18)]
    );

    // Allowance should be reduced
    expect(await hardhatToken.allowance(owner.address, addr1.address)).to.equal(0);
  });

  /**
   * Test that transfers fail with insufficient allowance
   */
  it("Should revert transferFrom with insufficient allowance", async function () {
    const { hardhatToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

    const amount = ethers.utils.parseUnits("100", 18);
    const approvedAmount = ethers.utils.parseUnits("50", 18);

    // Owner approves addr1 for only 50 tokens
    await hardhatToken.approve(addr1.address, approvedAmount);

    // addr1 tries to transfer 100 tokens, should fail
    await expect(
      hardhatToken.connect(addr1).transferFrom(owner.address, addr2.address, amount)
    ).to.be.revertedWith("ERC20: insufficient allowance");
  });

  /**
   * Test that transfers fail with insufficient balance
   */
  it("Should revert transfer with insufficient balance", async function () {
    const { hardhatToken, owner, addr1 } = await loadFixture(deployTokenFixture);

    const largeAmount = ethers.utils.parseUnits("2000", 18);

    await expect(
      hardhatToken.transfer(addr1.address, largeAmount)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });

  /**
   * Test that transfers fail to zero address
   */
  it("Should revert transfer to zero address", async function () {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

    const amount = ethers.utils.parseUnits("100", 18);

    await expect(
      hardhatToken.transfer(ethers.constants.AddressZero, amount)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });

  /**
   * Test token metadata
   */
  it("Should have correct token metadata", async function () {
    const { hardhatToken } = await loadFixture(deployTokenFixture);

    expect(await hardhatToken.name()).to.equal("TestToken");
    expect(await hardhatToken.symbol()).to.equal("TST");
    expect(await hardhatToken.decimals()).to.equal(18);
  });
});