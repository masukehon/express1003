const express = require("express");
// require("express") theo mình nghĩ sẽ export 1 function

// const phepTinh = require("PhepTinh");
//nếu gán như ở trên nó sẽ hiểu là PhepTinh nằm trong node_modules

// const PhepTinh = require("./PhepTinh").PhepTinh;
//tương đương với bên dưới
const { PhepTinh } = require("./PhepTinh");

const reload = require("reload");


//chạy function express() và sẽ trả về cho app 1 kiểu dữ liệu gì đó. 
//và thằng app mới truy xuất được thuộc tính
const app = express();

app.set('view engine', 'ejs');

//middleware function tương tự middleware trong laravel
// app.use(function(req, res, next) {
//     req.user = "Kha";

//     //res.send("test");ko nên send ở đây. 
//     // 1: vì nó tương tự return. trả về thì dừng luôn
//     // 2: nếu hàm chuyển tiếp tiếp theo tiếp tục dùng hàm send thì sẽ lỗi
//     next();
// });

//middleware function
app.use(express.static("public"));
//ví dụ: localhost:3000/a.jpg
//nó sẽ kiểm tra trong folder public đã có file này chưa
//nếu có thì nó sẽ sendFile()
//nếu không có thì nó sẽ next()

app.get('/tinh/:tenPhepTinh/:soA/:soB', (req, res) => {
    let { soA, soB } = req.params;
    let tenPhepTinh = req.params.tenPhepTinh;

    let obj = new PhepTinh(tenPhepTinh, soA, soB);

    res.send(obj.getResultString());
});

app.get('/testImage', (req, res) => {

    res.send(`<img src="a.jpg" />`);
});

//app.use(express.static("public")) nhờ hàm static này
//với route đó nó sẽ kiểm tra trong public xem có file đó không
//nếu có thì sẽ trả về file đó
//không thì sẽ res.send("X");
app.get('/a.jpg', (req, res) => {
    res.send("X");
});

app.get('/', (req, res) => {
    // res.sendFile(__dirname + "/views/index.html");
    res.render('main');
});

app.listen(3000, () => console.log("Server started !!!"));
reload(app);