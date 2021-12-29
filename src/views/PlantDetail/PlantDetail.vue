<template lang="pug">
section
    loading(v-if='loading')
    div(v-else)
        plant-card-big(:plant-id="plantId")
        journal(:plant-id="plantId")
</template>

<script>
import Journal from '@/components/Journal'
import PlantCardBig from './components/PlantCardBig'
export default {
  components: {
    Journal,
    PlantCardBig,
  },
  props: {
    plantId: {
      type: Number,
      default: 0,
    },
  },
}
</script>
