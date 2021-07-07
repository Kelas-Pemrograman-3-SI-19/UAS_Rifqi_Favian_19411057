const kamarModel = require('../model/Kamar')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')

exports.insertKamar = (data) =>
  new Promise((resolve, reject) => {
    kamarModel.create(data)
    .then(() => resolve(requestResponse.sukses('Berhasil Input Kamar')))
    .catch(() => reject(requestResponse.serverError))
  })

exports.getAllKamar = () =>
  new Promise((resolve, reject) => {
    kamarModel.find({})
     .then(kamar => resolve(requestResponse.suksesWithData(kamar)))
     .catch(error => reject(requestResponse.serverError))
  })

exports.getById = (id) =>
  new Promise((resolve, reject) => {
    kamarModel.findOne
    ({_id: objectId(id)})
    .then(kamar => resolve(requestResponse.suksesWithData(kamar)))
    .catch(error => reject(requestResponse.serverError))
  })

exports.edit = (data, id, changeImage) =>
  new Promise((resolve, reject) => {
    kamarModel.updateOne({
      _id: objectId(id)
    }, data)
      .then(() => {
        if (changeImage) {
          deleteImage(data.oldImage)
        }
        resolve(requestResponse.sukses('Berhasil Edit Data Kamar'))
      }).catch(() => reject(requestResponse.serverError))
  })

exports.delete = (id) =>
  new Promise((resolve, reject) =>{
    kamarModel.findOne({
      _id: objectId(id)
    }).then(kamar => {
      kamarModel.deleteOne({
        _id: objectId(id)
      }).then(() => {
        deleteImage(kamar.image)
        resolve(requestResponse.sukses('Berhasil Hapus Data Kamar'))
      }).catch(() => reject(requestResponse.serverError))
    })
  })
