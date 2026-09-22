import type GLightbox from 'glightbox';

export type GLightboxFactory = typeof GLightbox;

let glightboxPromise: Promise<GLightboxFactory> | null = null;
let glightboxStylesPromise: Promise<void> | null = null;

function waitForStylesheet(stylesheet: HTMLLinkElement) {
  if (stylesheet.sheet) return Promise.resolve();

  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (!settled) {
        settled = true;
        resolve();
      }
    };
    stylesheet.addEventListener('load', finish, { once: true });
    stylesheet.addEventListener('error', finish, { once: true });
    setTimeout(finish, 2500);
  });
}

function loadGLightboxStyles() {
  if (!glightboxStylesPromise) {
    glightboxStylesPromise = import('glightbox/dist/css/glightbox.css?url')
      .then(({ default: href }) => {
        const existing = document.querySelector<HTMLLinkElement>('link[data-glightbox-styles]');
        if (existing) return waitForStylesheet(existing);

        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = href;
        stylesheet.dataset.glightboxStyles = 'true';
        const ready = waitForStylesheet(stylesheet);
        document.head.append(stylesheet);
        return ready;
      })
      .catch((error) => {
        glightboxStylesPromise = null;
        throw error;
      });
  }

  return glightboxStylesPromise;
}

export function loadGLightbox() {
  if (!glightboxPromise) {
    glightboxPromise = Promise.all([import('glightbox'), loadGLightboxStyles()])
      .then(([module]) => (module as unknown as { default: GLightboxFactory }).default)
      .catch((error) => {
        glightboxPromise = null;
        throw error;
      });
  }

  return glightboxPromise;
}
