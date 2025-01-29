<script setup lang="ts">
    // import StockSearch from '../components/shared/stockSearch.vue';
    import StockChart from '../components/shared/stockChart.vue';
    import PopularStocks from '../components/shared/popularStocks.vue';
    import { useStockStore } from '../stores/stockStore';
    import { computed, watch } from 'vue';
    import { ref } from 'vue';
    import { useDebounce } from '@vueuse/core';

    const store = useStockStore();

    const showSearchDropDown = ref(false);
    const ticker = ref("");
    const debouncedTicker = useDebounce(ticker, 700);
    
    let chartData = ref(store.quotes.get(store?.symbolInChart as string));
    let searchResults = ref(store.searchResults?.result);

    watch(debouncedTicker, async (newTicker) => {
      if (newTicker !== '') {
        let searchResults = await store.searchSymbol(newTicker);
        store.searchResults = searchResults
      }
    });

    watch(()=> store.searchResults, (newTicker) => {
      searchResults.value = newTicker?.result
    })

    const showChart = (symbol:string) => {
      chartData.value = store.quotes.get(symbol)
    }


    const disableScroll = () => {
      if(ticker.value !== ''){
        showSearchDropDown.value = true
      }
      document.body.style.overflow = 'hidden'
    }

    const enableScroll = () => {
      showSearchDropDown.value = false
      document.body.style.overflow = ''
    }

    const handleSearch = async () => {
      if(debouncedTicker.value){
        await store.searchSymbol(debouncedTicker.value)
      }
    }
</script>

<template>
    <div class="py-16 px-4 bcg-gradient min-h-[90vh] text-[#101010] tracking-[-0.026em]">
        <div class="search-bar relative flex gap-x-2 items-center shadow-md mt-10 mb-2 sm:mt-[4rem] max-w-[400px] mx-auto px-[15px] bg-white rounded-[.7rem] h-[3.4rem]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search text-[#aaa]"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input 
              type="text"
              label="Enter stock symbol"
              v-model="ticker"
              @focus="disableScroll"
              @blur="enableScroll"
              class="h-full w-full text-[#101010] outline-none placeholder:font-[Aeonik-Medium] font-[Aeonik-Medium]"
              placeholder="Search for a symbol e.g. AAPL"
            />
            <div v-if="ticker !== '' || showSearchDropDown === true" class="overflow-hidden absolute top-0 mt-[2.8rem] p-3 px-5 shadow-md rounded-b-[.7rem] w-full left-0 h-[auto] max-h-[15rem] bg-[#fff]">
              <p v-if="store.isSearching === true" class="text-center text-[#aaa] text-sm my-3">Searching for stock symbol: {{ ticker }}</p>
              <p v-if="store.searchResults !== null && store.isSearching === false" class="font-[Aeonik-Medium] text-sm ">Search results count: {{ store.searchResults.count }}</p>
              <div class="overflow-hidden">
                <ul class="" v-if="searchResults !== null ">
                  <li v-for="(result, index) in searchResults" class="my-1 cursor-pointer hover:bg-[#f7f7f7] items-center rounded-md px-1 py-1 flex justify-between" :key="index" >
                    <p class="font-[Aeonik-Medium]">{{ result.symbol  }}</p>
                    <p class="text-sm">{{ result.description  }}</p>
                  </li>
                </ul>
              </div>
            </div>
        </div>
        <p class="text-[#aaa] font-[Aeonik-Medium] text-sm text-center my-5 mt-9">Last Updated: {{ store.lastUpdated?.toLocaleTimeString() }}</p>
        <div class="max-w-[900px] mx-auto flex w-full flex-col sm:flex-row gap-y-6 sm:gap-x-5">
          <StockChart :data="chartData" />
          <PopularStocks :quotes="store.quotes" :showChart="showChart" />
        </div>
    </div>
</template>