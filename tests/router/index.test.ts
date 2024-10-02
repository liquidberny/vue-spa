import App from '@/App.vue';
import router from '@/router';
import { mount } from '@vue/test-utils';
import type { RouteLocationNormalized } from 'vue-router';

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
  test('renders LoginPage when visiting /pokemon/:id with no authentication', async () => {
    //asegurarnos que no haya una autenticacion
    localStorage.clear();

    await router.replace('/pokemon/151');
    await router.isReady();

    expect(wrapper.find('h1').text()).toContain('Login');
  });

  test('renders PokemonPage when logged in', async () => {
    //mandamos la sesión necesaria
    localStorage.setItem('userId', 'ABC-123');

    await router.replace('/pokemon/151');
    await router.isReady();

    expect(wrapper.find('h1').text()).toContain('Pokemon #151');
    expect(wrapper.html()).toContain(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/151.svg',
    );
  });

  test('should convert the segment into numbers', () => {
    const route: RouteLocationNormalized = {
      name: undefined,
      params: { id: '2' },
      matched: [],
      fullPath: '/pokemon/2',
      query: {},
      hash: '',
      redirectedFrom: undefined,
      meta: {},
      path: '',
    };

    const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');

    const { id } = (pokemonRoute?.props as any).default(route);

    expect(pokemonRoute).toBeTruthy();
    expect(id).toBe(2);
  });
  test('should return default value if argument is NaN', () => {
    const route: any = {
      params: { id: '2abc' },
      fullPath: '/pokemon/2',
    };

    const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');

    const { id } = (pokemonRoute?.props as any).default(route);

    expect(pokemonRoute).toBeTruthy();
    expect(id).toBe(1);
  });
});
