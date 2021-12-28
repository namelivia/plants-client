<template lang="pug">
section
    section-title(:text="$t('list.title')")
    plant-list
</template>

<script>
import PlantList from './components/PlantList'
export default {
  components: {
    PlantList: PlantList,
  },
}
</script>
