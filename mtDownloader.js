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
    var filePath = './recordings/'+filename;
    var downloadPath = path.resolve(filePath)
    var fileUrl = 'http:' + rec;

    var downloader = new Downloader();
    var dl = downloader.download(fileUrl, downloadPath);
        dl.start();   
        
        dl.on('error', function(dl) { 
            var dlUrl = dl.url;
            console.log('error downloading = > '+dl.url+' restarting download....');

            if(!dlUrl.endsWith('.wav') && !dlUrl.endsWith('Recording')){
                console.log('resuming file download => '+dlUrl);
                dl.resume();
            }
            
        });


}