<template lang="pug">
section
    form(@submit="onSubmit" v-if="show")
      text-input(
        :name="message"
        :label="$t('addJournalEntry.insertEntryManually')"
        :text="form.message"
        :placeholder="$t('addJournalEntry.messageContent')"
        @update="form.message = $event"
        required
      )
      submit-button(:text="$t('addJournalEntry.add')" id="add-journal-entry-submit")
</template>
<script>
import { postJournalEntry } from '@/apis/apis'
import { useToast } from 'vue-toastification'
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
  emits: ['newJournalEntry'],
  methods: {
    async onSubmit(evt) {
      const toast = useToast()
      try {
        evt.preventDefault()
        await postJournalEntry(this.plantId, this.form)
        toast.success(`Journal entry added`)
        this.$emit('newJournalEntry', this.form.message)
        this.form.message = ''
      } catch (err) {
        toast.error(`Journal entry could not be added`)
      }
    },
  },
}
</script>
