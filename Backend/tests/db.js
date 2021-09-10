
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod = undefined;


 //Connect to the in-memory database.
//  mongod = new MongoMemoryServer({
//     instance: {
//       port: 8080, // by default choose any free port
//     }
// });

module.exports.connect = async () => {
    await mongoose.disconnect();

    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
   
    };

    await mongoose.connect(uri, mongooseOpts);
    console.log("connected (tests)")
};


// Drop database, close the connection and stop mongod.
 
module.exports.closeDatabase = async () => {
    if (mongod) {
        // await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongod.stop();
        console.log('close data base')
    }
};

// Remove all the data for all db collections.

module.exports.clearDatabase = async () => {
    if (mongod) {
        const collections = mongoose.connection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }
};