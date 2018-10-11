let checkAdmin = (req,res,next) => {

    if(req.user.role === 0) {
        return res.send('You do not have Admin permission')
    }

    next()
}

module.exports = { checkAdmin }