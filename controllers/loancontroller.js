const LoanScheme = require('../models/loanscheme')


const getallschemes = async (req, res) => {
    try {
        const { purpose, minAmount, maxAmount } = req.query

        let filter = {}

        if (purpose) filter.purpose = purpose
        if (minAmount) filter.minAmount = { $gte: Number(minAmount) }
        if (maxAmount) filter.maxAmount = { $lte: Number(maxAmount) }

        const schemes = await LoanScheme.find(filter)

        res.status(200).json({
            count: schemes.length,
            schemes
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const getschemebyid = async (req, res) => {
    try {
        const scheme = await LoanScheme.findById(req.params.id)

        if (!scheme) {
            return res.status(404).json({ message: 'Scheme not found' })
        }

        res.status(200).json(scheme)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// POST search schemes
const searchSchemes = async (req, res) => {
    try {
        const { purpose, amount } = req.body

        const matchingSchemes = await LoanScheme.find({
            purpose: purpose,
            minAmount: { $lte: amount },
            maxAmount: { $gte: amount }
        })

        if (matchingSchemes.length === 0) {
            return res.status(404).json({
                message: 'No schemes found for your criteria'
            })
        }

        res.status(200).json({
            count: matchingSchemes.length,
            schemes: matchingSchemes
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getallschemes, getschemebyid, searchSchemes }