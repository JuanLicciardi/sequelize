module.exports = (sequelize,dataTypes) => {

    const alias = "Actor";
    const cols = {};
    const config = {};
    
    const Actor = sequelize.define(alias,cols,config)
    return Actor
}