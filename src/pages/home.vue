<script setup lang="ts">
    import StockSearch from '../components/shared/stockSearch.vue';
    import StockChart from '../components/shared/stockChart.vue';
    import PopularStocks from '../components/shared/popularStocks.vue';
    import { useStockStore } from '../stores/stockStore';
    import { ref } from 'vue';

    const store = useStockStore();
    let search = ref<{} | null>(null);    
    let chartData = ref(store.chartFromSearch === true ? store.quotes.get(store?.symbolInChart as string) : store.popularStocks.get(store?.symbolInChart as string));

    const showChart = (symbol:string) => {
      chartData.value = store.popularStocks.get(symbol)
      search.value = null
    }

    const showSearchChart = (arg: any) => {
      search.value = arg;
    }
</script>

<template>
    <div class="py-16 px-4 bcg-gradient min-h-[90vh] text-[#101010] tracking-[-0.026em]">
        <StockSearch @show-in-chart="(arg) => showSearchChart(arg)" />
        <p class="text-[#aaa] font-[Aeonik-Medium] text-sm text-center my-5 mt-9">Last Updated: {{ store.lastUpdated?.toLocaleTimeString() }}</p>
        <div class="max-w-[900px] mx-auto flex w-full flex-col sm:flex-row gap-y-6 sm:gap-x-5">
          <div>
            <StockChart v-if="search !== null" :data="search" />
            <StockChart v-else :data="chartData" />
            <p class="text-sm text[#ddd] my-3" v-if="store.isUpdatingChart === true">Updating Chart...</p>
          </div>
          <PopularStocks :popularStocks="store.popularStocks" :showChart="showChart" />
        </div>
    </div>
</template>