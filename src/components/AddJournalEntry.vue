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
  methods: {
    async onSubmit(evt) {
      const toast = useToast()
      try {
        evt.preventDefault()
        await postJournalEntry(this.plantId, this.form)
        toast.success(`Journal entry added`)
        this.onReset()
      } catch (err) {
        toast.error(`Journal entry could not be added`)
      }
    },
  },
}
</script>
