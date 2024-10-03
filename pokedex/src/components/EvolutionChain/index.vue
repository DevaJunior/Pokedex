<template>
  <div>
    <div v-if="evolutions.length === 0">Sem evoluções</div>
    <div v-else>
      <div v-for="evolution in evolutions" :key="evolution.name">
        <p>Evolução</p>
        <img :src="evolution.sprites.front_default" alt="Evolution" />
        <span>{{ evolution.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['pokemonId'],
  data() {
    return {
      evolutions: [],
    };
  },
  methods: {
    async fetchEvolutions() {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${this.pokemonId}`);
      if (response.data.evolves_from_species) {
        this.evolutions.push(response.data.evolves_from_species);
      }
    },
  },
  mounted() {
    this.fetchEvolutions();
  },
};
</script>

<style scoped>
</style>
