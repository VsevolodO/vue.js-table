const mongoose = ('mongoose')
const Schema = mongoose.Schema

const MainSchema = new Schema({
    user_surename: {
        type: String
    },
    user_name:{
        type: String
    },
    age:{
        type: Number
    }
})


module.exports = mongoose.model('main',MainSchema)