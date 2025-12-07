const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url, { family: 4 })
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch(error => {
        console.log('error connecting to db', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Must be at least 3 characters long, got {VALUE}']
    },
    number: {
        type: String,
        minLength: 3,
        validate: {
            validator: function (v) {
                return /^(?=.{8,}$)\d{2,3}-\d+$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number`
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
