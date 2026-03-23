const mongoose = require('mongoose')
const dotenv = require('dotenv')
const LoanScheme = require('./models/loanscheme')

dotenv.config()

const schemes = [
    // EDUCATION LOANS
    {
        name: 'SBI Student Loan Scheme',
        provider: 'State Bank of India',
        purpose: 'education',
        minAmount: 50000,
        maxAmount: 1500000,
        interestRate: '8.5%',
        tenure: '10 years',
        description: 'For students pursuing higher education in India. Covers tuition, hostel, books and equipment fees.'
    },
    {
        name: 'SBI Global Ed-Vantage Scheme',
        provider: 'State Bank of India',
        purpose: 'education',
        minAmount: 2000000,
        maxAmount: 15000000,
        interestRate: '10.9%',
        tenure: '15 years',
        description: 'For students pursuing full time regular courses abroad at reputed universities.'
    },
    {
        name: 'PM Vidyalaxmi Education Loan',
        provider: 'Government of India',
        purpose: 'education',
        minAmount: 50000,
        maxAmount: 1000000,
        interestRate: '7.5%',
        tenure: '10 years',
        description: 'Collateral free education loan for meritorious students admitted to top quality higher education institutions. 3% interest subvention for families with income up to 8 lakhs.'
    },
    {
        name: 'Indian Bank IBA Model Education Loan',
        provider: 'Indian Bank',
        purpose: 'education',
        minAmount: 50000,
        maxAmount: 750000,
        interestRate: '8.2%',
        tenure: '8 years',
        description: 'For students pursuing higher education within India. Covers undergraduate and postgraduate programs.'
    },
    {
        name: 'Axis Bank Education Loan',
        provider: 'Axis Bank',
        purpose: 'education',
        minAmount: 50000,
        maxAmount: 7500000,
        interestRate: '13.7%',
        tenure: '15 years',
        description: 'For students pursuing graduation or post graduation in India or abroad.'
    },
    {
        name: 'HDFC Credila Education Loan',
        provider: 'HDFC',
        purpose: 'education',
        minAmount: 100000,
        maxAmount: 15000000,
        interestRate: '9.5%',
        tenure: '12 years',
        description: 'Customised education loans for studies in India and abroad with doorstep service.'
    },

    // HOME LOANS
    {
        name: 'SBI Regular Home Loan',
        provider: 'State Bank of India',
        purpose: 'home',
        minAmount: 500000,
        maxAmount: 50000000,
        interestRate: '8.5%',
        tenure: '30 years',
        description: 'For purchase or construction of residential property. Competitive interest rates with no prepayment penalty.'
    },
    {
        name: 'HDFC Home Loan',
        provider: 'HDFC',
        purpose: 'home',
        minAmount: 500000,
        maxAmount: 100000000,
        interestRate: '8.7%',
        tenure: '30 years',
        description: 'For purchasing or constructing residential property with flexible repayment options.'
    },
    {
        name: 'PMAY Credit Linked Subsidy Scheme',
        provider: 'Government of India',
        purpose: 'home',
        minAmount: 300000,
        maxAmount: 1800000,
        interestRate: '6.5%',
        tenure: '20 years',
        description: 'Pradhan Mantri Awas Yojana scheme for economically weaker sections and low income groups. Interest subsidy of 6.5% for loan amounts up to 6 lakhs.'
    },
    {
        name: 'PNB Housing Loan',
        provider: 'Punjab National Bank',
        purpose: 'home',
        minAmount: 300000,
        maxAmount: 75000000,
        interestRate: '8.4%',
        tenure: '30 years',
        description: 'For purchase, construction or renovation of residential property at competitive rates.'
    },
    {
        name: 'LIC HFL Home Loan',
        provider: 'LIC Housing Finance',
        purpose: 'home',
        minAmount: 200000,
        maxAmount: 100000000,
        interestRate: '8.5%',
        tenure: '30 years',
        description: 'Home loans with competitive interest rates and minimal documentation from India trusted insurer.'
    },

    // BUSINESS LOANS
    {
        name: 'Mudra Shishu Loan',
        provider: 'Government of India',
        purpose: 'business',
        minAmount: 10000,
        maxAmount: 50000,
        interestRate: '1% per month',
        tenure: '5 years',
        description: 'For micro enterprises and small businesses just starting up. No collateral required under Pradhan Mantri Mudra Yojana.'
    },
    {
        name: 'Mudra Kishore Loan',
        provider: 'Government of India',
        purpose: 'business',
        minAmount: 50000,
        maxAmount: 500000,
        interestRate: '8.6%',
        tenure: '5 years',
        description: 'For small businesses looking to expand. Part of PMMY scheme with no collateral requirement.'
    },
    {
        name: 'Mudra Tarun Loan',
        provider: 'Government of India',
        purpose: 'business',
        minAmount: 500000,
        maxAmount: 1000000,
        interestRate: '9.5%',
        tenure: '5 years',
        description: 'For established micro enterprises looking to grow further under Pradhan Mantri Mudra Yojana.'
    },
    {
        name: 'SBI SME Business Loan',
        provider: 'State Bank of India',
        purpose: 'business',
        minAmount: 1000000,
        maxAmount: 50000000,
        interestRate: '10.2%',
        tenure: '10 years',
        description: 'For small and medium enterprises looking to expand operations, purchase equipment or manage working capital.'
    },
    {
        name: 'HDFC Business Loan',
        provider: 'HDFC',
        purpose: 'business',
        minAmount: 200000,
        maxAmount: 5000000,
        interestRate: '10.5%',
        tenure: '6 years',
        description: 'For established businesses looking to expand with quick disbursal and minimal documentation.'
    },
    {
        name: 'Stand Up India Scheme',
        provider: 'Government of India',
        purpose: 'business',
        minAmount: 1000000,
        maxAmount: 10000000,
        interestRate: '8.9%',
        tenure: '7 years',
        description: 'For SC/ST and women entrepreneurs to set up greenfield enterprises in manufacturing, services or trading sector.'
    },

    // VEHICLE LOANS
    {
        name: 'SBI Car Loan',
        provider: 'State Bank of India',
        purpose: 'vehicle',
        minAmount: 100000,
        maxAmount: 10000000,
        interestRate: '8.85%',
        tenure: '7 years',
        description: 'For purchase of new passenger cars, multi utility vehicles and SUVs with up to 90% financing.'
    },
    {
        name: 'HDFC Car Loan',
        provider: 'HDFC',
        purpose: 'vehicle',
        minAmount: 100000,
        maxAmount: 10000000,
        interestRate: '9.4%',
        tenure: '7 years',
        description: 'For new and used car purchases with quick approval and flexible repayment options.'
    },
    {
        name: 'SBI Two Wheeler Loan',
        provider: 'State Bank of India',
        purpose: 'vehicle',
        minAmount: 20000,
        maxAmount: 300000,
        interestRate: '14.7%',
        tenure: '3 years',
        description: 'For purchase of new two wheelers including motorcycles and scooters.'
    },
    {
        name: 'ICICI Bank Vehicle Loan',
        provider: 'ICICI Bank',
        purpose: 'vehicle',
        minAmount: 100000,
        maxAmount: 20000000,
        interestRate: '9.1%',
        tenure: '7 years',
        description: 'For purchasing new or used vehicles with competitive rates and doorstep service.'
    },

    // PERSONAL LOANS
    {
        name: 'SBI Xpress Credit Personal Loan',
        provider: 'State Bank of India',
        purpose: 'personal',
        minAmount: 25000,
        maxAmount: 3500000,
        interestRate: '11.45%',
        tenure: '6 years',
        description: 'For salaried employees for personal expenses like medical, travel, wedding or home renovation.'
    },
    {
        name: 'HDFC Personal Loan',
        provider: 'HDFC',
        purpose: 'personal',
        minAmount: 50000,
        maxAmount: 4000000,
        interestRate: '10.5%',
        tenure: '5 years',
        description: 'Quick personal loans with minimal documentation for salaried and self employed individuals.'
    },
    {
        name: 'Indian Bank Personal Loan',
        provider: 'Indian Bank',
        purpose: 'personal',
        minAmount: 50000,
        maxAmount: 2000000,
        interestRate: '10.85%',
        tenure: '7 years',
        description: 'For government and private salaried employees for medical, educational and family expenses.'
    },
    {
        name: 'ICICI Bank Personal Loan',
        provider: 'ICICI Bank',
        purpose: 'personal',
        minAmount: 50000,
        maxAmount: 5000000,
        interestRate: '10.8%',
        tenure: '6 years',
        description: 'For personal expenses like medical emergencies, travel, wedding or debt consolidation.'
    }
]

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected')

        await LoanScheme.deleteMany()
        console.log('Existing schemes deleted')

        await LoanScheme.insertMany(schemes)
        console.log(`${schemes.length} schemes seeded successfully`)

        mongoose.disconnect()
        console.log('MongoDB disconnected')

    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

seedDB()