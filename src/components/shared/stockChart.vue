<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
// import { StockHistoricalData } from '../../types/stock';
// import { Line } from 'vue-chartjs';

const props = defineProps<{
  data: any
}>();

// const chartData = computed(() => ({
//   labels: props.data.map(d => new Date(d.timestamp * 1000).toLocaleDateString()),
//   datasets: [
//     {
//       label: 'Stock Price',
//       data: props.data.map(d => d.close),
//       borderColor: '#41b883',
//       tension: 0.1
//     }
//   ]
// }));

// const options = {
//   responsive: true,
//   maintainAspectRatio: false,
//   scales: {
//     y: {
//       beginAtZero: false
//     }
//   }
// };
</script>

<template>
  <div class="bg-white rounded-2xl p-5 mb-6 max-w-[400px] w-auto sm:w-[400px] shadow-md my-2 h-[400px]">
              <div class="mb-4 flex justify-between items-start">
                <div>
                  <h2 class="text-2xl font-[Aeonik-Medium] flex gap-x-2">
                    <img :src="data?.logo" class="w-[2rem] rounded-full object-cover" width="100" height="100" />
                    {{ data.symbol }}</h2>
                  <p class="text-gray-500">
                    {{ data?.name }}</p>
                </div>
                <button class="bg-transparent outline-none">
                  <!-- <Star class="w-6 h-6" fill={watchlist.includes("AAPL") ? "currentColor" : "none"} /> -->
                </button>
              </div>
              <div class="mb-6">
                <div class="text-3xl font-[Aeonik-Medium] mb-2">${{ data?.price }}</div>
                <div class="flex items-center text-emerald-500">
                  <!-- <ArrowUp class="w-4 h-4 mr-1" /> -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                  <span>{{ data?.change }} ({{ data?.changePercent.toFixed(2) as any }}%)</span>
                </div>
              </div>
              <!-- <div class="h-[200px]">
                <!-- <Line data={data} options={chartOptions} /> 
              </div> -->
              <Line :data="linedata" :options="options" class="h-96" />
              
            </div>
</template>