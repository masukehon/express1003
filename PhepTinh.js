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

// module.exports = {PhepTinh:PhepTinh};
//tương đương với bên dưới
module.exports = { PhepTinh };