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


const razorpayPaymentVerify = async (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/razorpay/`, { razorpay_order_id, razorpay_payment_id, razorpay_signature });
    console.log("payment verify respons", response)
    return response.data;
  } catch (error) {
    return { error: error.response.data.message || error.message || "An error occurred while creating the payment order." };

  }
}




export const razorpayMagickchekout = async (carts, navigate) => {
  try {
    // Create Razorpay Order
    const paymentOrder = await razorpayPaymentOrder(carts);

    if (paymentOrder.error) {
      return { error: paymentOrder.error };
    }

    console.log("Payment Order:", paymentOrder);

    const order = paymentOrder.PaymentOrder;

    if (!order?.id) {
      return { error: "Razorpay order ID not found" };
    }

    // Magic Checkout Options
    const options = {
      key:
        paymentOrder.razorpayKey ||
        import.meta.env.VITE_RAZORPAY_KEY_ID,

      one_click_checkout: true,
      order_id: order.id,
      show_coupons: true,

      // Payment Success
      handler: async function (response) {
        console.log("Payment Success:", response);

        // Verify Payment
        const verifyResponse = await razorpayPaymentVerify(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature
        );

        console.log("Verified Order:", verifyResponse);

        // Payment Verified
        if (verifyResponse.success && verifyResponse.order) {
          navigate("/order-success", {
            state: {
              order: verifyResponse.order,
            },
            replace: true,
          });

          return{message:verifyResponse.message}
        }

        if(verifyResponse.error){
          return {error:verifyResponse.error || "Payment verification failed"}
        }
      },
    };

    // Open Magic Checkout
    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function (response) {
      console.log("Payment Failed:", response.error);

      alert(
        response.error?.description ||
        "Payment failed. Please try again."
      );
    });

    razorpay.open();

    return { success: true };

  } catch (error) {
    console.log("Magic Checkout Error:", error);

    return {
      error: error.message || "Unable to open checkout",
    };
  }
};


// export const razorpayMagickchekout = async (carts) => {
//   try {
//     // 1. Create Razorpay Order
//     const paymentOrder = await razorpayPaymentOrder(carts);

//     if (paymentOrder.error) {
//       return { error: paymentOrder.error };
//     }

//     console.log("Payment Order:", paymentOrder);

//     // 2. Get Razorpay Order ID
//     const order = paymentOrder.PaymentOrder;

//     // 3. Magic Checkout Options
//     const options = {
//       key: paymentOrder.razorpayKey || import.meta.env.VITE_RAZORPAY_KEY_ID,
//       one_click_checkout: true,
//       order_id: order.id,
//       show_coupons: true,
//       handler: async function (response) {
//         console.log("Payment Success:", response);

//         // Verify Payment API અહીં call કરીશું
//       },


//     };

//     // 4. Open Magic Checkout
//     const razorpay = new window.Razorpay(options);

//     razorpay.on("payment.failed", function (response) {
//       console.log("Payment Failed:", response.error);
//     });

//     razorpay.open();

//   } catch (error) {
//     console.log("Magic Checkout Error:", error);
//     return { error: error.message };
//   }
// };