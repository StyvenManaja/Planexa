const app = require('./app');
const db = require('./src/config/db');

const PORT = process.env.PORT || 4000;

//connection à la base de donnée
db.connectToDB();

app.listen(PORT, () => {
    console.log(`Server launched at port: ${PORT}.`);
})