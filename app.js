//app.js

'use strict'

var file = require('file-system');
var fs = require('fs');

let out = {};
for(let p = 1; p<6; p++){
    fs.readFile('../trend_p'+ p +'.js', 'utf8', function (err, text) {
        let str = [];
        let data = {};
        str.push( p+"_year");
        str.push( p+"_mon");
        str.push( p+"_day");
        str.push( p+"_hour");
        str.push( p+"_min");
        str.push( p+"_ch1");
        str.push( p+"_ch2");
        str.push( p+"_ch3");
        str.push( p+"_ch4");
        for(let i = 0; i<str.length; i++){
            let start = text.indexOf( str[i] );
            let end = text.slice(start).search(/(,|;)/) + start;
            let tmp  = text.slice( start + str[i].length + 4 , end );
            data = Object.assign(data, {[str[i]]: parseFloat(tmp)});
        }
        out = Object.assign(out, {['trend_p'+p]: data});
    });
}

fs.readFile('../data_ai.js', 'utf8', function (err, text) {
    let str = []
    str.push("ai_per");
    for(let i = 0; i<str.length; i++){
        let start = text.indexOf( str[i] );
        let end = text.indexOf(";", start);
        let ai = text.slice( start + str[i].length + 4 , end-1 );
        ai = ai.replace(/"/g,'');
        ai = ai.split(',');
        console.log(str[i], ai);
        out = Object.assign(out,{ai:ai});
        console.log('out',out);

        var toString = Object.prototype.toString

  console.log('flskdjflskdjf',out['trend_p1']['1_ch1'])
  console.log('type',toString.call(out['trend_p1']['1_ch1']));
      const mysql = require('mysql');
  const connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'f=/JeefIo6ry',
      database : 'vems_test'
  });


  connection.connect();

        let sql = `
insert into vems_test.permin
(year, mon, day, hour, min
, p1c1, p1c2, p1c3, p1c4, p2c1, p2c2, p2c3, p2c4, p3c1, p3c2, p3c3, p3c4, p4c1, p4c2, p4c3, p4c4, p5c1, p5c2, p5c3, p5c4
, ai1, ai2, ai3, ai4, ai5, ai6, ai7, ai8, ai9, ai10, ai11, ai12, ai13, ai14, ai15 )
values
 (
  ${out['trend_p1']['1_year']},${out['trend_p1']['1_mon']},${out['trend_p1']['1_day']},${out['trend_p1']['1_hour']},${out['trend_p1']['1_min']},
  ${out['trend_p1']['1_ch1']},${out['trend_p1']['1_ch2']},${out['trend_p1']['1_ch3']},${out['trend_p1']['1_ch4']},
  ${out['trend_p2']['2_ch1']},${out['trend_p2']['2_ch2']},${out['trend_p2']['2_ch3']},${out['trend_p2']['2_ch4']},
  ${out['trend_p3']['3_ch1']},${out['trend_p3']['3_ch2']},${out['trend_p3']['3_ch3']},${out['trend_p3']['3_ch4']},
  ${out['trend_p4']['4_ch1']},${out['trend_p4']['4_ch2']},${out['trend_p4']['4_ch3']},${out['trend_p4']['4_ch4']},
  ${out['trend_p5']['5_ch1']},${out['trend_p5']['5_ch2']},${out['trend_p5']['5_ch3']},${out['trend_p5']['5_ch4']},
  ${out['ai'][0]},${out['ai'][1]},${out['ai'][2]},${out['ai'][3]},${out['ai'][4]},${out['ai'][5]},${out['ai'][6]},
  ${out['ai'][7]},${out['ai'][8]},${out['ai'][9]},${out['ai'][10]},${out['ai'][11]},${out['ai'][12]},
  ${out['ai'][13]},${out['ai'][14]})`;

  connection.query(sql, (err, rows, fields) => {
    if (err) throw err;
    console.log('test_user', rows);
  });

  connection.end();
    }
});