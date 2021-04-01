<template lang="pug">
section
    h1(v-t="'list.title'")
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
