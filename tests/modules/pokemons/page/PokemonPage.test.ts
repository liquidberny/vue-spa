import PokemonPage from '@/modules/pokemons/pages/PokemonPage.vue';
import { mount, RouterLinkStub } from '@vue/test-utils';

describe('<PokemonPage />', () => {
  const wrapper = mount(PokemonPage, {
    props: {
      id: 25,
    },
    global: {
      stubs: {
        //Esto es un relleno sin el objeto que obtiene verdaderamente
        // RouterLink: true,
        RouterLink: RouterLinkStub,
      },
    },
  });
  test('should render the component correctly', () => {
    expect(wrapper.find('h1').exists()).toBe(true);
    expect(wrapper.find('img').attributes('src')).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
    );
  });
  test('should redirect to the next pokemon', () => {
    //RouterLinkStub es un espia del RouterLink en PokemonPage
    const link = wrapper.findComponent(RouterLinkStub);
    console.log(link.html());
    // console.log(link.props());
    expect(link.props().to).toEqual({ name: 'pokemon', params: { id: 26 } });
  });
});
