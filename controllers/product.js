const Product = require("../models/product.js");

const create = async (req, res) => {
  const product = new Product(req.body);

  try {
    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

const get = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
    }).populate({
      path: "data.colorId",
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAll = async (req, res) => {
  const match = {};
  const sort = {};
  let skip = 0;
  let limit = 12;

  if (req.query.keyword) {
    match.name = {
      $regex: req.query.keyword,
      $options: "i",
    };
  }

  if (req.query.size) {
    let sizes = req.query.size.split(",").map((a) => a.trim());
    // .map(a => new RegExp("^" + a + "$", "i"))

    // console.log(sizes)

    match["data.stocks.size"] = sizes;
    //   .replace("'", "")
    //   .replace("[", "")
    //   .replace("]", "")
    //   .split(",");
  }

  if (req.query.color) {
    let colors = req.query.color.split(",").map((a) => a.trim());
    // .map(a => new RegExp(a, "i"))

    // match.color = {
    //     $in: colors
    // }

    match["data.colorId"] = colors;
  }
  console.log(match);
  console.log(req.query.color);

  if (req.query.cat) {
    let cat = req.query.cat;
    match["category.slug"] = cat;
  }

  if (req.query.minPrice) {
    let minPrice = req.query.minPrice;
    match.price = {
      $gte: minPrice,
    };
  }

  if (req.query.maxPrice) {
    let maxPrice = req.query.maxPrice;
    if (match.price !== undefined) {
      match.price.$lte = maxPrice;
    } else {
      match.price = {
        $lte: maxPrice,
      };
    }
  }

  if (req.query.sortBy) {
    const sortVal = req.query.sortBy;
    if (sortVal == 1) {
      sort.createdAt = -1;
    } else if (sortVal == 2) {
      sort.price = 1;
    } else if (sortVal == 3) {
      sort.price = -1;
    }
  } else {
    sort.createdAt = -1;
  }

  if (req.query.skip) {
    skip = req.query.skip;
  }

  if (req.query.limit) {
    limit = req.query.limit;
  }

  console.log(req.query.size);
  try {
    // const query = await Product.collection.find(match).sort(sort);
    // const product = await query.skip(-skip).limit(-limit);
    const data = await Product.find(match)
      .sort(sort)
      .skip(+skip)
      .limit(+limit);
    const count = await Product.find(match)
      .sort(sort)
      .skip(+skip)
      .limit(+limit)
      .count();
    const totalCount = await Product.find(match).sort(sort).count();

    // const test = await Product.find(match).sort(sort);
    // console.log(test);
    res.status(200).json({ result: { data, count, totalCount } });
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

const update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const destroy = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json("data has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  create,
  get,
  getAll,
  update,
  destroy,
};
