<template lang="pug">
section
    section-title(:text="$t('welcome.welcome')")
    plant-list
</template>
<script>
import PlantList from '@/views/Welcome/components/PlantList.vue'
import { useToast } from 'vue-toastification'
export default {
  components: {
    PlantList: PlantList,
  },
}
</script>
