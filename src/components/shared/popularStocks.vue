<script setup lang="ts">
    const props = defineProps<{
        quotes: any[];
        showChart: (key: string) => void 
    }>();

</script>
<template>
    <div class="bg-white rounded-2xl sm:my-2 p-6 sm:w-1/2">
        <h3 class="text-lg font-[Aeonik-Medium] mb-4">Popular Stocks</h3>
        <div class="space-y-4">
            <div v-for="([key, value], index) in Array.from(quotes)" :key="key"   @click="showChart(key)" class="flex items-center justify-between hover:bg-[#f5f5f5] px-2 py-1 rounded-md transition-all cursor-pointer">
                
                <div class="flex gap-x-3 items-center">
                    <img :src="value?.logo" class="w-[2rem] h-[2rem] rounded-full object-cover" width="100" height="100" />
                
                    <div>
                    <div class="font-[Aeonik-Medium]">{{ value.symbol }}</div>
                    <div class="text-sm text-gray-500">{{value.name}}</div>
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="text-right mr-2">
                    <div class="font-[Aeonik-Medium]">${{ value?.price }}</div>
                    <div
                        class="text-sm flex items-center justify-end text-emerald-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                        {{ value?.changePercent.toFixed(2) as any }}%
                    </div>
                    </div>
                    <!-- <button
                    class="p-2 rounded-full bg-transparent outline-none"
                    >
                    <Star class="w-5 h-5" fill={watchlist.includes(stock.symbol) ? "currentColor" : "none"} /> 
                    </button> -->
                </div>
            </div>
        </div>
    </div>
</template>