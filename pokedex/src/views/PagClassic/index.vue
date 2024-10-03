<template>
  <section class="main-container-master">
    <div class="main-container">
      <section class="pokedex-container">
        <div class="mainpokedex-info">
          <div class="mainpokedex-info-id">
            <p>Nº{{ currentPokemon?.id }}</p>
          </div>
          <div class="mainpokedex-info-img">
            <img :src="currentPokemonImage" alt="pokemon-image" v-if="currentPokemon" />
          </div>
          <div class="mainpokedex-info-nome">
            <p>{{ currentPokemon?.name }}</p>
          </div>
          <div class="mainpokedex-info-desc">
            <PokeDetails v-if="currentPokemon" :pokemon="currentPokemon" />
          </div>
        </div>
        <div class="mainpokedex-buttons">
          <button @click="showPrevious" :disabled="currentIndex === 0">Voltar</button>
          <button @click="showNext" :disabled="currentIndex === filteredPokemons.length - 1">Próximo</button>
        </div>
      </section>
    </div>

    <div class="main-container-separador"></div>

    <div class="pokedex-container-pokemons">
      <div class="mainpokedex-search">
        <SearchBar @search="handleSearch" />
      </div>
      <div class="pokemon-list">
        <CardPokemon 
          v-for="(pokemon, index) in filteredPokemons" 
          :key="pokemon.id" 
          :pokemon="pokemon"
          :pokemonIndex="index"
          @open-dialog="selectPokemon"
        />
      </div>
      <button @click="loadMore">Carregar mais</button>
    </div>
  </section>
</template>

<script lang="ts">
import './styles.css';
import { defineComponent, ref, computed } from 'vue';
import CardPokemon from '../../components/CardPokemon/index.vue';
import SearchBar from '../../components/SearchBar/index.vue';
import { getPokemonList, Pokemon } from '../../services/pokemon';

export default defineComponent({
  components: {
    CardPokemon,
    SearchBar,
  },
  setup() {
    const pokemons = ref<Pokemon[]>([]);
    const originalPokemons = ref<Pokemon[]>([]);
    const limit = 20;
    let offset = 0;

    const currentIndex = ref(0);
    const selectedPokemon = ref<Pokemon | null>(null);

    const fetchPokemons = async () => {
      const response = await getPokemonList(limit, offset);
      pokemons.value.push(...response.data.results);
      originalPokemons.value.push(...response.data.results);
      offset += limit;
    };

    const loadMore = () => {
      fetchPokemons();
    };

    const filteredPokemons = computed(() => {
      return pokemons.value; // Aqui você pode adicionar filtragem, se necessário
    });

    const currentPokemon = computed(() => {
      const pokemon = filteredPokemons.value[currentIndex.value] || null;
      if (pokemon) {
        const id = Number(pokemon.url.split('/')[6]); // Converte o ID para número
        return { ...pokemon, id }; // Retorna o Pokémon com o ID convertido
      }
      return null;
    });

    const currentPokemonImage = computed(() => {
      const id = currentPokemon.value?.url.split('/')[6];
      return id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` : '';
    });

    const showNext = () => {
      if (currentIndex.value < filteredPokemons.value.length - 1) {
        currentIndex.value++;
      }
    };

    const showPrevious = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--;
      }
    };

    const handleSearch = (query: string) => {
      currentIndex.value = 0; // Reseta o índice atual para o primeiro Pokémon
      if (query) {
        const filtered = originalPokemons.value.filter(pokemon =>
          pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
        pokemons.value = filtered; // Atualiza a lista de Pokémon filtrados
      } else {
        pokemons.value = [...originalPokemons.value]; // Restaura todos os Pokémon
      }
    };

    const selectPokemon = (index: number) => {
      currentIndex.value = index; // Atualiza o currentIndex com o índice do card clicado
    };

    fetchPokemons();

    return {
      currentPokemon,
      currentPokemonImage,
      showNext,
      showPrevious,
      currentIndex,
      filteredPokemons,
      handleSearch,
      loadMore,
      selectPokemon,
    };
  },
});
</script>
