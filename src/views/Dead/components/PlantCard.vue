<template lang="pug">
div
  card
    card-image(:src="imageUrl" :alt="name" @width="onWidth")
    card-body(:title="name")
      router-link(:to="{ name: 'plant', params: { plantId: id}}")
          secondary-button(:text="$t('plantCard.details')")
</template>
<script>
import { getImageUrl } from '@/apis/helpers'
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
    imagePath: {
      type: String,
      default: '@/assets/images/image-placeholder.png',
    },
  },
  data: function () {
    return {
      imageUrl: null,
    }
  },
  methods: {
    onWidth(width) {
      this.imageUrl = getImageUrl(this.imagePath, width)
    },
  },
}
</script>
