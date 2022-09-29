module.exports = (sequelize, dataTypes) => {

    const alias = "Genre";
    const cols = {

    }
    const config = {
        tableName : 'genres',
        timestamps: true,
        underscored: true
   
    }
    const Genre = sequelize.define(alias, cols, config)
    
    return Genre
}