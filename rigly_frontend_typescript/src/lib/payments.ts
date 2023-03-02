export async function create(
  amount: number,
  description: string,
  email: string,
  name: string,
  orderId: string
) {
  const res = await fetch("https://dev-api.opennode.com/v1/charges", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // TODO: Replace with api key from env
      Authorization: "200fa722-c686-47b0-83d3-b76ea4b865b7",
    },
    body: JSON.stringify({
      amount,
      description,
      currency: "USD",
      customer_email: email,
      notif_email: "kevin@rigly.io",
      customer_name: name,
      order_id: orderId,
      callback_url: "http://localhost:8000/",
      success_url: `http://localhost:3000/checkout/success?order_id=${orderId}`,
      auto_settle: false,
      ttl: 10,
    }),
  });

  const { data: payment } = await res.json();

  return payment;
}

const Payments = {
  create,
};

export default Payments;
