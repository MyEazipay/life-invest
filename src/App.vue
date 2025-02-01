<script setup lang="ts">
  import Nav from './components/layout/nav.vue'
  import Footer from './components/layout/footer.vue';
  import { RouterView } from 'vue-router';
  import { ref, onMounted, computed, onUnmounted } from 'vue';
  import { useStockStore } from './stores/stockStore';
  import Loading from './components/shared/loading.vue';
  import Error from './components/shared/error.vue';

  const store = useStockStore();
  const isResult = ref(false);

  let error = computed(() => store.error)
  onMounted(()=>{
    store.startPolling();
  });
  
  onUnmounted(()=>{
    store.stopPolling();
  });

</script>

<template>
  <div v-if="store.isInitializing === true && isResult === false">
    <Loading />
  </div>
  <Error v-else-if="error !== null" />
  <div v-else class="relative">
    <Nav />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition
          mode="out-in"
          enter-active-class="transition-opacity duration-200"
          enter-from-class="opacity-100"
          leave-active-class="transition-opacity duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <Component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <Footer />
  </div>
</template>
