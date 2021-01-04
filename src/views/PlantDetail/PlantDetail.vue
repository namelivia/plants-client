<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    b-card-group(v-else rows)
        journal-entry(
            v-for='entry in journal' :key='entry.id'
            :message="entry.message"
            :timestamp="entry.timestamp"
        )
</template>

<script>
import JournalEntry from "./components/JournalEntry";
export default {
  components: {
    JournalEntry: JournalEntry,
  },
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
