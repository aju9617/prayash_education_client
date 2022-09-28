import constant from "../config/constant";
import toast from "react-hot-toast";

function loadRazorPayScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function displayRazorpay({
  name,
  email,
  phone,
  amount,
  id,
  currency,
  notes,
}) {
  const res = await loadRazorPayScript(
    "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const options = {
    key: constant.RAZORPAY_KEY,
    currency: currency,
    amount: amount.toString(),
    order_id: id,
    name: "Admission Charge",
    description: "Thank you",
    image: `${constant.CLIENT_URL}/logo.png`,
    handler: async function () {
      toast.success("Payment successfull");
    },
    prefill: {
      name: name,
      email: email,
      contact: phone,
    },
    notes,
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
