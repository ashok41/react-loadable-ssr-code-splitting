var express = require('express')
var router = express.Router()

router.post('/upload', function (req, res) {
  var uploadFile = req.files.file
  var fileName = req.files.file.name
  uploadFile.mv('upload/' + fileName,
    function (err) {
      if (err) {
        return res.status(500).send(err)
      }
    }
  );
  res.send('success');
})

module.exports = router