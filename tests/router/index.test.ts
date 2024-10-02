import App from '@/App.vue';
import router from '@/router';
import { mount } from '@vue/test-utils';

describe('Router', () => {
  //para resolver el warning necesitamos enviar de forma global el router
  const wrapper = mount(App, {
    global: {
      plugins: [router],
    },
  });

  test('should render HomePage when visiting /', async () => {
    //asegurarnos que estamos en la ruta
    await router.replace('/');
    //esperar a que router este listo
    await router.isReady();

    expect(wrapper.html()).toContain('Bienvenido a nuestro sitio web');
  });

  test('should render Features when visiting /features', async () => {
    //asegurarnos que estamos en la ruta
    await router.replace('/features');
    //esperar a que router este listo
    await router.isReady();

    expect(wrapper.html()).toContain('Master Cleanse Reliac Heirloom');
  });

  test('should render Features when visiting /pricing', async () => {
    //asegurarnos que estamos en la ruta
    await router.replace('/pricing');
    //esperar a que router este listo
    await router.isReady();

    expect(wrapper.html()).toContain('Flexible');
  });

  test('should render Features when visiting /contact', async () => {
    //asegurarnos que estamos en la ruta
    await router.replace('/contact');
    //esperar a que router este listo
    await router.isReady();

    expect(wrapper.html()).toContain(
      'Post-ironic portland shabby chic echo park, banjo fashion axe',
    );
  });
});
