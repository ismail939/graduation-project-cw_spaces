module.exports = (db, type) => {
    return db.define('clients', {
        clientID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fname: {
            type: type.STRING,
            allowNull: false 
        },
        lname: {
            type: type.STRING,
            allowNull: false
        },
        username: {
            type: type.STRING,
            allowNull: false
        },
        email: {
            type: type.STRING,
            allowNull: false
        },
        password: {
            type: type.TEXT,
            allowNull: false
        },
        img: {
            type: type.TEXT,
            allowNUll: true
        },
        imgName: {
            type: type.TEXT,
            allowNUll: true
        },
        phone: {
            type: type.TEXT,
            allowNull: false
        },
        role: {
            type: type.STRING,
            defaultValue: 'client',
            readOnly: true
        },
        verified: {
            type: type.BOOLEAN,
            allowNUll: false,
            defaultValue: false
        },
        verificationCode: {
            type: type.STRING,
            allowNUll: true
        }
    }, {
        timestamps: false
    })
}