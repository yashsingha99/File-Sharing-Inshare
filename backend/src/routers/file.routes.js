const express = require("express");
const Router = express.Router();
const {addFile, updatePassword, fetchFile, userFiles, unActiveFile} = require("../controllers/file.controller")
Router.post('/', addFile )
Router.post('/updatePassword', updatePassword )
Router.post('/fetchFile', fetchFile )
Router.post('/userFiles', userFiles )
Router.post('/unActiveFile', unActiveFile )

module.exports = Router