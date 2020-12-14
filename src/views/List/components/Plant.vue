<template lang="pug">
    b-card.mb-2(
        :title="name"
        :img-src="imageUrl"
        :img-alt="name"
        img-top
        style="max-width: 20rem;"
    )
        b-card-text
            p.mb-0 Id: {{id}}
            p.mb-0 Species: {{species}}
            p Days until watering: {{daysUntilWatering}}
        b-button(variant="primary") Water it
        b-button.ml-2(variant="danger" v-on:click="onDelete") Delete it
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      default: 0,
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
  methods: {
    async onDelete(evt) {
      evt.preventDefault();
      try {
        await this.$axios.delete(
          `${process.env.VUE_APP_API_ENDPOINT}/plants/${this.id}`
        );
        this.$emit("plant-removed", this.id);
      } catch (err) {
        console.log(err);
        this.$bvToast.toast(`Plant could not be removed`, {
          title: "Error",
          variant: "danger",
          solid: true,
        });
      }
    },
  },
};
</script>
