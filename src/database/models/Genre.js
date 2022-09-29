module.exports = (sequelize,dataTypes) => {

    const alias = "Genre";
    const cols = {};
    const config = {};
    
    const Genre = sequelize.define(alias,cols,config)
    return Genre
}