const homeController = require('../controller/home');
const fishController = require('../controller/fish');


const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/image/fish'); 
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    }
  });
const upload = multer({ storage: storage });

module.exports = (app) => {
    app.get('/', homeController.helloWorld);
    app.get('/fish/add-fish', fishController.addFistForm);
    app.post('/fish/add-fish', upload.single('image'), fishController.processAddFish);
    app.get('/fish/image/:id',fishController.getImage);
}