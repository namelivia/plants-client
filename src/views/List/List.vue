<template lang="pug">
section
    h1 Plant list
    plant-list
</template>

<script>
import PlantList from "./components/PlantList";
export default {
  components: {
    PlantList: PlantList,
  },
};
</script>
