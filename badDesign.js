var fs = require('fs');

var csv = require('fast-csv');

var stream = fs.createReadStream('recordings.csv');

var http = require('http');

var async = require('async');

var rec;

//to store the urls in recordings column as an array

csv
 .fromStream(stream, {headers : ["Recording", , , , , , , ,]})
 .on("data", async function(records){
    var rec = records.Recording;
    //console.log(rec);
    await download(rec);
    
})


 .on("end", function(){
     console.log('Reading complete')         
});

  async function download(rec){
    try{
        var filename = rec.replace(/\//g, '')
        
        var file = fs.createWriteStream('./recordings/recording'+filename);
        var request = await http.get("http:"+rec, function(response) {
        
            response.pipe(file);
            file.on('finish', function() {
                file.close();
                //cb();
            file.on("error", function(e){ console.error(e.message); });
            
        })
    }) 
}
    catch (e){ console.log(e.message)}
}

