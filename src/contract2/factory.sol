// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "./BeaconProxy.sol";
import "./erc884Logic.sol"; 

contract ERC884Factory {
    address[] public erc884Contracts; // Array to store deployed proxies
    ERC884Beacon public beacon;

    constructor(address _logic) {
        // Deploy the beacon with the logic contract (ERC884Token)
        beacon = new ERC884Beacon(_logic);
    }

    function createERC884(string memory _name, string memory _symbol) external returns (address) {
        // Create a new BeaconProxy and pass initialization data
        BeaconProxy proxy = new BeaconProxy(
            address(beacon),
            abi.encodeWithSelector(ERC884Token.initialize.selector,_name, _symbol)
        );

        // Store the new proxy address in the array
        erc884Contracts.push(address(proxy));

        return address(proxy);
    }

    // Function to retrieve all deployed proxies
    function getAllERC884Contracts() public view returns (address[] memory) {
        return erc884Contracts;
    }

    // Retrieve the address of the beacon
    function getBeacon() public view returns (address) {
        return address(beacon);
    }
}