<script setup lang="ts">
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const reloadPage = () => {
        window.location.reload()
    }
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <div class="text-center">
            <p class="text-[#11453b] font-['Aeonik-Medium'] text-[1.45rem] tracking-[-0.04em] mb-6">LifeInvest</p>
            <p class="text-lg text-[#101010 my-4 mt-7]">Error Loading application</p>
            <button class="bg-[#11453b] text-white px-3 py-2 rounded-md outline-none" style="outline: none;" @click="reloadPage()">Reload Page</button>
        </div>
        <p></p>
    </div>
</template>