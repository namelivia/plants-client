<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    div(v-else)
        img.mb-4(:src="imageUrl")
        p.mb-0 Id: {{ plant.id}}
        p.mb-0 Name: {{ plant.name }}
        p.mb-0 Description: {{ plant.description }}
        p.mb-0 Water every: {{ plant.days_until_watering }} days
        p.mb-0 Last watering: {{formattedLastWatering}}
        p Next watering: {{formattedNextWatering}}
        b-button(variant="danger" v-on:click="onDelete") Delete it
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
import router from "@/router";
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
  computed: {
    formattedLastWatering: function () {
      return new Date(this.plant.last_watering).toLocaleString();
    },
    formattedNextWatering: function () {
      let copy = new Date(this.plant.last_watering);
      let date = new Date(this.plant.last_watering);
      copy.setDate(date.getDate() + this.plant.days_until_watering);
      return copy.toLocaleString();
    },
    imageUrl: function () {
      if (this.plant.image) {
        return process.env.VUE_APP_API_ENDPOINT + this.plant.image;
      }
      return null;
    },
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
    async onDelete(evt) {
      evt.preventDefault();
      try {
        await this.$axios.delete(
          `${process.env.VUE_APP_API_ENDPOINT}/plants/${this.plant.id}`
        );
        router.replace("/list", () => {
          this.$root.$bvToast.toast(`Plant removed`, {
            title: "Success",
            variant: "success",
            solid: true,
          });
        });
      } catch (err) {
        console.log(err);
        this.$bvToast.toast(`Plant could not be removed`, {
          title: "Error",
          variant: "danger",
          solid: true,
        });
      }
    },
  },
};
</script>
