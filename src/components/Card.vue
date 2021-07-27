<template>
  <div class="card" @click="onCopy">
    <div class="card-image">
      <amplify-s3-image :img-key="item.path"></amplify-s3-image>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-6">
            <fa :icon='["far", "copy"]' />
            {{ item.path }}
          </p>
        </div>
      </div>

      <div class="content">
        <time datetime="2016-1-1">{{ item.lastModified }}</time>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: "Card",
  props: {
    item: Object
  },
  setup(props) {
    const publicUrl = computed(() => {
      return [
        process.env.VUE_APP_CLOUDFRONT_ENDPOINT,
        "public",
        props.item.path
      ].join("/")
    })
    const onCopy = async () => {
      if(!navigator.clipboard) {
        alert("このブラウザはクリップボードへのコピーに対応していません！")
        return
      }
      await navigator.clipboard.writeText(publicUrl.value).catch(e => console.error(e))
      alert("コピーしました！")
    }
    return {
      publicUrl,
      onCopy
    }
  }
}
</script>

<style>
.card {
  cursor: pointer
} 
</style>
