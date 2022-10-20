module.exports = (sequelize, dataTypes) => {

    const alias = "Actor";
    const cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
        },
        first_name:{
            type:dataTypes.STRING(100),
            allowNull:false,
        },
        last_name:{
            type:dataTypes.STRING(100),
            allowNull:false,
        },
        rating:{
            type : dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull:false

        },
        favorite_movie_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            unique:true,
            defaultValue: null
        }

    }
    const config = {
        tableName : 'actors',
        timestamps: true,
        underscored: true
   
    }
    const Actor = sequelize.define(alias, cols, config)
    
    Actor.associate = (models) => {
        Actor.belongsToMany(models.Movie,{
            as :'movies',
            through : 'actor_movie',
            foreignkey : 'actor_id',
            otherkey : 'movie_id'
        })

    }



    return Actor
}