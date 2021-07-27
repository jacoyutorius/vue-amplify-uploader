// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import Amplify from "aws-amplify"
// import aws_exports from './aws-exports'
import awsConfig from "./aws-config"
import { 
  applyPolyfills,
  defineCustomElements
} from '@aws-amplify/ui-components/loader'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopy as farCopy } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(farCopy)
require('./assets/sass/main.scss')

Amplify.configure(awsConfig)

applyPolyfills().then(() => {
  defineCustomElements(window);
})

const app = createApp(App);
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('amplify-')
app.component('fa', FontAwesomeIcon )
app.mount('#app')