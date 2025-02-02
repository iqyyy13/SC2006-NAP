const authService = require('../model/service/authService')

const signup = async (req, res) => {
    try {
        const { username, password, email } = req.body
        const result = await authService.signup(username, password, email, req)
        res.status(201).json(result)
    } catch (error) {
        console.error('Error', error.message)
        res.status(error.code || 500).json({ error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const result = await authService.login(username, password, req)
        res.status(200).json(result)
    } catch (error) {
        console.error('Error', error.message)
        res.status(error.code || 500).json({ error: error.message })
    }
}

const sendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body
        const result = await authService.sendVerificationEmail(email, req)
        res.status(200).json(result)
    } catch (error) {
        console.error('Error', error.message)
        res.status(error.code || 500).json({ error: error.message })
    }
}

const verifyRequestAndUpdate = async (req, res) => {
    try {
        const { verificationCode, newPassword } = req.body
        const result = await authService.verifyRequestAndUpdate(verificationCode, newPassword, req)
        res.status(200).json(result)
    } catch (error) {
        console.error('Error', error.message)
        res.status(error.code || 500).json({ error: error.message })
    }
}

const logout = async (req, res) => {
    try {
        const result = await authService.logout(req)
        res.status(200).json({ message: result })
    } catch (error) {
        console.error('Error destroying session:', error.message)
        res.status(error.code || 500).json({ message: 'Logout failed' })
    }
}

module.exports = { signup, login, sendVerificationEmail, verifyRequestAndUpdate, logout }