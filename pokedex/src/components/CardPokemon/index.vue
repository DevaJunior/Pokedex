<template>
  <div class="cardpokemon-container" @click="emitOpenDialog">
    <div class="cardpokemon-img">
      <img :src="pokemonImage" alt="pokemon-image" v-if="pokemon" />
    </div>
    <div class="cardpokemon-info">
      <p v-if="pokemon">Nº x</p>
      <h3 v-if="pokemon"> Charmander</h3>
    </div>
  </div>
</template>

<script lang="ts">
import './styles.css';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    pokemon: {
      required: true,
    },
    pokemonIndex: {
      type: Number,
      required: true,
    },
  },  
});
</script>

<style scoped>
.pokemon-card {
  cursor: pointer;
}
</style>
