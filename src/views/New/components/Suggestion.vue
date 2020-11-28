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
            scientificName : {
                type: String
            },
            commonName : {
                type: String
            },
            imageUrl : {
                type: String,
                default: 'https://e-fisiomedic.com/wp-content/uploads/2013/11/default-placeholder.png'
            }
        },
    }
</script>
