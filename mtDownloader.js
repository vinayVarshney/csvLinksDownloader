var fs = require('fs');
var csv = require('fast-csv');
var path = require('path');
var os = require('os');
var stream = fs.createReadStream('recordings.csv');
var Downloader = require('./mt-files-downloader/lib/Downloader');
var async = require('async');


    
var rec;


csv
    .fromStream(stream, { headers: ["Recording", , , , , , , ,] })
    .on("data",  function (records) {
        rec = records.Recording;
        //console.log(rec);
         download(rec);

    })


    .on("end", function () {
        console.log('Reading complete')
    });

  function download(rec) {

    var filename = rec.replace(/\//g, '');
    var filepath = path.join(os.tmpdir(), 'recording' + filename);
    var fileUrl = 'http:' + rec;

    var downloader = new Downloader();
    var dl = downloader.download(fileUrl, filepath);
        dl.start();   
        
        dl.on('error', function(dl) { console.log('error downloading = > '+dl.url) });


}