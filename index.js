"use strict";
exports.__esModule = true;
var readline_sync_1 = require("readline-sync");
var CustomerContracts = /** @class */ (function () {
    function CustomerContracts() {
    }
    return CustomerContracts;
}());
function main() {
    var customerContracts = [];
    var contractTypeList = [
        { "contractTypeCode": 1, "contractType": "CHAT 100", "monthlyCost": 125 },
        { "contractTypeCode": 2, "contractType": "CHAT 200", "monthlyCost": 230 },
        { "contractTypeCode": 3, "contractType": "SUNDAY FREE", "monthlyCost": 185 },
        { "contractTypeCode": 4, "contractType": "MIDNIGHT PLUS", "monthlyCost": 200 },
    ];
    var reduction = 25;
    var complete = false;
    var _loop_1 = function () {
        var customerContract = {};
        var contractTypeCode = (0, readline_sync_1.question)('Please enter the contract type code (1,2,3 OR 4):\n');
        if (!isNumber(contractTypeCode) || !checkInvalidContract(contractTypeCode)) {
            console.error('Invalid input: Please enter a valid contract type.');
            return "continue";
        }
        customerContract.contractTypeCode = parseInt(contractTypeCode);
        contractTypeList.forEach(function (x) {
            if (x.contractTypeCode === parseInt(contractTypeCode)) {
                customerContract.contractType = x.contractType;
                customerContract.monthlyCost = x.monthlyCost;
            }
        });
        var gender = (0, readline_sync_1.question)('Please specify the gender (M/F)?\n').toUpperCase();
        if (!validGender(gender)) {
            console.error('Invalid input: Please specify a valid gender.');
            return "continue";
        }
        customerContract.gender = gender;
        var customerAge = (0, readline_sync_1.question)('How old is the customer?\n');
        if (!isNumber(customerAge)) {
            console.error('Invalid input: The customer age must be a numeric value');
            return "continue";
        }
        customerContract.customerAge = parseInt(customerAge);
        if (customerContract.gender === 'F' && customerContract.customerAge > 50) {
            customerContract.monthlyCost = customerContract.monthlyCost - reduction;
            console.log('Reduction applied!!!');
        }
        customerContracts.push(customerContract);
        var proceed = (0, readline_sync_1.question)('Do you wish to continue? Y/N\n');
        if (proceed.toUpperCase() == 'Y')
            return "continue";
        return "break";
    };
    while (!complete) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
    customerContracts.forEach(function (x) {
        console.log("Customer Gender: ".concat(x.gender, " \nCustomer contract type: ").concat(x.contractTypeCode, " - ").concat(x.contractType, " \nCustomer age: ").concat(x.customerAge, "\nMonthly cost: ").concat(x.monthlyCost, "\n"));
    });
    console.log("Total number of males subscribed with MIDIGHT PLUS: ".concat(getMidnightPlusMale(customerContracts), " customers"));
    console.log("Total number of females under 30 subscribed with CHAT 200: ".concat(getChat200FemaleUnder30(customerContracts), " customers"));
    console.log("Total monthly costs for all new SUNDAY FREE contracts: ".concat(getSundayFreeTotalCost(customerContracts)));
}
var isNumber = function (str) {
    var maybeNum = parseInt(str);
    var isNum = !isNaN(maybeNum);
    return isNum;
};
var checkInvalidContract = function (str) {
    var validContractCodes = ['1', '2', '3', '4'];
    return validContractCodes.some(function (x) { return x === str; });
};
var validGender = function (str) {
    var validContractCodes = ['M', 'F'];
    return validContractCodes.some(function (x) { return x === str.toUpperCase(); });
};
var getMidnightPlusMale = function (arr) {
    var custs = 0;
    arr.forEach(function (x) {
        if (x.contractTypeCode === 4 && x.gender === 'M') {
            custs++;
        }
    });
    return custs;
};
var getChat200FemaleUnder30 = function (arr) {
    var custs = 0;
    arr.forEach(function (x) {
        if (x.contractTypeCode === 2 && x.gender === 'F' && x.customerAge < 30) {
            custs++;
        }
    });
    return custs;
};
var getSundayFreeTotalCost = function (arr) {
    var totalCosts = 0;
    arr.forEach(function (x) {
        if (x.contractTypeCode === 3) {
            totalCosts += x.monthlyCost;
        }
    });
    return totalCosts;
};
main();
