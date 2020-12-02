<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    b-card-group(v-else columns)
        plant(
            v-for='plant in plants' :key='plant.id'
            :id="plant.id"
            :name="plant.name"
            :image-url="plant.image_url"
            :species="plant.species"
            :days-until-watering="plant.days_until_watering"
            @plant-removed="onPlantRemoved"
        )
</template>

<script>
import Plant from "./Plant";
export default {
  components: {
    plant: Plant,
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
        const response = await this.$axios.get(`http://localhost:80/plants`);
        this.plants = response.data;
      } catch (err) {
        this.$bvToast.toast(`Plants can't be retrieved`, {
          title: "Error",
          variant: "danger",
          solid: true,
        });
      } finally {
        this.loading = false;
      }
    },
    onPlantRemoved(plantId) {
      const index = this.plants.findIndex((plant) => plant.id === plantId);
      if (index > -1) {
        this.plants.splice(index, 1);
        this.$bvToast.toast(`Plant removed`, {
          title: "Success",
          variant: "success",
          solid: true,
        });
      }
    },
  },
};
</script>
