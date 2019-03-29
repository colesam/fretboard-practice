<template>
  <div>
    <v-navigation-drawer v-if="sidebarIncluded" app clipped :input="true">
      <slot name="sidebar"></slot>
    </v-navigation-drawer>
    <v-content>
      <v-container>
        <slot name="content"></slot>
      </v-container>
    </v-content>
    <navbar />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  },

  computed: {
    sidebarIncluded() {
      return this.$slots.sidebar !== undefined
    }
  }
}
</script>

<style lang="scss" scoped></style>
