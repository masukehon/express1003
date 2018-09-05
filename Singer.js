class Singer {
    constructor(name, image, link) {
        this.id = Math.round(Math.random() * 10000);
        this.name = name;
        this.image = image;
        this.link = link;
    }
}

const singers = [
    new Singer("Duc Phuc", "duc-phuc.jpg", "dsalkfjlasdfjk"),
    new Singer("Lan Anh", "nguyen-lan-anh.jpg", "dsalkfdfsasdfjk"),
    new Singer("Gai Xinh", "gai-xinh.jpg", "dsalkfsdflasdfjk")
];

module.exports = { Singer, singers };