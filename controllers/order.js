const Order = require("../models/order.js");
const Cart = require("../models/cart.js");
const { generateToken } = require("../config/midtrans.js");
const moment = require("moment");

const generateMidtransToken = async (req, res) => {
  try {
    const order = new Order();
    const address = req.body.shippingAddress;
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("products.productId");

    const subTotal = cart.products
      .map((a) => a.productId.price * a.qty)
      .reduce((total, val) => total + val, 0);
    const tax = (subTotal * 10) / 100;
    const orderTotal = subTotal + tax;
    const items = cart.products.map((a) => {
      let name;
      if (a.productId.name.length > 50) {
        name = a.productId.name.substring(0, 47) + "...";
      } else {
        name = a.productId.name;
      }
      return {
        id: a.productId.id,
        price: +a.productId.price,
        quantity: +a.qty,
        name: name,
      };
    });
    console.log(items);

    items.push({
      name: "Tax",
      price: tax,
      quantity: 1,
      id: "tax-" + order._id,
    });
    console.log(items);

    let total = items
      .map((a) => a.price * a.quantity)
      .reduce((curr, tot) => curr + tot, 0);

    console.log(orderTotal, total);
    const params = {
      transaction_details: {
        order_id: order._id,
        gross_amount: orderTotal,
      },
      shipping_address: address,
      item_details: items,
      customer_details: {
        first_name: req.user.name,
        email: req.user.email,
        shipping_address: {
          first_name: req.user.name,
          email: req.user.email,
          address: address,
        },
      },
      enabled_payments: [
        "credit_card",
        "mandiri_clickpay",
        "cimb_clicks",
        "bca_klikbca",
        "bca_klikpay",
        "bri_epay",
        "echannel",
        "indosat_dompetku",
        "mandiri_ecash",
        "permata_va",
        "bca_va",
        "bni_va",
        "other_va",
        "gopay",
        "kioson",
        "indomaret",
        "gci",
        "danamon_online",
      ],
      credit_card: {
        secure: true,
        bank: "bca",
        installment: {
          required: false,
          terms: {
            bni: [3, 6, 12],
            mandiri: [3, 6, 12],
            cimb: [3],
            bca: [3, 6, 12],
            offline: [6, 12],
          },
        },
        whitelist_bins: ["48111111", "41111111"],
      },
      bca_va: {
        va_number: "12345678911",
        free_text: {
          inquiry: [
            {
              en: "text in English",
              id: "text in Bahasa Indonesia",
            },
          ],
          payment: [
            {
              en: "text in English",
              id: "text in Bahasa Indonesia",
            },
          ],
        },
      },
      bni_va: {
        va_number: "12345678",
      },
      permata_va: {
        va_number: "1234567890",
        recipient_name: "SUDARSONO",
      },
      callbacks: {
        finish: "http://localhost:3000",
      },
      expiry: {
        // start_time: "2025-12-20 18:11:08 +0700",
        unit: "minute",
        duration: 2,
      },
    };
    let token = await generateToken(params);

    const orderItems = cart.products.map((a) => {
      return {
        productId: a.productId._id,
        code: a.code,
        size: a.size,
        qty: a.qty,
        price: a.productId.price,
      };
    });
    order.cart = cart._id;
    order.user = req.user._id;
    order.address = address;
    order.status = "pending";
    order.products = orderItems;
    order.total = subTotal;
    order.tax = tax;
    order.orderTotal = orderTotal;
    order.token = token;
    order.expiredDate = moment()
      // eslint-disable-next-line no-undef
      .add(process.env.MIDTRANS_EXPIRED_TIME, "m")
      .toDate();
    await order.save();
    // await cart.remove();
    console.log(token);
    res.status(200).json({ token: token, orderId: order._id });
  } catch (error) {
    res.status(500).json(error);
  }
};

const create = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("products.productId");
    const total = cart.products.reduce(
      (total, curr) => total + curr.productId.price * curr.qty,
      0
    );

    const order = new Order({
      cart: cart.id,
      user: req.user.id,
      total: total,
      address: req.body.address,
    });

    const savedOrder = await order.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

const get = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getById = async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    const orders = await Order.findOne({
      userId: userId,
      _id: orderId,
    }).populate({
      path: "products.productId",
      populate: {
        path: "data.colorId",
      },
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAll = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

const income = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: previousMonth,
          },
        },
      },
      {
        $project: {
          month: {
            $month: "$createdAt",
          },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: {
            $sum: "$sales",
          },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};

const update = async (req, res) => {
  const status = req.body.status;
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: status,
      },
      {
        new: true,
      }
    );

    // const order = await Order.findOne(req.params.id);
    // order.status = status

    // if (status == 'approved') {
    //     const cart = await cart.findOne()
    //     order.products = cart.products

    // }

    // if (status == 'approved') {
    //     const cart = await cart.findOne(updatedOrder.cart)
    // }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

const destroy = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.orderId);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  create,
  get,
  getById,
  getAll,
  update,
  destroy,
  income,
  generateMidtransToken,
};
