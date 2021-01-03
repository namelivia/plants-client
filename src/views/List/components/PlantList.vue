<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    b-card-group(v-else columns)
        plant(
            v-for='plant in plants' :key='plant.id'
            :id="plant.id"
            :name="plant.name"
            :image-path="plant.image"
            :days-until-watering="plant.days_until_watering"
            @plant-removed="onPlantRemoved"
            @plant-watered="onPlantWatered"
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
      journal: null,
      loading: true,
    };
  },
  mounted: function () {
    this.loadList();
    this.loadJournal();
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
    async loadJournal() {
      try {
        const response = await this.$axios.get(
          `${process.env.VUE_APP_API_ENDPOINT}/plants/99/journal`
        );
        this.journal = response.data;
        console.log(this.journal);
      } catch (err) {
        this.$bvToast.toast(`Journal can't be retrieved`, {
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
    onPlantWatered(plantId, response) {
      const index = this.plants.findIndex((plant) => plant.id === plantId);
      if (index > -1) {
        this.plants[index].days_until_watering = response.days_until_watering;
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
