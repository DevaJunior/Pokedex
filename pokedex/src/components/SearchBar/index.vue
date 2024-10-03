<template>
  <input class="pokedex-input" type="text" v-model="search" @input="onSearch" placeholder="Buscar por nome ou número..." />
</template>

<script lang="ts">
import './styles.css';

import { defineComponent, ref } from 'vue';

export default defineComponent({
  emits: ['search'],
  setup(_, { emit }) {
    const search = ref('');
    const onSearch = () => {
      emit('search', search.value);
    };
    return { search, onSearch };
  }
});
</script>
