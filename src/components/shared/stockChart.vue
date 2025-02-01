<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
// import { StockHistoricalData } from '../../types/stock';
import { Line } from 'vue-chartjs';

const props = defineProps<{
  data: any
}>();

let sampledata = {"2025-01-28": {
            "1. open": "248.9300",
            "2. high": "249.1000",
            "3. low": "219.3800",
            "4. close": "238.2600",
            "5. volume": "998072096"
        },
        "2024-12-31": {
            "1. open": "237.2700",
            "2. high": "260.1000",
            "3. low": "237.1600",
            "4. close": "250.4200",
            "5. volume": "977942014"
        },
        "2024-11-29": {
            "1. open": "220.9650",
            "2. high": "237.8100",
            "3. low": "219.7100",
            "4. close": "237.3300",
            "5. volume": "891640714"
        },
        "2024-10-31": {
            "1. open": "229.5200",
            "2. high": "237.4900",
            "3. low": "221.3300",
            "4. close": "225.9100",
            "5. volume": "930835961"
        },
        "2024-09-30": {
            "1. open": "228.5500",
            "2. high": "233.0900",
            "3. low": "213.9200",
            "4. close": "233.0000",
            "5. volume": "1231814423"
        },
        "2024-08-30": {
            "1. open": "224.3700",
            "2. high": "232.9200",
            "3. low": "196.0000",
            "4. close": "229.0000",
            "5. volume": "1122666993"
        },
        "2024-07-31": {
            "1. open": "212.0900",
            "2. high": "237.2300",
            "3. low": "211.9200",
            "4. close": "222.0800",
            "5. volume": "1153193377"
        },
        "2024-06-28": {
            "1. open": "192.9000",
            "2. high": "220.2000",
            "3. low": "192.1500",
            "4. close": "210.6200",
            "5. volume": "1723984420"
        },
        "2024-05-31": {
            "1. open": "169.5800",
            "2. high": "193.0000",
            "3. low": "169.1100",
            "4. close": "192.2500",
            "5. volume": "1336570142"
        },
        "2024-04-30": {
            "1. open": "171.1900",
            "2. high": "178.3600",
            "3. low": "164.0750",
            "4. close": "170.3300",
            "5. volume": "1240410671"
        },
        "2024-03-28": {
            "1. open": "179.5500",
            "2. high": "180.5300",
            "3. low": "168.4900",
            "4. close": "171.4800",
            "5. volume": "1430780147"
        },
        "2024-02-29": {
            "1. open": "183.9850",
            "2. high": "191.0500",
            "3. low": "179.2500",
            "4. close": "180.7500",
            "5. volume": "1161711745"
        },
        "2024-01-31": {
            "1. open": "187.1500",
            "2. high": "196.3800",
            "3. low": "180.1700",
            "4. close": "184.4000",
            "5. volume": "1187139861"
        },
        "2023-12-29": {
            "1. open": "190.3300",
            "2. high": "199.6200",
            "3. low": "187.4511",
            "4. close": "192.5300",
            "5. volume": "1062317718"
        },
        "2023-11-30": {
            "1. open": "171.0000",
            "2. high": "192.9300",
            "3. low": "170.1200",
            "4. close": "189.9500",
            "5. volume": "1099760711"
        },
        "2023-10-31": {
            "1. open": "171.2200",
            "2. high": "182.3400",
            "3. low": "165.6700",
            "4. close": "170.7700",
            "5. volume": "1172845791"
        },
        "2023-09-29": {
            "1. open": "189.4850",
            "2. high": "189.9800",
            "3. low": "167.6200",
            "4. close": "171.2100",
            "5. volume": "1337873796"
        },
        "2023-08-31": {
            "1. open": "196.2350",
            "2. high": "196.7300",
            "3. low": "171.9600",
            "4. close": "187.8700",
            "5. volume": "1323817340"
        },
        "2023-07-31": {
            "1. open": "193.7800",
            "2. high": "198.2300",
            "3. low": "186.6000",
            "4. close": "196.4500",
            "5. volume": "996368613"
        },
        "2023-06-30": {
            "1. open": "177.7000",
            "2. high": "194.4800",
            "3. low": "176.9306",
            "4. close": "193.9700",
            "5. volume": "1297863403"
        },
        "2023-05-31": {
            "1. open": "169.2800",
            "2. high": "179.3500",
            "3. low": "164.3100",
            "4. close": "177.2500",
            "5. volume": "1275052503"
        },
        "2023-04-28": {
            "1. open": "164.2700",
            "2. high": "169.8500",
            "3. low": "159.7800",
            "4. close": "169.6800",
            "5. volume": "967580718"
        },
        "2023-03-31": {
            "1. open": "146.8300",
            "2. high": "165.0000",
            "3. low": "143.9000",
            "4. close": "164.9000",
            "5. volume": "1520461315"
        }}

let formatedData = Object.entries(sampledata).map(([key, value]) => ({ key, value })).slice(0, 12).reverse()
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const createGradient = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(75, 192, 192, 0.5)');
  gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');
  return gradient
}

const linedata = {
  labels: formatedData.map(({ key, _ }, l)=> Intl.DateTimeFormat("en-US", {month: "short", year: "numeric" }).format(new Date(key).getTime())),
  datasets: [
    {
      label: 'Price',
      // backgroundColor: '#f87979',
      backgroundColor: '',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      data: formatedData.map(({ _,  value }, l) => value["4. close"]),
      fill: true,
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1,
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
        // borderDash: [5, 5]
      }
    }
  }
}

onMounted(()=>{
  const canvas = document.getElementById("area-chart") as HTMLCanvasElement;
  if(canvas){
    const ctx = canvas.getContext('2d');
    if(ctx){
      linedata.datasets[0].backgroundColor = createGradient(ctx);
    }
  }
})

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
                </button>
              </div>
              <div class="mb-6">
                <div class="text-3xl font-[Aeonik-Medium] mb-2">${{ data?.price.toFixed(2) }}</div>
                <div class="flex items-center" :class="data?.change < 0 ? 'text-red-500' : 'text-emerald-500'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up" :class="data.change <0 ? 'rotate-180' : ''"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                  <span>{{ data?.change.toFixed(2) }} ({{ data?.changePercent.toFixed(2) as any }}%)</span>
                </div>
              </div>
              <Line :data="linedata" :options="options" class="h-[200px]" id="area-chart" />
            </div>
</template>