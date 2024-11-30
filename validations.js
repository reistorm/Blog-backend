import { body } from 'express-validator';

export const loginValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 8 символов').isLength({ min: 8 }),
];

export const registerValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 8 символов').isLength({ min: 8 }),
    body('fullName', 'Не указано имя').isLength({ min: 3 }),
    body('avatarUrl', 'Неверная ссылка на аватар').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3}).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 3}).isString(),
    body('tags', 'Введен неверный формат тегов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),

];