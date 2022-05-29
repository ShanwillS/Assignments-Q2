"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = require("readline-sync");
class ContractTypes {
}
class CustomerContracts {
}
function main() {
    let contractTypeList = [];
    let customerContracts = [];
    let contractTypes1 = {
        contractTypeCode: 1,
        contractType: 'CHAT 100',
        monthlyCost: 125
    };
    let contractTypes2 = {
        contractTypeCode: 2,
        contractType: 'CHAT 200',
        monthlyCost: 230
    };
    let contractTypes3 = {
        contractTypeCode: 3,
        contractType: 'SUNDAY FREE',
        monthlyCost: 185
    };
    let contractTypes4 = {
        contractTypeCode: 4,
        contractType: 'MIDNIGHT PLUS',
        monthlyCost: 200
    };
    contractTypeList.push(contractTypes1);
    contractTypeList.push(contractTypes2);
    contractTypeList.push(contractTypes3);
    contractTypeList.push(contractTypes4);
    const reduction = 25;
    let complete = false;
    while (!complete) {
        let customerContract = {};
        let contractTypeCode = (0, readline_sync_1.question)('Please enter the contract type code (1,2,3 OR 4):\n');
        if (!isNumber(contractTypeCode) && checkInvalidContract(contractTypeCode)) {
            console.error('Invalid input: Please enter a valid contract type.');
            continue;
        }
        customerContract.contractTypeCode = parseInt(contractTypeCode);
        var zz = contractTypeList.find(e => e.contractTypeCode === contractTypeCode);
        // contractTypeList.forEach(x => {
        //     const r = Object.keys(x).find((key) => {  return x[key] === contractTypeCode});
        //     console.log(r);
        // });        
        console.log(zz);
        let gender = (0, readline_sync_1.question)('Please specify the gender (M/F)?\n');
        if (checkGender(gender)) {
            console.error('Invalid input: Please specify a valid gender.');
            continue;
        }
        customerContract.gender = gender;
        let customerAge = (0, readline_sync_1.question)('How old is the customer?\n');
        if (!isNumber(customerAge)) {
            console.error('Invalid input: The customer age must be a numeric value');
            continue;
        }
        customerContract.customerAge = parseInt(customerAge);
        customerContracts.push(customerContract);
        let proceed = (0, readline_sync_1.question)('Do you wish to continue? Y/N\n');
        if (proceed.toUpperCase() == 'Y')
            continue;
        break;
    }
    customerContracts.forEach(x => {
        console.log(`Customer Gender: ${x.gender} \nCustomer contract type: ${x.contractTypeCode} - ${x.contractType}\n`);
    });
    // console.log(`Total litres of Fuel used: ${calculateTotalLitresFuel(travelDetailsList)} litres`);
    // console.log(`Total number of cars travelling together: ${calculateTotalNumberCars(travelDetailsList)}`);
    // console.log(`Average litres of fuel used: ${calculateAverageLitreFuel(travelDetailsList)} litres`);
}
function isNumber(str) {
    const maybeNum = parseInt(str);
    const isNum = !isNaN(maybeNum);
    return isNum;
}
function checkInvalidContract(str) {
    let validContractCodes = ['1', '2', '3', '4'];
    return validContractCodes.some(x => x === str);
}
function checkGender(str) {
    let validContractCodes = ['M', 'F'];
    return validContractCodes.some(x => x === str.toUpperCase());
}
let calculateTotalLitresFuel = (arr) => {
    let sum = 0;
    sum = arr.map(a => a.totalLitersFuel).reduce(function (a, b) {
        return a + b;
    });
    return sum;
};
let calculateTotalNumberCars = (arr) => {
    return arr.length;
};
let calculateAverageLitreFuel = (arr) => {
    let total = calculateTotalNumberCars(arr);
    let sum = calculateTotalLitresFuel(arr);
    return sum / total;
};
main();
//# sourceMappingURL=index.js.map