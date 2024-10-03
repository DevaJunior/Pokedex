<template>
  <div class="cardpokemon-container" @click="emitOpenDialog">
    <div class="cardpokemon-img">
      <img :src="pokemonImage" alt="pokemon-image" v-if="pokemon" />
    </div>
    <div class="cardpokemon-info">
      <p v-if="pokemon">Nº{{ pokemonId }}</p>
      <h3 v-if="pokemon">{{ pokemon.name }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import './styles.css';
import { defineComponent, computed } from 'vue';
import { Pokemon } from '../../services/pokemon';

export default defineComponent({
  props: {
    pokemon: {
      type: Object as () => Pokemon,
      required: true,
    },
    pokemonIndex: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const pokemonId = computed(() => {
      const url = props.pokemon.url;
      return url ? parseInt(url.split('/')[6]) : undefined;
    });

    const pokemonImage = computed(() => {
      const id = pokemonId.value;
      return id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` : '';
    });

    const emitOpenDialog = () => {
      emit('open-dialog', props.pokemonIndex);
    };

    return { pokemonImage, pokemonId, emitOpenDialog };
  }
});
</script>

<style scoped>
.pokemon-card {
  cursor: pointer;
}
</style>
