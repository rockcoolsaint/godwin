import payments from "../lib/payments";

export default function Checkout() {
  const handleCreatePayment = async () => {
    const payment = await payments.create(
      0.15,
      "lorem ipsum",
      "kevin@rigly.io",
      "Kevin Karsopawiro",
      "21"
    );

    window.open(`https://dev-checkout.opennode.com/${payment.id}`);
  };

  return (
    <div className="container">
      <h2>Payments test</h2>
      <button onClick={handleCreatePayment}>Create payment</button>
    </div>
  );
}
