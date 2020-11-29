<template lang="pug">
    b-card.mb-2(
        :title="name"
        :img-src="imageUrl"
        :img-alt="name"
        img-top
        style="max-width: 20rem;"
    )
        b-card-text
            p.mb-0 Species: {{species}}
            p Days until watering: {{daysUntilWatering}}
        b-button(variant="primary") Water it
        b-button.ml-2(variant="danger") Delete it
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    species: {
      type: String,
      default: "",
    },
    daysUntilWatering: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      default:
        "https://e-fisiomedic.com/wp-content/uploads/2013/11/default-placeholder.png",
    },
  },
};
</script>
