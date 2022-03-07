<template lang="pug">
section
    loading(v-if='loading')
    card-grid(v-else)
        plant-card(
            v-for='plant in plants' :key='plant.id'
            :id="plant.id"
            :name="plant.name"
            :image-path="plant.image"
            :water-every="plant.water_every"
            :until-next-watering="plant.until_next_watering"
            :last-watering="plant.last_watering"
            @plant-watered="onPlantWatered"
        )
</template>

<script>
import PlantCard from '@/views/List/components/PlantCard.vue'
import { getPlants } from '@/apis/apis'
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
        this.plants = await getPlants()
      } catch (err) {
        toast.error(`Plants can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
    onPlantWatered(plantId, response) {
      const toast = useToast()
      const index = this.plants.findIndex((plant) => plant.id === plantId)
      if (index > -1) {
        this.plants[index].last_watering = response.data.last_watering
        toast.success(`Plant watered`)
      }
    },
  },
}
</script>
