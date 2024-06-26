module.exports = (db, type) => {
    return db.define("moderators", {
        moderatorID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: type.STRING,
            allowNull: false
        },
        password: {
            type: type.TEXT,
            allowNull: false
        },
        img: {
            type: type.TEXT,
            allowNUll: true,
            defaultValue: "https://res.cloudinary.com/duagfqdca/image/upload/v1719042316/default_photo_bi2sce.jpg"
        },
        imgName: {
            type: type.TEXT,
            allowNUll: true
        },
        role: {
            type: type.STRING,
            defaultValue: 'moderator',
            readOnly: true
        }
    },{
        timestamps: false 
    })
}