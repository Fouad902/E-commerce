const mongoose = require('mongoose')

const dbConnect = () => {
    try{
        const conn = mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connection successfully")
    }catch(err){
        console.log('Error in database')
    }
}

module.exports = dbConnect