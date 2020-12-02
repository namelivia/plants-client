<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    b-card-group(v-else columns)
        plant(
            v-for='plant in plants' :key='plant.id'
            :name="plant.name"
            :image-url="plant.image_url"
            :species="plant.species"
            :days-until-watering="plant.days_until_watering"
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
    this.$axios
      .get(`http://localhost:80/plants`)
      .then((response) => (this.plants = response.data))
      .catch(() => {
        this.$bvToast.toast(`Plants can't be retrieved`, {
          title: "Error",
          variant: "danger",
          solid: true,
        });
      })
      .finally(() => (this.loading = false));
  },
};
</script>
