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
  { label: 'Tienda', value: 'En pausa' },
  { label: 'Mesa', value: 'Objetos pequenos' },
  { label: 'Apertura', value: 'Pronto, pero sin correr' }
];

const finds: Find[] = [
  { name: 'Libretas raras', detail: 'Para listas, dibujos y planes que cambian.' },
  { name: 'Clips con caracter', detail: 'Pequenos, utiles, un poco absurdos.' },
  { name: 'Papeles de color', detail: 'Para notas que no quieren ser grises.' },
  { name: 'Sellos y tintas', detail: 'Cosas simples para dejar una marca.' }
];

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('No se encontro el contenedor de la aplicacion.');
}

app.innerHTML = `
  <main class="shell">
    <section class="hero" aria-labelledby="page-title">
      <img
        src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1800&q=82"
        alt="Cuaderno abierto sobre una mesa de trabajo"
      />
      <div class="hero-copy">
        <p class="eyebrow">Papero</p>
        <h1 id="page-title">Objetos pequenos para dias comunes.</h1>
        <p class="lede">
          Papeleria, hallazgos de escritorio y piezas curiosas. La tienda abre
          pronto; la mesa todavia se esta ordenando.
        </p>
      </div>
    </section>

    <section class="note" aria-label="Nota del artista">
      <p class="kicker">La idea</p>
      <p>
        Una tienda pequena para mirar lento: cuadernos, clips, papeles, sellos,
        sobres, cosas utiles y alguna cosa que no necesita explicarse.
      </p>
      <p>
        Un poco tienda, un poco cajon de escritorio, un poco regalo inesperado.
      </p>
      <form class="notify" aria-label="Recibir aviso">
        <label for="email">Avisame cuando abra</label>
        <div class="notify-row">
          <input id="email" name="email" type="email" placeholder="tu@email.com" autocomplete="email" />
          <button type="submit">Guardar</button>
        </div>
        <p class="form-note" aria-live="polite"></p>
      </form>
    </section>

    <section class="finds" aria-label="Hallazgos de Papero">
      <p class="kicker">En la mesa</p>
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

    <section class="status" aria-label="Estado de apertura">
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
    note!.textContent = 'Deja tu email y te avisamos.';
    return;
  }

  note!.textContent = 'Guardado. Te avisaremos cuando Papero abra.';
  form.reset();
});
