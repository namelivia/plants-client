import { createApp } from 'vue'
import router from './router'
import i18n from './i18n'
import App from './App.vue'
import Toast from 'vue-toastification'
import {
  SectionTitle,
  Loading,
  ResetButton,
  SubmitButton,
  RegularButton,
  DangerButton,
  SecondaryButton,
  Card,
  Selector,
  TextInput,
  NumberInput,
  ImageInput,
  CardGrid,
  Navbar,
  Container,
  StyledTable,
  Pagination,
  ResizeImageUpload,
  Modal,
} from '@namelivia/vue-components'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(Toast)

app.component('Loading', Loading)
app.component('SectionTitle', SectionTitle)
app.component('ResetButton', ResetButton)
app.component('SubmitButton', SubmitButton)
app.component('RegularButton', RegularButton)
app.component('DangerButton', DangerButton)
app.component('SecondaryButton', SecondaryButton)
app.component('Card', Card)
app.component('Selector', Selector)
app.component('TextInput', TextInput)
app.component('NumberInput', NumberInput)
app.component('ImageInput', ImageInput)
app.component('CardGrid', CardGrid)
app.component('Navbar', Navbar)
app.component('Container', Container)
app.component('StyledTable', StyledTable)
app.component('Pagination', Pagination)
app.component('ResizeImageUpload', ResizeImageUpload)
app.component('Modal', Modal)

app.mount('#app')
