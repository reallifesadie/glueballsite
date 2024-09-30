module.exports.run = (api,db) => {
    // Spicy INIT
    var width = 800;
    var height = 600;
    let sizethang = 10
    db.run("CREATE TABLE IF NOT EXISTS spicy (id INT, color TEXT)", (err, table) => {
        if(!err) {
            let color;
            for (let i = 0; i < height / sizethang; i++) {
                for (let j = 0; j < width / sizethang; j++) {
                    color = `#${Math.round(0xffffff * Math.random()).toString(16)}`
                    db.run('INSERT INTO spicy (id, color) VALUES (?,?)', [((i*(width/sizethang))+j), color], (err2, row) => {
                        if(err) console.error(err2);
                    });
                }
            }
            console.log(`New table 'spicy' created! (id, color) with ${(width*height/sizethang**2)} random colors populated`);
        } else console.error(err)
    });
}

module.exports.help = {
    //Todo
}