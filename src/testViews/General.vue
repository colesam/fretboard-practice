<template>
  <base-layout>
    <template v-slot:content>
      Test
    </template>
  </base-layout>
</template>

<script>
import { NOTES } from '@/globals'
import BaseLayout from '@/components/BaseLayout'

export default {
  components: {
    BaseLayout
  },

  data() {
    return {
      NOTES
    }
  }
}
</script>

<style lang="scss" scoped></style>
