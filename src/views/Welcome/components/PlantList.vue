<template lang="pug">
section
    loading(v-if='loading')
    div(v-else)
        water-all-plants(@all-plants-watered="onAllPlantsWatered" v-if="plants.length > 0")
        card-grid
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
import WaterAllPlants from '@/views/Welcome/components/WaterAllPlants.vue'
import PlantCard from '@/views/Welcome/components/PlantCard.vue'
import { getDryPlants } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  components: {
    plantCard: PlantCard,
    waterAllPlants: WaterAllPlants,
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
        this.plants = await getDryPlants()
      } catch (err) {
        toast.error(`Plants can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
    onAllPlantsWatered(evt) {
      const toast = useToast()
      toast.success(`All plants watered`)
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
