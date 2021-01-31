<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    b-card-group(v-else columns)
        plant-card(
            v-for='plant in plants' :key='plant.id'
            :id="plant.id"
            :name="plant.name"
            :image-path="plant.image"
            :days-until-watering="plant.days_until_watering"
            :last-watering="plant.last_watering"
            @plant-watered="onPlantWatered"
        )
</template>

<script>
import PlantCard from "./PlantCard";
import { getPlants } from "@/apis/apis";
import { errorToast, okToast } from "@/helpers/ui";
export default {
  components: {
    plantCard: PlantCard,
  },
  data: function () {
    return {
      plants: [],
      loading: true,
    };
  },
  mounted: function () {
    this.loadList();
  },
  methods: {
    async loadList() {
      try {
        this.plants = await getPlants();
      } catch (err) {
        this.$bvToast.toast(`Plants can't be retrieved`, errorToast);
      } finally {
        this.loading = false;
      }
    },
    onPlantWatered(plantId, response) {
      const index = this.plants.findIndex((plant) => plant.id === plantId);
      if (index > -1) {
        this.plants[index].last_watering = response.data.last_watering;
        this.$bvToast.toast(`Plant watered`, okToast);
      }
    },
  },
};
</script>
