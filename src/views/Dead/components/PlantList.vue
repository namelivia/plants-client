<template lang="pug">
section
    loading(v-if='loading')
    card-grid(v-else)
        plant-card(
            v-for='plant in plants' :key='plant.id'
            :id="plant.id"
            :name="plant.name"
            :image-path="plant.image"
        )
</template>

<script>
import PlantCard from '@/views/Dead/components/PlantCard.vue'
import { getDeadPlants } from '@/apis/apis'
import { useToast } from 'vue-toastification'
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
      const toast = useToast()
      try {
        this.plants = await getDeadPlants()
      } catch (err) {
        toast.error(`Plants can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
