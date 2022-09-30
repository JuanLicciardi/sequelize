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
    }

}