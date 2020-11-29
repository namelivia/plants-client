<template lang="pug">
section
    h1 PLANT LIST
    b-card-group(columns)
        plant(
            v-for='plant in plants' :key='plant.id'
            :name="plant.name"
            :image-url="plant.image_url"
            :species="plant.species"
            :days-until-watering="plant.days_until_watering"
        )
</template>

<script>
import Plant from "./components/Plant";
export default {
  components: {
    plant: Plant,
  },
  data: function () {
    //TODO: This will be empty, not it's just a stub
    return {
      plants: [
        {
          id: 1,
          name: "plant1",
          species: "Black locust",
          days_until_watering: 1,
          image_url:
            "https://www.ikea.com/es/en/images/products/fejka-artificial-potted-plant-in-outdoor-monstera__0614197_PE686822_S5.JPG",
        },
        {
          id: 2,
          name: "plant2",
          species: "Scots pine",
          days_until_watering: 5,
          image_url:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/prayer-plant-best-indoor-plants-1582228391.jpg",
        },
        {
          id: 3,
          name: "plant3",
          species: "Salvia cistus",
          days_until_watering: 8,
          image_url:
            "https://gearpatrol.com/wp-content/uploads/2019/01/10-Best-Indoor-Plants-Gear-Patrol-umbrella.jpg",
        },
      ],
    };
  },
  mounted: function () {
    //TODO: This will be the api call
    /*this.$axios
            .get('endpoint')
            .then(response => console.log(response.data))*/
  },
};
</script>
