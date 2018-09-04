const express = require("express");

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

class PhepTinh {
    constructor(tenPhepTinh, soA, soB) {
        this.tenPhepTinh = tenPhepTinh;
        this.soA = soA;
        this.soB = soB;
    }

    getSign() {
        const { tenPhepTinh } = this;
        if (tenPhepTinh === "CONG") return "+";
        if (tenPhepTinh === "TRU") return "-";
        if (tenPhepTinh === "NHAN") return "*";
        if (tenPhepTinh === "CHIA") return "/";
        return undefined;
    }

    getResultString() {
        if (this.getSign() != undefined) {
            const { soA, soB } = this;
            let chuoiPhepTinh = `${soA} ${this.getSign()} ${soB}`;
            return `${chuoiPhepTinh} = ${eval(chuoiPhepTinh)}`;
        }
        return "Phep tinh khong hop le!";
    }
}

app.get('/tinh/:tenPhepTinh/:soA/:soB', (req, res) => {
    let soA = parseInt(req.params.soA);
    let soB = parseInt(req.params.soB);
    let tenPhepTinh = req.params.tenPhepTinh;

    let obj = new PhepTinh(tenPhepTinh, soA, soB);

    res.send(obj.getResultString());
});

app.listen(3000, () => console.log("Server started."));