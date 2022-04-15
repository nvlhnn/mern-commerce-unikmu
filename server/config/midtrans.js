/* eslint-disable no-undef */
const midtransClient = require("midtrans-client");
const axios = require("axios");
// const Order = require("../models/order.js");

let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: "SB-Mid-server-ryqIOMaOzUUhJgXmreKW9X_u",
  clientKey: "SB-Mid-client-gVE4X3zaEcJZh1N2",
});

const generateToken = async (params) => {
  try {
    let transaction = await snap.createTransaction(params);
    return await transaction.token;
  } catch (error) {
    console.log(error);
  }
};

const orderRequest = (token) => {
  return axios.create({
    baseURL: process.env.BASE_URL + "orders/",
    headers: {
      Authorization: token,
    },
  });
};

const notification = async (req, res) => {
  try {
    const token = await axios
      .post(process.env.BASE_URL + "auth/login", {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASS,
      })
      .then((a) => a.data.token);

    await snap.transaction.notification(req.body).then((statusResponse) => {
      let orderId = statusResponse.order_id;
      let transactionStatus = statusResponse.transaction_status;
      let fraudStatus = statusResponse.fraud_status;

      console.log(
        `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
      );

      // Sample transactionStatus handling logic
      // eslint-disable-next-line no-unused-vars

      const update = async (status) => {
        try {
          await orderRequest(token).put(orderId, {
            status: status,
          });
          res.status(200).json("OK");
        } catch (error) {
          res.status(error.response.status).json(error.response.statusText);
        }
      };

      // const destroy = async () => {
      //   try {
      //     await Order.findByIdAndDelete(orderId);
      //     res.status(200).json("OK");
      //   } catch (error) {
      //     res.status(error.response.status).json(error.response.statusText);
      //   }
      // };

      if (transactionStatus == "capture") {
        if (fraudStatus == "challenge") {
          // TODO set transaction status on your database to 'challenge'
          // and response with 200 OK
          res.status(200).json("OK");
        } else if (fraudStatus == "accept") {
          console.log(token);
          res.status(200).json("OK");
        }
      } else if (transactionStatus == "settlement") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        update("approved");
      } else if (
        transactionStatus == "cancel" ||
        transactionStatus == "deny" ||
        transactionStatus == "expire"
      ) {
        // TODO set transaction status on your database to 'failure'
        // and response with 200 OK
        update("expired");

        // destroy();
      } else if (transactionStatus == "pending") {
        // TODO set transaction status on your database to 'pending' / waiting payment
        // and response with 200 OK

        res.status(200).json("OK");
      }
    });
  } catch (error) {
    console.log("error");
  }
};

module.exports = {
  generateToken,
  notification,
};
