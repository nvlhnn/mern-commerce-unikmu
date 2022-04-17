/* eslint-disable no-undef */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const axios = require("axios");
const Product = require("../models/product");
const Color = require("../models/color");
const Category = require("../models/category");
// const { off } = require("../models/product");

dotenv.config({ path: "../.env" });

mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((e) => console.log(e));

const handleCategory = (categories, item) => {
  let uniseks = {
    id: categories[0].id,
    slug: categories[0].slug,
  };

  let category = categories.find((cat) => {
    return cat.name.toUpperCase() === item.genderName.toUpperCase();
  });

  if (category) {
    category = {
      id: category.id,
      slug: category.slug,
    };
  } else if (category == undefined && item.genderName === "Uniseks") {
    category = uniseks;
  }

  return category;
};

function hasDuplicates(products) {
  let array = products.map((a) => a.name);
  var valuesSoFar = Object.create(null);
  for (var i = 0; i < array.length; ++i) {
    var value = array[i];
    if (value in valuesSoFar) {
      // products.splice(i, 1);

      products[i].name =
        products[i].name + " - " + Math.random().toString(36).substr(2, 5);
      products[i].slug =
        products[i].slug + "-" + Math.random().toString(36).substr(2, 5);
      // hasDuplicates(products);
    }
    valuesSoFar[value] = true;
  }
  return products;
}

const getColor = async () => {
  const colors = await Color.find(null, null, {
    name: 1,
    hex: 1,
  });

  return colors;
};

const getCategories = async () => {
  const categories = await Category.find(null, null, {
    name: 1,
  });

  return categories;
};

const handleData = (colors, item) => {
  let data = [];
  let itemColors = item.colors.map((a) => {
    return { name: a.name, code: a.displayCode };
  });

  for (let i = 0; i < itemColors.length; i++) {
    let index = colors.findIndex((c) => {
      return c.name.toUpperCase() === itemColors[i].name.toUpperCase();
    });

    let imgIdx = item.images.main.findIndex((a) => {
      return a.colorCode == itemColors[i].code;
    });

    // console.log(img);

    let stocks = [];
    item.sizes.forEach((a) => {
      stocks.push({
        size: a.name.toLowerCase(),
        stock: Math.floor(Math.random() * 20),
      });
    });

    if (index >= 0) {
      data.push({
        code: Math.random().toString(36).substr(2, 5),
        img: item.images.main[imgIdx].url,
        hex: colors[index].hex,
        colorId: colors[index]._id,
        stocks: stocks,
      });
    }
  }

  // console.log("===========================");
  return data;
};

const seeding = async () => {
  try {
    const colors = await getColor();
    const categories = await getCategories();

    const uniqloData = await axios
      .get(
        "https://www.uniqlo.com/id/api/commerce/v3/id/products?sort=1&offset=0&limit=500"
      )
      .then((res) => res.data.result.items);

    let products = [];
    let counter = 0;
    uniqloData.forEach((item) => {
      let category = handleCategory(categories, item);
      let images = [];
      let slug = item.name.replace(/\s+/g, "-").toLowerCase();
      let data = handleData(colors, item);

      item.images.sub.forEach((img) => {
        images.push(img.url);
      });

      let product = {
        name: item.name,
        desc: item.shortDescription
          ? item.shortDescription
          : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, nobis.",
        slug: slug,
        category: category,
        price: item.prices.base.value,
        images: images,
        data: data,
      };

      console.log(product.data.length);
      if (product.data.length > 0) {
        counter++;
        products.push(product);
      }
    });

    hasDuplicates(products);

    console.log(counter);
    return products;
  } catch (error) {
    console.log(error);
  }
};

const seedDB = async () => {
  const products = await seeding();
  console.log(products.map((a) => a.slug));
  await Product.deleteMany({});
  await Product.insertMany(products);
};

seedDB().then(() => {
  mongoose.connection.close();
});
