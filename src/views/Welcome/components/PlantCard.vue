<template lang="pug">
div
  card(:image="imageUrl" :title="name" @width="onWidth" :dismissed="dismissed")
    p {{ $t("plantCard.nextWatering", { days: untilNextWatering}) }}
    regular-button(@click="onWater" :text="$t('plantCard.waterIt')")
    router-link(:to="{ name: 'plant', params: { plantId: id}}")
      secondary-button(:text="$t('plantCard.details')")
</template>
<script>
import { getImageUrl } from '@/apis/helpers'
import { waterPlant } from '@/apis/apis'
import { useToast } from 'vue-toastification'
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
    waterEvery: {
      type: Number,
      default: 0,
    },
    untilNextWatering: {
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
      dismissed: false,
    }
  },
  emits: ['plant-watered'],
  methods: {
    async onWater(evt) {
      const toast = useToast()
      evt.preventDefault()
      try {
        const response = await waterPlant(this.id)
        this.$emit('plant-watered', this.id, response)
        this.dismissed = true
      } catch (err) {
        console.log(err)
        toast.error(`Plants could not be watered`)
      }
    },
    onWidth(width) {
      this.imageUrl = getImageUrl(this.imagePath, width)
    },
  },
}
</script>
