<template>
  <div class="modal" :class="activeClass">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Image</p>
        <button @click="modalOpen" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <amplify-s3-image-picker
          headerTitle=""
          headerHint="" />
      </section>
    </div>
  </div>
</template>

<script>
import { computed } from "vue"

export default {
  name: "ModalUploader",
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  emits: ["modalOpen"],
  setup(props, context) {
    const modalOpen = () => context.emit("modalOpen", false)
    const activeClass = computed(() => props.active ? 'is-active' : '')

    return {
      modalOpen,
      activeClass
    }
  }
}
</script>