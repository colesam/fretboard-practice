<template>
  <div>
    <v-navigation-drawer app clipped :input="true">
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
  }
}
</script>

<style lang="scss" scoped></style>
