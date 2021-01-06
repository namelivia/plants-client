<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    div(v-else)
        p.mb-0 Id: {{ plant.id}}
        p.mb-0 Name: {{ plant.name }}
        p.mb-0 Description: {{ plant.description }}
        journal-entry(
            v-for='entry in journal' :key='entry.id'
            :message="entry.message"
            :timestamp="entry.timestamp"
        )
    add-journal-entry.mt-4(:plant-id="this.plantId")
</template>

<script>
import JournalEntry from "./components/JournalEntry";
import AddJournalEntry from "./components/AddJournalEntry";
export default {
  components: {
    JournalEntry: JournalEntry,
    AddJournalEntry: AddJournalEntry,
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
      plant: null,
      loading: true,
    };
  },
  mounted: function () {
    this.loadJournal();
    this.loadPlant();
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
    async loadPlant() {
      try {
        const response = await this.$axios.get(
          `${process.env.VUE_APP_API_ENDPOINT}/plants/${this.plantId}`
        );
        this.plant = response.data;
      } catch (err) {
        this.$bvToast.toast(`Plant can't be retrieved`, {
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
