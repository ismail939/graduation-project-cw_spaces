const Sequelize = require('sequelize')
const db = require('../config/database')

const BookModel = require('./Book')
const ClientModel = require("./Client")
const Cw_spaceModel = require("./Cw_space")
const Cw_spacePhotoModel = require("./Cw_spacePhoto")
const EventModel = require("./Event")
const ModeratorModel = require("./Moderator");
const OfferModel = require("./Offer");
const OwnerModel = require("./Owner")
const RegisterModel = require("./Register");
const RequestModel = require("./Request"); 
const ReviewModel = require("./Review")
const RoomModel = require("./Room")
const FavouriteModel = require('./Favourite')



// create model
const Book = BookModel(db, Sequelize)
const Client = ClientModel(db, Sequelize)
const Cw_space = Cw_spaceModel(db, Sequelize)
const Cw_spacePhoto = Cw_spacePhotoModel(db, Sequelize);
const Event = EventModel(db, Sequelize)
const Moderator = ModeratorModel(db, Sequelize);
const Offer = OfferModel(db, Sequelize);
const Owner = OwnerModel(db, Sequelize)
const Register = RegisterModel(db, Sequelize)
const Request = RequestModel(db, Sequelize)
const Review = ReviewModel(db, Sequelize)
const Room = RoomModel(db, Sequelize)
const Favourite = FavouriteModel(db, Sequelize)

// relationship
// owner & cw-space (1 -> 1)
Owner.belongsTo(Cw_space)
Cw_space.belongsTo(Owner) 

// client & room (many -> many) through book
Client.belongsToMany(Room, { through: {model: Book, unique: false}, as : "client1" })
Room.belongsToMany(Client, { through: {model: Book, unique: false}, as: "room1" });

// client & cw-space (many -> many) through review
Client.belongsToMany(Cw_space, { through: Review, as: "client2" }); 
Cw_space.belongsToMany(Client, { through: Review, as: "cwSpace1" });

// client & cw-space (many -> many) through Favourite
Client.belongsToMany(Cw_space, { through: Favourite, as: "client3" }); 
Cw_space.belongsToMany(Client, { through: Favourite, as: "cwSpace2" });

// client & room (many -> many) through request 
Client.belongsToMany(Room, { through: {model: Request, unique: false}, as : "client4" })
Room.belongsToMany(Client, { through: {model: Request, unique: false}, as: "room2" });

// client & room (many -> many) through book
Client.belongsToMany(Event, { through: {model: Register, unique: false}, as : "client5" })
Event.belongsToMany(Client, { through: {model: Register, unique: false}, as: "register1" });

// cw-space & room (1 -> many)
Cw_space.hasMany(Room)
Room.belongsTo(Cw_space)

// cw-space & cw-space photos (1-> many)
Cw_space.hasMany(Cw_spacePhoto)
Cw_spacePhoto.belongsTo(Cw_space)

// cw-space & cw-space photos (1-> many)
Cw_space.hasMany(Moderator)
Moderator.belongsTo(Cw_space)

// cw-space & event (1 -> many)
Cw_space.hasMany(Event)
Event.belongsTo(Cw_space)

// cw-space & offer (1 -> many)
Cw_space.hasMany(Offer)
Offer.belongsTo(Cw_space)





/// generate tables
db.sync({force: false}).then(()=>{
    console.log('Tables created')
})

module.exports = {
    Book,
    Client,
    Cw_space,
    Cw_spacePhoto,
    Event,
    Moderator,
    Offer,
    Owner,
    Review,
    Room,
    Request,
    Favourite
}