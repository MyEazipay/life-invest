<script setup lang="ts">
    import { ref } from 'vue';
    import { useStockStore } from '../../stores/stockStore';
    import { useDebounce } from '@vueuse/core';

    const store = useStockStore();
    const searchQuery = ref('');
    const debouncedQuery = useDebounce(searchQuery, 300);

    const handleSearch = async () => {
        if (debouncedQuery.value) {
            await store.fetchQuote(debouncedQuery.value.toUpperCase());
        }
    };
</script>

<template>
    <div class="stock-search">
      <v-text-field
        v-model="searchQuery"
        label="Enter stock symbol"
        placeholder="e.g., AAPL"
        :loading="store.loading"
        @keyup.enter="handleSearch"
      >
        <template v-slot:append>
          <v-btn
            :disabled="!searchQuery"
            :loading="store.loading"
            @click="handleSearch"
          >
            Search
          </v-btn>
        </template>
      </v-text-field>
      
      <div v-if="store.error" class="error-message">
        {{ store.error }}
      </div>
      <p>Hello my fans</p>
    </div>
</template>