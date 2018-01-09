const http=require('http');
const fs=require('fs')
const url=require('url');
const querystring=require('querystring');
const server=http.createServer();
server.on('request',(req,res)=>{
    const regex=/(.js|.css|.html|\/$)|(fonts+)/;
    if(regex.test(req.url)){
        const r=fs.createReadStream('client'+(req.url=='/'?'/index.html':req.url))
        r.pipe(res)
    }
    if(req.url==='/registe'){
        registeHandle(req,res)
    }
})
server.listen(3000)
function registeHandle(req,res){
    res.setHeader('Content-Type','spplication/json');
    var total='';
    req.on('data',(data)=>{
        total+=data;
    })
    req.on('end',()=>{
        const obj=querystring.parse(total)
        username=obj.username;
        password=obj.password
        fs.readFile('user.json',(err,data)=>{
            const userArray=JSON.parse(data);
            for(let i=0;i<userArray.length;i++){
                if(username==userArray[i].username){
                    res.end(JSON.stringify({success:0,message:'用户名已存在，注册失败'}))
                    return
                }
            }
            userArray.push({username,password})
            fs.writeFile('user.json',JSON.stringify(userArray),(err)=>{
                if(err){
                    res.end(JSON.stringify({success:0,message:'系统错误，请重尝试'}))
                    return
                }else{
                    res.end(JSON.stringify({success:1,massage:'注册成功'}))
                }
            })
        })
    })
}