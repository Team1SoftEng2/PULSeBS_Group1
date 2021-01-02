const fs = require('fs');
const csv = require('neat-csv'); 
const to = require('await-to-js').default;
const utils = require('../utils/writer.js');
const User = require('../components/user')

module.exports.readCSV = async function (path) {
    let file = fs.readFileSync(path);
    let [err, data] = await to(csv(file));
    if(err) console.log(err);
    else console.log(data.length);
}

module.exports.parseStudentCSV = async function (req, res) {
    // console.log(req.file);
    // let path = __dirname + '/../uploads/' + req.file.orignalname;
    let path = req.file.path;
    let file = fs.readFileSync(path);
    
    // Coverting from CSV to JSON
    let [err, data] = await to(csv(file));
    if(err) {
        fs.unlinkSync(path);
        utils.writeJson(res, {errors: [{'param': 'Server', 'msg': err}]}, 500);
    }
    fs.unlinkSync(path);

    // Insert the students into the DB
    Promise.allSettled(data.map((row) => addStudent(new User('s' + row.Id, row.Name, row.Surname, row.OfficialEmail))))
        .then((result) => {
            console.log(result);
            let fulfilled = result.filter( (r) => r.status === 'fulfilled');
            if(fulfilled.length === 0)
                // if no student added to the DB returns error
                utils.writeJson(res, {errors: [{'param': 'Server', 'msg': 'No student added'}]}, 500);
            else
                // if at least one student added to the DB returns the number of added students
                utils.writeJson(res, {added: fulfilled.length}, 201);
        });
}

function addStudent(student) {
    return new Promise((resolve, reject) => {
        // Dispari => resolve, Pari => reject
        if(student.name === 'Durante') reject();
        else resolve();
    });
}