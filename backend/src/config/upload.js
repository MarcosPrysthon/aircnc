//lendo o formato da requisição com o multer

const multer = require('multer');
const path = require('path');

//fazendo o armazenamento do arquivo

//a função de callback 
//constroi o nome do arquivo

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            //pegando a extensao do arquivo e o nome base
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);

            cb(null, `${name}-${Date.now()}${ext}`);
        }
    }),
};