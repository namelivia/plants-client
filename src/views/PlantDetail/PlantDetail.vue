<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    .content(v-else)
        h1 Loaded
</template>

<script>
export default {
  props: {
    plantId: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      journal: null,
      loading: true,
    };
  },
  mounted: function () {
    this.loadJournal();
  },
  methods: {
    async loadJournal() {
      try {
        const response = await this.$axios.get(
          `${process.env.VUE_APP_API_ENDPOINT}/plants/${this.plantId}/journal`
        );
        this.journal = response.data;
        console.log(this.journal);
      } catch (err) {
        this.$bvToast.toast(`Journal can't be retrieved`, {
          title: "Error",
          variant: "danger",
          solid: true,
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
