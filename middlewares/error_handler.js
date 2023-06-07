const errorHandler = (error, req, res, next) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(error)
    }
    if (error.name === "SequelizeValidationError") {
        const message = error.errors[0].message
        res.status(400).json({ message })
    } else if (error.name === 'SequelizeForeignKeyConstraintError') {
        res.status(400).json({
            message: "You cant delete this item because it has a foreign key"
        })
    } else if (error.name === "SequelizeUniqueConstraintError") {
        const message = error.errors[0].message
        res.status(400).json({ message })
    } else if (error.name === "JsonWebTokenError") {
        res.status(401).json({
            message: "Invalid Token"
        })
    } else if (error.name === "Error : Detail not found") {
        res.status(404).json({
            message: 'Error: Product not found'
        })
    } else if (error.name === "Error : Login failed") {
        res.status(401).json({
            message: 'Email or password is wrong',
        })
    } else if (error.name === "Error : Invalid Email or Password") {
        res.status(401).json({
            message: 'Error : Invalid email or password or Invalid Token !!!'
        })
    } else if (error.name === "Error : Invalid Token") {
        res.status(401).json({
            message: "Invalid or Expired Token !!!"
        })
    } else if (error.name == "Error : Acces Denied") {
        res.status(403).json({
            message: "You don't have access to this features"
        })
    } else {
        // console.log(error)
        res.status(500).json({
            message: 'Internal server error, please try again later'
        })
    }
}

module.exports = { errorHandler }