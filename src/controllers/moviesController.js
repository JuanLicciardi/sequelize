const db = require('../database/models')

module.exports={

    list:(req,res) =>{
       
        db.Movie.findAll()
            .then((movies) => {
                return res.render('moviesList',{
                    movies
                })
            })
            .catch(error => console.log(error))
    },

    new:(req,res) =>{
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },

    recommended:(req,res) =>{
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },

   detail:(req,res) =>{
        db.Movie.findByPk(req.params.id)
            .then(movie => res.render('moviesDetail',{movie}))
            .catch(error => console.log(error))
    },

    //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        // TODO   
    },
    create: function (req, res) {
        // TODO
    },
    edit: function(req, res) {
        // TODO
    },
    update: function (req,res) {
        // TODO
    },
    delete: function (req, res) {
        // TODO
    },
    destroy: function (req, res) {
        // TODO
    }

}