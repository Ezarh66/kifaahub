// KIFAAHUB PRODUCT DATABASE

const defaultProducts = [
    {
        id: 1,
        name: "Smartwatch",
        price: 2200,
        category: "smartwatch",
        image: "images/watch.jpg"
    },
    {
        id: 2,
        name: "Wireless Earbuds",
        price: 1200,
        category: "earbuds",
        image: "images/earbuds.jpg"
    },
    {
        id: 3,
        name: "Power Bank",
        price: 2500,
        category: "powerbank",
        image: "images/powerbank.jpg"
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: 2000,
        category: "speaker",
        image: "images/speaker.jpg"
    },
    {
        id: 5,
        name: "Gaming Headphones",
        price: 3000,
        category: "gaming",
        image: "images/headphones.jpg"
    },
    {
        id: 6,
        name: "Kids Robot Toy",
        price: 2500,
        category: "robot",
        image: "images/robot.jpg"
    }
];

function getProducts() {
    const savedProducts = localStorage.getItem("kifaahubProducts");

    if (savedProducts) {
        return JSON.parse(savedProducts);
    }

    localStorage.setItem(
        "kifaahubProducts",
        JSON.stringify(defaultProducts)
    );

    return defaultProducts;
}

function saveProducts(products) {
    localStorage.setItem(
        "kifaahubProducts",
        JSON.stringify(products)
    );
}