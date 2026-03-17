async function getCartItems() {
  // Simulated server data fetch – in a real app, this might call a DB or API
  await new Promise((r) => setTimeout(r, 100));
  return [
    { id: "1", name: "Next.js Foundations", price: 0 },
    { id: "2", name: "App Router Deep Dive", price: 0 },
    { id: "3", name: "Server Components", price: 0 },
  ];
}

export default async function Cart() {
  const items = await getCartItems();

  return (
    <div className="cart-demo">
      <h3 className="cart-title">Your learning cart</h3>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <span className="cart-item-name">{item.name}</span>
            <span className="cart-item-price">{item.price === 0 ? "Free" : `$${item.price}`}</span>
          </li>
        ))}
      </ul>
      <p className="cart-hint">
        This is a Server Component. It fetches data on the server.
      </p>
    </div>
  );
}
