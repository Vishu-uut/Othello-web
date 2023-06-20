let static= require('node-static');
// set up the http server
let http= require('http');

// assume that we are running on heroku
let port= process.env.PORT;
let directory = __dirname+'/public';

// if we aren't on heroku then we need to adjust our port and directory
if ((typeof port=='undefined') || (port===null)){
    port=8080;
    directory='./public';
}

// set up our static file web server to deliver files from the FileSystem
let file = new static.Server(directory);

let app = http.createServer(
    function(request,response){
        request.addListener('end',
            function(){
              file.serve(request,response);
            }).resume();
    }
).listen(port);

console.log('The server is running');