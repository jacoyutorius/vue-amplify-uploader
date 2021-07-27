<template>
  <div v-if="show" class="notification is-danger">
    <button @click="onHideMessage" class="delete"></button>
    {{ message }}
  </div>
</template>

<script>
import { reactive, computed } from "vue"
export default {
  name: "Message",
  props: {
    message: {
      type: String,
      default: ""
    },
    messageType: {
      type: String,
      default: "is-danger"
    }
  },
  setup(props) {
    const state = reactive({
      disabled: props.message === "",
      messageType: props.messageType
    })
    const show = computed(() => !state.disabled )
    const onHideMessage = () => {
      state.disabled = true
    }
    return {
      state,
      show,
      onHideMessage
    }
  }
}
</script>
