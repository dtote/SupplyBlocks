"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Manager = artifacts.require('Manager');
module.exports = function (deployer) {
    deployer.deploy(Manager);
};
