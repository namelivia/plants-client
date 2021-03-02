<template lang="pug">
    b-card.mb-2.no-body(
        style="max-width: 20rem;"
    )
        b-card-img-lazy(:src="imageUrl" :alt="name" top)
        b-card-body(:title="name")
            b-card-text
                p {{ $t("plantCard.nextWatering", { days: untilNextWatering}) }}
            b-button(variant="primary" size="lg" v-on:click="onWater" v-t="'plantCard.waterIt'")
            router-link(:to="{ name: 'plant', params: { plantId: id}}")
                b-button.ml-2(v-t="'plantCard.details'")
</template>
<script>
import { getImageUrl } from "@/apis/helpers";
import { waterPlant } from "@/apis/apis";
import { errorToast } from "@/helpers/ui";
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
        return getImageUrl(this.imagePath);
      }
      return null;
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
    async onWater(evt) {
      evt.preventDefault();
      try {
        const response = await waterPlant(this.id);
        this.$emit("plant-watered", this.id, response);
      } catch (err) {
        console.log(err);
        this.$bvToast.toast(`Plants could not be watered`, errorToast);
      }
    },
  },
};
</script>
