<template lang="pug">
section
    form(@submit="onSubmit" v-if="show")
      text-input(
        :name="message"
        :label="$t('addJournalEntry.insertEntryManually')"
        :placeholder="$t('addJournalEntry.messageContent')"
        @update="form.message = $event"
        required
      )
      submit-button(:text="$t('addJournalEntry.add')")
</template>
<script>
import { postJournalEntry } from '@/apis/apis'
//import { errorToast, okToast } from '@/helpers/ui'
export default {
  props: {
    plantId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      form: {
        message: '',
      },
      show: true,
    }
  },
  methods: {
    async onSubmit(evt) {
      try {
        evt.preventDefault()
        await postJournalEntry(this.plantId, this.form)
        //this.$bvToast.toast(`Journal entry added`, okToast)
        this.onReset()
      } catch (err) {
        //this.$bvToast.toast(`Journal entry could not be added`, errorToast)
      }
    },
  },
}
</script>
