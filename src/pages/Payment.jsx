export default function Payment() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[28rem]">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Payment</h2>
        <form className="mt-6 flex flex-col gap-4">
          <input type="text" placeholder="Cardholder Name" className="border rounded-lg px-4 py-2" />
          <input type="text" placeholder="Card Number" className="border rounded-lg px-4 py-2" />
          <div className="flex gap-4">
            <input type="text" placeholder="MM/YY" className="border rounded-lg px-4 py-2 flex-1" />
            <input type="text" placeholder="CVV" className="border rounded-lg px-4 py-2 flex-1" />
          </div>
          <button className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
