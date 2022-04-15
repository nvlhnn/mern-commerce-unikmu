/* eslint-disable no-undef */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/product");

dotenv.config({ path: "../.env" });

mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((e) => console.log(e));

const categories = [
  {
    id: "6225a89b61691aeabfdee143",
    slug: "pria",
  },
  {
    id: "6225a89f61691aeabfdee147",
    slug: "wanita",
  },
  {
    id: "6225a8a461691aeabfdee14b",
    slug: "anak",
  },
  {
    id: "6225a8a861691aeabfdee14f",
    slug: "bayi",
  },
];

console.log(Math.floor(Math.random() * 100));

let items = [];

for (let i = 0; i < 30; i++) {
  let name =
    "baju cardigan selendang " + Math.random().toString(36).substr(2, 5);
  let slug =
    "baju-cardigan-selendang-" + Math.random().toString(36).substr(2, 5);

  items.push({
    name: name,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, esse?",
    slug: slug,
    category: categories[Math.floor(Math.random() * 4)],
    price: Math.floor(Math.random() * 100).toString() + "000",
    images: [
      "https://picsum.photos/id/45/640",
      "https://picsum.photos/id/86/640",
      "https://picsum.photos/id/145/640",
    ],
    data: [
      {
        code: Math.random().toString(36).substr(2, 5),
        img: "https://picsum.photos/id/165/640",
        hex: "#121826",
        colorId: "6225abac8e68aeea7870c9cb",
        stocks: [
          {
            size: "s",
            stock: "4",
          },
          {
            size: "m",
            stock: "8",
          },
          {
            size: "xl",
            stock: "3",
          },
        ],
      },
    ],
  });
}

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(items);
};

seedDB().then(() => {
  mongoose.connection.close();
});
