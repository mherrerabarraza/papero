import './styles.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('/papero/sw.js', { scope: '/papero/' });
  });
}

type Product = {
  name: string;
  note: string;
  price: string;
  image: string;
  alt: string;
  accent: string;
};

const products: Product[] = [
  {
    name: 'Soft Grid Notebook',
    note: 'Pages for lists, sketches and small changes of plan.',
    price: '£12',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=82',
    alt: 'Open notebook with handwritten notes',
    accent: 'Paper'
  },
  {
    name: 'Tiny Desk Clips',
    note: 'A tidy little set for receipts, postcards and half-ideas.',
    price: '£6',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=82',
    alt: 'Desk with paper and stationery',
    accent: 'Metal'
  },
  {
    name: 'Colour Note Pack',
    note: 'Quiet pastels for notes that should not feel too serious.',
    price: '£8',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=900&q=82',
    alt: 'Notebook and planning notes on a desk',
    accent: 'Pastel'
  },
  {
    name: 'Pocket Stamp Set',
    note: 'For parcels, margins and objects that need a small mark.',
    price: '£14',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=82',
    alt: 'Minimal desk tools and a notebook',
    accent: 'Ink'
  }
];

const shop = document.querySelector<HTMLDivElement>('#shop');

if (!shop) {
  throw new Error('The shop container was not found.');
}

shop.innerHTML = `
  <main class="shop-shell">
    <header class="shop-hero">
      <nav class="topbar" aria-label="Shop navigation">
        <a class="brand" href="/papero/">Papero</a>
        <a class="home-link" href="/papero/">Back to note</a>
      </nav>
      <section class="intro" aria-labelledby="shop-title">
        <p class="eyebrow">Demo shop</p>
        <h1 id="shop-title">Useful things, chosen slowly.</h1>
        <p>
          A possible first shelf for Papero: simple stationery, desk objects and
          small pieces with a little wink.
        </p>
      </section>
    </header>

    <section class="shop-note" aria-label="Shop note">
      <p>Open stock. Quiet design. Nothing shouting.</p>
      <p>Tap an object, imagine it on your desk, leave it there for a moment.</p>
    </section>

    <section class="product-grid" aria-label="Demo products">
      ${products
        .map(
          (product) => `
            <article class="product">
              <a href="#" aria-label="View ${product.name}">
                <img src="${product.image}" alt="${product.alt}" loading="lazy" />
                <div class="product-copy">
                  <p class="tag">${product.accent}</p>
                  <h2>${product.name}</h2>
                  <p>${product.note}</p>
                  <strong>${product.price}</strong>
                </div>
              </a>
            </article>
          `
        )
        .join('')}
    </section>

    <section class="closing" aria-label="Closing note">
      <p>Demo basket closed for now.</p>
      <a href="/papero/">Return to Papero</a>
    </section>
  </main>
`;
