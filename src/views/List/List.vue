<template lang="pug">
section
    section-title(:text="$t('list.title')")
    plant-list
</template>

<script>
import PlantList from '@/views/List/components/PlantList.vue'
export default {
  components: {
    PlantList: PlantList,
  },
}
</script>
