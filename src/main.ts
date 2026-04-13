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

const launchStatus: LaunchStatus[] = [
  { label: 'Tienda', value: 'En pausa' },
  { label: 'Trabajo', value: 'Papeles, tintas y pruebas' },
  { label: 'Apertura', value: 'Sin prisa' }
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
        <h1 id="page-title">Papeles para volver a mirar.</h1>
        <p class="lede">
          La tienda esta cerrada mientras nace una coleccion pequena de cuadernos,
          laminas y objetos de escritorio.
        </p>
      </div>
    </section>

    <section class="note" aria-label="Nota del artista">
      <p class="kicker">Desde el taller</p>
      <p>
        Papero empieza como una mesa en silencio: hojas sueltas, marcas de tinta,
        sobres encontrados y pruebas que todavia no tienen nombre.
      </p>
      <p>
        Pronto sera una tienda. Por ahora es un cuaderno abierto.
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
