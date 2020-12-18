<template lang="pug">
    b-card.mb-2(
        :title="scientificName"
        :img-alt="commonName"
        :img-src="imageUrl"
        img-top
        style="max-width: 20rem;"
    )
</template>
<script>
export default {
  props: {
    scientificName: {
      type: String,
      default: "",
    },
    commonName: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "@/assets/images/image-placehoder.png",
    },
  },
};
</script>
