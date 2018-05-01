const pg = require("pg");
const settings = require("./settings"); // settings.json
const famousdb = require("./famous-promises")


const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function printFound(result){
    console.log("searching..");
    console.log(`Found ${result.rows.length} person(s) named `);
  result.rows.forEach((row,i) => {
    console.log(`- ${i+1}: ${row.first_name} ${row.last_name}, born '${row.birthdate.toISOString().substring(0, 10)}'`)
  });
    client.end();
}


client.connect((err) => {

    famousdb.findByFirstName(client, process.argv[2])
      .then(res => {printFound(res)})
      .catch( err =>  { console.log('Error:', err); client.end(); })




  // ([process.argv[2],(err, result)=>)
  // if (err) {
  //   return console.error("Connection Error", err);
  // }
  // client.query("SELECT * FROM famous_people where first_name = $1 or last_name = $1;", [process.argv[2]], (err, result) => {
  //   console.log("searching..")
  //   if (err) {
  //     return console.error("error running query", err);
  //   }
  //   console.log(`Found ${result.rows.length} person(s) named `)
  // result.rows.forEach((row,i) => {
  //   console.log(`- ${i+1}: ${row.first_name} ${row.last_name}, born '${row.birthdate.toISOString().substring(0, 10)}'`)
  // });
  //   client.end();
  // });
});

