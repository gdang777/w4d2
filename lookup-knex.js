const pg = require("pg");
const settings = require("./settings");

var knex = require('knex')({
    client: 'pg',
    connection: {
      host : settings.hostname,
      user : settings.user,
      password : settings.password,
      database : settings.database
    }
  });

// const client = new pg.Client({
//   user     : settings.user,
//   password : settings.password,
//   database : settings.database,
//   host     : settings.hostname,
//   port     : settings.port,
//   ssl      : settings.ssl  
// });
let querySearch = process.argv[2];
// let query = `SELECT * FROM famous_people WHERE first_name LIKE '${querySearch}'`;
function printResult(results){
    results.forEach(function(result, i){
      console.log(`- ${i+1}  : ${result.first_name} ${result.last_name} , born '${result.birthdate.toISOString().split('T')[0]}'`);  
    })
}

knex.select('*').from("famous_people").where('first_name', 'like', `${querySearch}%`)
.asCallback((err, rows) => {
    if(err) {
      return console.error("error running query", err);
    }
    console.log("SEARCHING....");
     printResult(rows);
    knex.destroy();
  });
// client.connect((err) =>{
//   if (err) {
//     return console.error("Connection error", err);
//   }
//   client.query(query, (err, result) => {
//     if(err) {
//       return console.error("error running query", err);
//     }
//     console.log("SEARCHING....");
//      printResult(result.rows);
//     knex.destroy();
//   });
// });

