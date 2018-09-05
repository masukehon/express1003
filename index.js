const express = require("express");
// require("express") theo mình nghĩ sẽ export 1 function

// const phepTinh = require("PhepTinh");
//nếu gán như ở trên nó sẽ hiểu là PhepTinh nằm trong node_modules

// const PhepTinh = require("./PhepTinh").PhepTinh;
//tương đương với bên dưới
const { PhepTinh } = require("./PhepTinh");

const reload = require("reload");
const { Singer, singers } = require("./singer");
const parser = require("body-parser").urlencoded({ extended: false });
//post kiểu bình thường dùng urlencoded({ extended: false })


//chạy function express() và sẽ trả về cho app 1 kiểu dữ liệu gì đó. 
//và thằng app mới truy xuất được thuộc tính
const app = express();

//biến global. hoặc có thể dùng middleware để truyền biến đi 
//tất cả các trang (nhưng phức tạp)
app.locals.x = 1000;

app.set('view engine', 'ejs');

//middleware function tương tự middleware trong laravel
// app.use(function(req, res, next) {
//     req.user = "Kha";

//     //res.send("test");ko nên send ở đây. 
//     // 1: vì nó tương tự return. trả về thì dừng luôn
//     // 2: nếu hàm chuyển tiếp tiếp theo tiếp tục dùng hàm send thì sẽ lỗi
//     next();
// });

app.use(parser);
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

// app.get('/testImage', (req, res) => {

//     res.send(`<img src="a.jpg" />`);
// });

//app.use(express.static("public")) nhờ hàm static này
//với route đó nó sẽ kiểm tra trong public xem có file đó không
//nếu có thì sẽ trả về file đó
//không thì sẽ res.send("X");
// app.get('/a.jpg', (req, res) => {
//     res.send("X");
// });

app.get('/', (req, res) => {
    // res.sendFile(__dirname + "/views/index.html");
    const arrWords = [
        { _id: "abcd1", en: "One", vn: "Mot", isMemorized: true },
        { _id: "abcd2", en: "Two", vn: "Hai", isMemorized: false },
        { _id: "abcd3", en: "Three", vn: "Ba", isMemorized: false },
        { _id: "abcd4", en: "Four", vn: "Bon", isMemorized: true }
    ];
    res.render('main', { arrWords });
});

app.get('/singer', (req, res) => {
    res.render('singer', { singers });
});

app.get('/singer/add', (req, res) => {
    res.render('add');
});

app.post('/singer/add', (req, res) => {
    const { name, image, link } = req.body;
    let sger = new Singer(name, image, link);
    singers.push(sger);
    res.send('them thanh cong');
});

app.get('/singer/update/:id', (req, res) => {
    const { id } = req.params;
    const index = singers.findIndex(x => x.id == +id);
    if (index != -1) {
        const sger = singers.find((x, indx) => indx == index);
        res.render('update', { id: sger.id, name: sger.name, image: sger.image, link: sger.link });
        //hoặc có thể truyền như thế này
        // res.render('update', sger );
        //sger là đối tượng. chứa id, name, image, link
        //có thể hiểu như này: { id: sger.id, name: sger.name, image: sger.image, link: sger.link }
        //và hoàn toàn giống dòng trên
    } else {
        res.send('Khong tim thay ca si!');
    }
});

app.post('/singer/update/:id', (req, res) => {
    const { id, name, image, link } = req.body;
    const index = singers.findIndex(x => x.id == +id);
    if (index != -1) {
        var sger = singers.find((x, indx) => indx == index);
        sger.name = name;
        sger.link = link;
        sger.image = image;

        res.redirect('/singer');
    } else {
        res.send('Khong tim thay ca si!');
    }
});

app.get('/singer/remove/:id', (req, res) => {
    const { id } = req.params;
    const index = singers.findIndex(x => x.id == +id);
    if (index != -1) {
        singers.splice(index, 1);
        res.redirect('/singer');

    } else {
        res.render('remove', { message: "Ca si nay khong hop le!" });
    }
});


app.listen(3000, () => console.log("Server started !!!"));
reload(app);