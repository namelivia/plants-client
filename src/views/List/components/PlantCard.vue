<template lang="pug">
div
  card
    card-image(:src="imageUrl" :alt="name" @width="onWidth")
    card-body(:title="name")
      p {{ $t("plantCard.nextWatering", { days: untilNextWatering}) }}
      regular-button(@click="onWater" :text="$t('plantCard.waterIt')")
      router-link(:to="{ name: 'plant', params: { plantId: id}}")
          secondary-button(:text="$t('plantCard.details')")
</template>
<script>
import { getImageUrl } from '@/apis/helpers'
import { waterPlant } from '@/apis/apis'
//import { errorToast } from '@/helpers/ui'
export default {
  props: {
    name: {
      type: String,
      default: '',
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
      default: '@/assets/images/image-placeholder.png',
    },
    lastWatering: {
      type: String,
      default: '',
    },
  },
  data: function () {
    return {
      imageUrl: null,
    }
  },
  computed: {
    untilNextWatering: function () {
      let nextWatering = new Date(this.lastWatering)
      let date = new Date(this.lastWatering)
      nextWatering.setDate(date.getDate() + this.daysUntilWatering)
      const now = new Date()
      let diff = (nextWatering.getTime() - now.getTime()) / 1000
      diff /= 86400
      return Math.round(diff)
    },
  },
  emits: ['plant-watered'],
  methods: {
    async onWater(evt) {
      evt.preventDefault()
      try {
        const response = await waterPlant(this.id)
        this.$emit('plant-watered', this.id, response)
      } catch (err) {
        console.log(err)
        //this.$bvToast.toast(`Plants could not be watered`, errorToast)
      }
    },
    onWidth(width) {
      this.imageUrl = getImageUrl(this.imagePath, width)
    },
  },
}
</script>
