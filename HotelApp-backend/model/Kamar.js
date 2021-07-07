const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KamarSchema = new Schema({
    namaKamar: {
      type: String
    },
    harga: {
      type: Number
    },
    jenis: {
      type: String
    },
    rating: {
      type: Number,
      default: 0
    },
    deskripsi: {
        type: String,
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('kamar', KamarSchema)
