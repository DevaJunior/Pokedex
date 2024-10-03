<template>
  <div class="pokemon-stats">
    <div v-for="stat in pokemon.stats" :key="stat.stat.name">
      <strong>{{ stat.stat.name }}:</strong> {{ stat.base_stat }}
    </div>

    <div v-if="pokemonDetails" class="poke-details">
      <div class="pokedetails-altura">
        <p><strong>Altura:</strong> {{ pokemonDetails.height }}</p>
        <p><strong>Peso:</strong> {{ pokemonDetails.weight }}</p>
      </div>
      <p class="pokedetails-habi">
        <strong>Habilidades:</strong> {{ getAbilityNames() }}
      </p>
      <div class="pokedetails-tipos">
        <strong>Tipos:</strong>
        <span
          v-for="type in pokemonDetails.types"
          :key="type.type.name"
          :style="{ color: getTypeColor(type.type.name) }"
        >
          {{ type.type.name }}
        </span>
      </div>
      <div class="pokedetails-esta">
        <strong>Estatísticas:</strong>
        <ul>
          <li v-for="stat in pokemonDetails.stats" :key="stat.stat.name">
            {{ stat.stat.name }}: {{ stat.base_stat }}
          </li>
        </ul>
      </div>
      <div v-if="pokemonDetails.evolves_from">
        <strong>Evoluções:</strong>
        <p>{{ pokemonDetails.evolves_from.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import './styles.css';
import { defineComponent, ref, watch } from 'vue';
import { Pokemon } from '../../services/pokemon'; 
import axios from 'axios'; 

interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

export default defineComponent({
  props: {
    pokemon: {
      type: Object as () => Pokemon | null,
      required: false,
    },
  },
  setup(props) {
    const pokemonDetails = ref<any>(null); 

    const getTypeColor = (typeName: string): string => {
      const typeColors: Record<string, string> = {
        fire: 'red',
        water: 'blue',
        grass: 'green',
        electric: 'yellow',
        ice: 'lightblue',
        bug: 'lightgreen',
        normal: 'gray',
        fighting: 'brown',
        poison: 'purple',
        ground: 'tan',
        flying: 'skyblue',
        psychic: 'pink',
        rock: 'beige',
        ghost: 'lavender',
        dragon: 'orange',
        dark: 'black',
        steel: 'silver',
        fairy: 'lightpink',
      };
      return typeColors[typeName] || 'black';
    };

    watch(() => props.pokemon, async (newPokemon) => {
      if (newPokemon && newPokemon.name) {
        const url = `https://pokeapi.co/api/v2/pokemon/${newPokemon.name}`;
        try {
          const response = await axios.get(url);
          pokemonDetails.value = response.data; 
        } catch (error) {
          console.error("Erro ao buscar os detalhes do Pokémon:", error);
          pokemonDetails.value = null; 
        }
      }
    }, { immediate: true });

    // Método: Obtem nomes das habilidades
    const getAbilityNames = () => {
      return pokemonDetails.value.abilities.map((ability: Ability) => ability.ability.name).join(', ');
    };

    return { pokemonDetails, getTypeColor, getAbilityNames };
  },
});
</script>

<style scoped>
.pokemon-stats {
}
</style>
