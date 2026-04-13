import './styles.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('/papero/sw.js', { scope: '/papero/' });
  });
}

type LaunchStatus = {
  label: string;
  value: string;
};

type Find = {
  name: string;
  detail: string;
};

const launchStatus: LaunchStatus[] = [
  { label: 'Shop', value: 'Paused' },
  { label: 'Table', value: 'Small things' },
  { label: 'Opening', value: 'Soon, without rushing' }
];

const finds: Find[] = [
  { name: 'Odd notebooks', detail: 'For lists, sketches and plans that change.' },
  { name: 'Clips with character', detail: 'Small, useful, slightly silly.' },
  { name: 'Coloured paper', detail: 'For notes that refuse to be grey.' },
  { name: 'Stamps and ink', detail: 'Simple things for leaving a mark.' }
];

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('The app container was not found.');
}

app.innerHTML = `
  <main class="shell">
    <section class="hero" aria-labelledby="page-title">
      <img
        src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1800&q=82"
        alt="Open notebook on a work table"
      />
      <div class="hero-copy">
        <p class="eyebrow">Papero</p>
        <h1 id="page-title">Small things for ordinary days.</h1>
        <p class="lede">
          Stationery, desk finds and curious little pieces. The shop opens soon;
          the table is still being arranged.
        </p>
      </div>
    </section>

    <section class="note" aria-label="A note on the idea">
      <p class="kicker">The idea</p>
      <p>
        A small shop for slow looking: notebooks, clips, papers, stamps,
        envelopes, useful things and the occasional thing that needs no excuse.
      </p>
      <p>
        Part shop, part desk drawer, part unexpected gift.
      </p>
      <form class="notify" aria-label="Receive an opening note">
        <label for="email">Tell me when it opens</label>
        <div class="notify-row">
          <input id="email" name="email" type="email" placeholder="you@email.com" autocomplete="email" />
          <button type="submit">Save</button>
        </div>
        <p class="form-note" aria-live="polite"></p>
      </form>
    </section>

    <section class="finds" aria-label="Papero finds">
      <p class="kicker">On the table</p>
      <div class="finds-list">
        ${finds
          .map(
            (item) => `
              <article class="find-item">
                <span></span>
                <h2>${item.name}</h2>
                <p>${item.detail}</p>
              </article>
            `
          )
          .join('')}
      </div>
    </section>

    <section class="status" aria-label="Opening status">
      ${launchStatus
        .map(
          (item) => `
            <article class="status-item">
              <span>${item.label}</span>
              <strong>${item.value}</strong>
            </article>
          `
        )
        .join('')}
    </section>
  </main>
`;

const form = document.querySelector<HTMLFormElement>('.notify');
const note = document.querySelector<HTMLParagraphElement>('.form-note');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const email = String(data.get('email') ?? '').trim();

  if (!email) {
    note!.textContent = 'Leave your email and we will let you know.';
    return;
  }

  note!.textContent = 'Saved. We will let you know when Papero opens.';
  form.reset();
});
