import './styles.css';
import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

type LaunchStatus = {
  label: string;
  value: string;
};

const launchStatus: LaunchStatus[] = [
  { label: 'Acceso', value: 'Cerrado' },
  { label: 'Estado', value: 'Preparando stock' },
  { label: 'Avisos', value: 'Pronto' }
];

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('No se encontro el contenedor de la aplicacion.');
}

app.innerHTML = `
  <main class="shell">
    <section class="intro" aria-labelledby="page-title">
      <p class="eyebrow">Papero</p>
      <h1 id="page-title">Estamos preparando algo bonito.</h1>
      <p class="lede">
        La tienda sigue cerrada por ahora. Muy pronto abriremos la puerta.
      </p>
      <form class="notify" aria-label="Recibir aviso">
        <label for="email">Recibe el aviso de apertura</label>
        <div class="notify-row">
          <input id="email" name="email" type="email" placeholder="tu@email.com" autocomplete="email" />
          <button type="submit">Avisarme</button>
        </div>
        <p class="form-note" aria-live="polite"></p>
      </form>
    </section>

    <section class="visual" aria-label="Papero en preparacion">
      <img
        src="https://images.unsplash.com/photo-1607344645866-009c320f3561?auto=format&fit=crop&w=1200&q=80"
        alt="Bolsa de papel sobre una mesa"
      />
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

  note!.textContent = 'Listo. Te avisaremos cuando abramos.';
  form.reset();
});
