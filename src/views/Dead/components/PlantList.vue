<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    b-card-group(v-else columns)
        plant-card(
            v-for='plant in plants' :key='plant.id'
            :id="plant.id"
            :name="plant.name"
            :image-path="plant.image"
        )
</template>

<script>
import PlantCard from './PlantCard'
import { getDeadPlants } from '@/apis/apis'
import { errorToast } from '@/helpers/ui'
export default {
  components: {
    plantCard: PlantCard,
  },
  data: function () {
    return {
      plants: [],
      loading: true,
    }
  },
  mounted: function () {
    this.loadList()
  },
  methods: {
    async loadList() {
      try {
        this.plants = await getDeadPlants()
      } catch (err) {
        this.$bvToast.toast(`Plants can't be retrieved`, errorToast)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
