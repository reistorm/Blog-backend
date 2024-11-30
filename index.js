import express from 'express';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';
import { registerValidator, loginValidator, postCreateValidation } from './validations.js'
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { PostController, UserController } from './controllers/index.js'


mongoose
    .connect('mongodb+srv://Elistorm:Frika96ya.@cluster0.er0ir.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
    // путь файла
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    // имя файла
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({ storage});

app.use(express.json());
app.use(cors());
// get-запрос статичного файла
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidator, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidator, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});
app.get('/tags', PostController.getLastTags);

app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
// только авторизованные пользователи
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);



app.get('/')


app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('server ok');
});