import {question} from 'readline-sync';

class CustomerContracts
{
    gender:string;
    contractTypeCode:number;
    contractType:string;
    monthlyCost:number;
    customerAge:number;
}

function main(): void
{        
    let customerContracts = [];

    const contractTypeList: {contractTypeCode: number, contractType: string, monthlyCost: number}[] = [
        {"contractTypeCode": 1, "contractType": "CHAT 100", "monthlyCost": 125},
        {"contractTypeCode": 2, "contractType": "CHAT 200", "monthlyCost": 230},
        {"contractTypeCode": 3, "contractType": "SUNDAY FREE", "monthlyCost": 185},
        {"contractTypeCode": 4, "contractType": "MIDNIGHT PLUS", "monthlyCost": 200},
        ];

    const reduction = 25;

    let complete: boolean = false;
    while (!complete) {
        let customerContract:CustomerContracts = {} as CustomerContracts;

        let contractTypeCode: string = question('Please enter the contract type code (1,2,3 OR 4):\n');
        if(!isNumber(contractTypeCode) || !checkInvalidContract(contractTypeCode))
        {
            console.error('Invalid input: Please enter a valid contract type.');
            continue;
        }
        customerContract.contractTypeCode = parseInt(contractTypeCode);
        contractTypeList.forEach(x => {
            if(x.contractTypeCode === parseInt(contractTypeCode))
            {
                customerContract.contractType = x.contractType;
                customerContract.monthlyCost = x.monthlyCost;
            }
        });        

        let gender: string = question('Please specify the gender (M/F)?\n').toUpperCase();        
        if(!validGender(gender))
        {
            console.error('Invalid input: Please specify a valid gender.');
            continue;
        }
        customerContract.gender = gender;

        let customerAge: string = question('How old is the customer?\n');
        if(!isNumber(customerAge))
        {
            console.error('Invalid input: The customer age must be a numeric value');
            continue;
        }
        customerContract.customerAge = parseInt(customerAge);

        if(customerContract.gender === 'F' && customerContract.customerAge > 50)
        {
            customerContract.monthlyCost = customerContract.monthlyCost - reduction;
            console.log('Reduction applied!!!');
        }

        customerContracts.push(customerContract);
        
        let proceed: string = question('Do you wish to continue? Y/N\n');
        if(proceed.toUpperCase() == 'Y')
            continue;

        break;
    }

    customerContracts.forEach( x => {
        console.log(`Customer Gender: ${x.gender} \nCustomer contract type: ${x.contractTypeCode} - ${x.contractType} \nCustomer age: ${x.customerAge}\nMonthly cost: ${x.monthlyCost}\n`);
    });
    
    console.log(`Total number of males subscribed with MIDIGHT PLUS: ${getMidnightPlusMale(customerContracts)} customers`);
    console.log(`Total number of females under 30 subscribed with CHAT 200: ${getChat200FemaleUnder30(customerContracts)} customers`);
    console.log(`Total monthly costs for all new SUNDAY FREE contracts: ${getSundayFreeTotalCost(customerContracts)}`);    
}

const isNumber = (str: string) : boolean =>
{
    const maybeNum = parseInt(str);
    const isNum: boolean = !isNaN(maybeNum);
    return isNum;
}

const checkInvalidContract = (str: string) : boolean =>
{
    let validContractCodes = ['1','2','3','4'];
    return validContractCodes.some(x => x === str);
}

const validGender = (str: string) : boolean =>
{
    let validContractCodes = ['M','F'];
    return validContractCodes.some(x => x === str.toUpperCase());
}

const getMidnightPlusMale = (arr) =>
{
    let custs = 0;
    arr.forEach(x => {
        if(x.contractTypeCode === 4 && x.gender === 'M')
        {
            custs++;
        }
    });  
    
    return custs;
}

const getChat200FemaleUnder30 = (arr) =>
{
    let custs = 0;
    arr.forEach(x => {
        if(x.contractTypeCode === 2 && x.gender === 'F' && x.customerAge < 30)
        {
            custs++;
        }
    });  
    
    return custs;
}

const getSundayFreeTotalCost = (arr) =>
{
    let totalCosts = 0;
    arr.forEach(x => {
        if(x.contractTypeCode === 3)
        {
            totalCosts += x.monthlyCost;
        }
    });  
    
    return totalCosts;
}

main();