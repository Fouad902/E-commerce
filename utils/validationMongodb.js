const mongoose = require('mongoose');
const validationMongoDbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) {
        throw new Error("This id is not a valid or not found")
    }
}
module.exports = validationMongoDbId