const {check,body} = require ('express-validator');


module.exports = [
    check('title')
    .notEmpty().withMessage('El titulo es obligatorio').bail()
    .isAlpha('es-ES',{ignore: ' '}).withMessage('Debe ingresar valores alfabeticos'),
    

    check('rating')
    .notEmpty().withMessage('El Rating es obligatorio').bail()
    .isNumeric().withMessage('Debe ingresar valores alfabeticos'),

    check('awards')
    .notEmpty().withMessage('Si posee premios debe poner cantidad caso contrario 0').bail()
    .isNumeric().withMessage('Debe ingresar valores alfabeticos'),

    check('length')
    .notEmpty().withMessage('La duracion en minutos es obligatoria').bail()
    .isNumeric().withMessage('Debe ingresar valores alfabeticos'),

    check('genre_id')
    .notEmpty().withMessage('El genero es obligatorio').bail(),

    check('release_date')
    .isDate().withMessage('La fecha es obligatoria').bail(),


]
