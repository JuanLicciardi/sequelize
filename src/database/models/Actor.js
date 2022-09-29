module.exports = (sequelize, dataTypes) => {

    const alias = "Actor";
    const cols = {

    }
    const config = {
        tableName : 'actors',
        timestamps: true,
        underscored: true
   
    }
    const Actor = sequelize.define(alias, cols, config)
    
    return Actor
}