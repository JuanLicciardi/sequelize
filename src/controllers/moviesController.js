const {validationResult, body} = require ('express-validator')

const db = require('../database/models')
const sequelize = db.sequelize;
const moment = require('moment');

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
                res.render('newestMovies', {
                    movies,
                    moment: moment
                });
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
        db.Movie.findByPk(req.params.id,{
            include : [
                {
                    association :'genre'
                },
                {
                    association : 'actors'
                }
            ]
        })
            .then(movie => {
                    res.render('moviesDetail',{
                    movie,
                    moment : moment
            })})
            .catch(error => console.log(error))
    },

    //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        // TODO 
        db.Genre.findAll({
            order : ['name']
        })
            .then(genres => res.render('moviesAdd',{
                genres
            }))
            .catch(error => console.log(error))  
    },

    create: function (req, res) {
        const errors = validationResult(req)
        const {title,release_date, rating,awards,genre_id,length} = req.body
        
        const genres = db.Genre.findAll();

        if(errors.isEmpty()) {
            db.Movie.create({
                ...req.body,
                title:title.trim(),
            })
            .then(movie => {
                console.log(movie)
                return res.redirect('/movies/detail/' + movie.id)
            })
            .catch(error => console.log(error))
  
        } else {
            return res.render('moviesAdd', {
                errors:errors.mapped(),
                genres
            })
        }
    },

    edit: function(req, res) {
        let genres = db.Genre.findAll({
            order : ['name']
        });

        let movie = db.Movie.findByPk(req.params.id);

        Promise.all([genres,movie])
        .then(([genres,movie]) => {
            res.render('moviesEdit',{
                genres,
                Movie:movie,
                moment : moment
            });
        })
        .catch((error) => console.log(error))
        
    },
    update: function (req,res) {
        db.Movie.update(
            {
                ...req.body,
                title : req.body.title.trim()
            },
            {
                where : {id:req.params.id}
            }
        )
        .then (result => {
            console.log(result)
            return res.redirect('/movies/detail/' + req.params.id)
        })
        .catch(error => console.log(error))
        
    },
    delete: function (req, res) {
       db.Movie.findByPk(req.params.id)
        .then(movie => {
            res.render('moviesDelete',{
            Movie:movie
        })})
        .catch(error => console.log(error))
    },
    destroy: function (req, res) {
        db.Movie.destroy({
            where : {
                id : req.params.id
            }
        })
        .then (result => {
            console.log(result)
            return res.redirect('/movies')
        })
        .catch(error => console.log(error))
    }
}