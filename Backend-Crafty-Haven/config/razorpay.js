const Razorpay = require("razorpay");

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

module.exports = { razorpay, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET };

// | Field      | Value                 |
// |------------|-----------------------|
// | Mastercard | 5104 0155 5555 5558   |
// | Visa       | 4386 2894 0766 0153   |
// | Expiry     | 12/28                 |
// | CVV        | 123                   |
// | OTP        | 1234                  |