import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

export const approve = async (lpContract, masterChefContract, account) =>
  lpContract.methods.approve(masterChefContract.options.address, ethers.constants.MaxUint256).send({ from: account })

export const stake = async (masterChefContract, pid, amount, account) =>
  masterChefContract.methods
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const smartStake = async (smartChefContract, amount, account) =>
  smartChefContract.methods
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const sousStake = async (sousChefContract, amount, account) =>
  sousChefContract.methods
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const sousStakeBnb = async (sousChefContract, amount, account) =>
  sousChefContract.methods
    .deposit()
    .send({ from: account, value: new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() })
    .on('transactionHash', (tx) => tx.transactionHash)

export const unstake = async (masterChefContract, pid, amount, account) =>
  masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const smartChefUnstake = async (smartChefContract, amount, account) =>
  smartChefContract.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const sousUnstake = async (sousChefContract, amount, account) => {
  // shit code: hard fix for old CTK and BLK
  if (sousChefContract.options.address === '0x3B9B74f48E89Ebd8b45a53444327013a2308A9BC') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => tx.transactionHash)
  }
  if (sousChefContract.options.address === '0xBb2B66a2c7C2fFFB06EA60BeaD69741b3f5BF831') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => tx.transactionHash)
  }
  return sousChefContract.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)
}

export const sousEmegencyUnstake = async (sousChefContract, amount, account) =>
  sousChefContract.methods
    .emergencyWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const harvest = async (masterChefContract, pid, account) =>
  masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const soushHarvest = async (sousChefContract, account) =>
  sousChefContract.methods
    .deposit('0')
    .send({ from: account })
    .on('transactionHash', (tx) => tx.transactionHash)

export const soushHarvestBnb = async (sousChefContract, account) =>
  sousChefContract.methods
    .deposit()
    .send({ from: account, value: new BigNumber(0) })
    .on('transactionHash', (tx) => tx.transactionHash)
