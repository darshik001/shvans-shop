import axios from "axios";

const razorpayPaymentOrder = async (carts) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/razorpay/payment-order`, { carts });
    console.log("payment order respons", response)
    return response.data;
  } catch (error) {
    return { error: error.response.data.message || error.message || "An error occurred while creating the payment order." };

  }
}


export const razorpayMagickchekout = async (carts) => {
  try {
    // 1. Create Razorpay Order
    const paymentOrder = await razorpayPaymentOrder(carts);

    if (paymentOrder.error) {
      return { error: paymentOrder.error };
    }

    console.log("Payment Order:", paymentOrder);

    // 2. Get Razorpay Order ID
    const order = paymentOrder.PaymentOrder;

    // 3. Magic Checkout Options
    const options = {
      key: paymentOrder.razorpayKey || import.meta.env.VITE_RAZORPAY_KEY_ID,
      one_click_checkout: true,
      order_id: order.id,
      show_coupons: true,
      handler: async function (response) {
        console.log("Payment Success:", response);

        // Verify Payment API અહીં call કરીશું
      },


    };

    // 4. Open Magic Checkout
    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function (response) {
      console.log("Payment Failed:", response.error);
    });

    razorpay.open();

  } catch (error) {
    console.log("Magic Checkout Error:", error);
    return { error: error.message };
  }
};