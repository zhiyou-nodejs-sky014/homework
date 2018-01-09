const http=require('http');
const fs=require('fs')
const url=require('url');
const querystring=require('querystring');
const server=http.createServer();
server.on('request',(req,res)=>{
    const regex=/.js|.css|.html|\/$/;
    if(regex.test(req.url)){
        const r=fs.createReadStream('client'+(req.url=='/'?'/index.html':req.url))
        r.pipe(res)
    }
})
server.listen(3000)
