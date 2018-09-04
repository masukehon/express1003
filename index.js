const express = require("express");
// require("express") theo mình nghĩ sẽ export 1 function

// const phepTinh = require("PhepTinh");
//nó sẽ hiểu là PhepTinh nằm trong node_modules

// const PhepTinh = require("./PhepTinh").PhepTinh;
//tương đương với bên dưới
const { PhepTinh } = require("./PhepTinh");


//chạy function express() và sẽ trả về cho app 1 kiểu dữ liệu gì đó. 
//và thằng app mới truy xuất được thuộc tính
const app = express();

app.get('/', (req, res) => {
    res.send("Hello");
});

app.get('/a', (req, res) => {
    res.send("Ban dang o /a");
});

app.get('/b', (req, res) => {
    res.send("Ban dang o /b");
});

app.get('/chao/:name', (req, res) => {
    res.send("Chao " + req.params.name);
});

app.get('/tinh/:tenPhepTinh/:soA/:soB', (req, res) => {
    let soA = parseInt(req.params.soA);
    let soB = parseInt(req.params.soB);
    let tenPhepTinh = req.params.tenPhepTinh;

    let obj = new PhepTinh(tenPhepTinh, soA, soB);

    res.send(obj.getResultString());
});

app.listen(3000, () => console.log("Server started."));