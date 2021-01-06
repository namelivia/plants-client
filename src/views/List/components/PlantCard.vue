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
            p.mb-0 Water every: {{daysUntilWatering}} days
            p.mb-0 Last watering: {{formattedLastWatering}}
            p Next watering in {{untilNextWatering}} days ({{formattedNextWatering}})
        b-button(variant="primary" v-on:click="onWater") Water it
        b-button.ml-2(variant="danger" v-on:click="onDelete") Delete it
        router-link(:to="{ name: 'plant', params: { plantId: id}}") Details
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
    daysUntilWatering: {
      type: Number,
      default: 0,
    },
    imagePath: {
      type: String,
      default: "@/assets/images/image-placeholder.png",
    },
    lastWatering: {
      type: String,
      default: "",
    },
  },
  computed: {
    imageUrl: function () {
      if (this.imagePath) {
        return process.env.VUE_APP_API_ENDPOINT + this.imagePath;
      }
      return null;
    },
    formattedLastWatering: function () {
      return new Date(this.lastWatering).toLocaleString();
    },
    formattedNextWatering: function () {
      let copy = new Date(this.lastWatering);
      let date = new Date(this.lastWatering);
      copy.setDate(date.getDate() + this.daysUntilWatering);
      return copy.toLocaleString();
    },
    untilNextWatering: function () {
      let nextWatering = new Date(this.lastWatering);
      let date = new Date(this.lastWatering);
      nextWatering.setDate(date.getDate() + this.daysUntilWatering);
      const now = new Date();
      let diff = (nextWatering.getTime() - now.getTime()) / 1000;
      diff /= 86400;
      return Math.round(diff);
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
    async onWater(evt) {
      evt.preventDefault();
      try {
        const response = await this.$axios.post(
          `${process.env.VUE_APP_API_ENDPOINT}/plants/${this.id}/water`
        );
        this.$emit("plant-watered", this.id, response);
      } catch (err) {
        console.log(err);
        this.$bvToast.toast(`Plant could not be watered`, {
          title: "Error",
          variant: "danger",
          solid: true,
        });
      }
    },
  },
};
</script>
