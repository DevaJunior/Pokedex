<template>
  <section class="main-container-master">
    <div class="main-container">
      <section class="pokedex-container">
        <div class="mainpokedex-info">
          <div class="mainpokedex-info-id">
            <p>Nºx</p>
          </div>
          <div class="mainpokedex-info-img">
          </div>
          <div class="mainpokedex-info-nome">
            <p>Charmander</p>
          </div>
          <div class="mainpokedex-info-desc">
            <p>Forte</p>
          </div>
        </div>
        <div class="mainpokedex-buttons">
          <button >Voltar</button>
          <button >Próximo</button>
        </div>
      </section>
    </div>
    <div class="main-container-separador"></div>
    <div class="pokedex-container-pokemons">
      <div class="mainpokedex-search">
        <p>Search</p>
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
      <button >Carregar mais</button>
    </div>
  </section>
</template>

<script lang="ts">
import './styles.css';
import { defineComponent } from 'vue';
import CardPokemon from '../../components/CardPokemon/index.vue';

export default defineComponent({
  components: {
    CardPokemon
  },  
});
</script>
