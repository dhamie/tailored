/**
 * check if tbale exist, if not create
 *
 * @param {mongoose.Schema} schema Array to search from.
 * @param {string} tableName Number of where to find bla bla.
 * @throws {TypeError} in case data or num do not have the expected type
 * @returns {string} item found.
 */

const mongoose= require('mongoose');
const db = mongoose.connection


async function createDB(schema, tableName){

  const db = mongoose.connection
  const collection = await db.db.listCollections({name: tableName}, { nameOnly: true }).toArray();
    // console.log('List of all collections :: ', JSON.stringify(collection))
    if(collection.length > 0){
      try{
        //res.send('already exists')
        console.log('already exists')
        console.log(collection)
      }
  
      catch (err){
        console.log(err);
      }  
      
    }
    else{

      try{
          schema.createCollection()
        //res.send('model created')
        console.log('model created')
      }
  
      catch (err){
        console.log(err);
      }  
      
    }
}

module.exports = {
  createDB,
  conn: function() {},
};

    
// if(db){
    //   res.send('check')
    //     console.log('Connected to mongo server.');
    //     //trying to get collection names
    //     db.db.listCollections().toArray(function (err, names) {
    //         console.log(names);
    //         //res.send(names.name); // [{ name: 'dbname.myCollection' }]
    //         //module.exports.Collection = names;
    //         //db.close();
    //   })
    // }else{
    //   res.send('not connected')
    // }
    // db.db.listCollections({name: 'users'})
    // .next(function(err, collinfo) {
    //     if (collinfo) {
    //       res.send('created');
    //     } else {
    //       res.send('not created');
    //     }
    // });