export class Product {
    // _name, _price, _screen, _backCamera, _frontCamera, _img, _desc, _type
    constructor(body) {
        this.name = body.name;
        this.price = body.price;
        this.screen = body.screen;
        this.backCamera = body.backCamera;
        this.frontCamera = body.frontCamera;
        this.img = body.img;
        this.desc = body.desc;
        this.type = body.type;
    }
}