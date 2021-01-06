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
        const response = await this.$axios.get(
          `${process.env.VUE_APP_API_ENDPOINT}/plants`
        );
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
    onPlantWatered(plantId, response) {
      const index = this.plants.findIndex((plant) => plant.id === plantId);
      if (index > -1) {
        this.plants[index].last_watering = response.data.last_watering;
        this.$bvToast.toast(`Plant watered`, {
          title: "Success",
          variant: "success",
          solid: true,
        });
      }
    },
  },
};
</script>
