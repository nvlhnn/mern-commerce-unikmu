const Cart = require("../models/cart.js");
const Product = require("../models/product.js");

// add product to cart
const add = async (req, res) => {
  const userId = req.user.id;
  const productId = req.body.productId;
  const code = req.body.code;
  const size = req.body.size;
  const qty = req.body.qty;

  try {
    let cart = await Cart.findOne({
      user: userId,
    });

    if (!cart)
      cart = await new Cart({
        user: userId,
      });

    const product = await Product.findById(productId);
    const productIndex = await cart.products.findIndex(
      (a) => a.productId == product.id && a.code == code && a.size == size
    );

    if (productIndex > -1) {
      cart.products[productIndex].qty += qty;
      cart.totalQty += qty;
    } else {
      cart.products.push(req.body);
      cart.totalQty += qty;
    }

    const savedCart = await cart.save();
    res.status(200).json(savedCart);

    // res.status(200).json('ok');
  } catch (err) {
    res.status(500).json(err);
  }
};

const get = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate({
      path: "products.productId",
      populate: {
        path: "data.colorId",
      },
    });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

// const getAll = async (req, res) => {

//     try {
//         const category = await Category.find(null, null, {
//             name: 1
//         })

//         res.status(200).json(category)

//     } catch (error) {
//         res.status(500).json(error)

//     }
// }

const update = async (req, res) => {
  const userId = req.user.id;
  const productId = req.body.productId;
  const code = req.body.code;
  const size = req.body.size;

  try {
    let cart = await Cart.findOne({
      user: userId,
    });

    let productIndex = cart.products.findIndex(
      (a) => a.productId == productId && a.code == code && a.size == size
    );

    const oldQty = cart.products[productIndex].qty;
    const newQty = +req.body.qty;
    const newTotalQty = +cart.totalQty - oldQty + newQty;

    console.log(oldQty, newQty, newQty);
    let savedCart;

    if (newQty < 1) {
      if (newTotalQty < 1) {
        await Cart.findByIdAndDelete(cart.id);
        return res.status(200).json("cart has been deleted");
      }

      await Cart.updateOne(
        {
          id: cart.id,
        },
        {
          $pull: {
            products: {
              $and: [
                {
                  productId: productId,
                },
                {
                  size: size,
                },
                {
                  code: code,
                },
              ],
            },
          },
        }
      );

      cart = await Cart.findById(cart.id);
      cart.totalQty = newTotalQty;

      savedCart = await cart.save();
    } else {
      cart.products[productIndex].qty = req.body.qty;
      cart.totalQty = newTotalQty;

      savedCart = await cart.save();
    }

    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

const destroy = async (req, res) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const cart = await Cart.findOneAndDelete({
      user: req.user.id,
    });

    res.status(200).json("data has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

const destroyProduct = async (req, res) => {
  const productId = req.params.productId;
  const code = req.params.code;
  const size = req.params.size;

  console.log(req);
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    });
    const productIndex = cart.products.findIndex(
      (a) => a.productId == productId && a.size == size && a.code == code
    );

    if (cart.products.length == 1 && productIndex > -1) {
      await Cart.findByIdAndDelete(cart.id);
      return res.status(200).json("cart has been deleted");
    } else {
      // console.log(productIndex)
      cart.totalQty = cart.totalQty - cart.products[productIndex].qty;
      await cart.save();

      await Cart.updateOne(
        {
          user: req.user.id,
        },
        {
          $pull: {
            products: {
              $and: [
                {
                  productId: productId,
                },
                {
                  size: size,
                },
                {
                  code: code,
                },
              ],
            },
          },
        }
      );
      return res.status(200).json("product has been removed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  add,
  get,
  update,
  destroyProduct,
  destroy,
};
