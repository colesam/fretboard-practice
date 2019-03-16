<template>
  <button
    class="root-toggle btn btn-outline-primary btn-sm"
    :class="{ active: isActive }"
    @click="handleClick()"
  >
    {{ root }}
  </button>
</template>

<style lang="scss" scoped>
.root-toggle {
  width: 50px;
  margin-right: 10px;
  transition: all 0.1s;

  &.active {
    background: #0069d9;
  }
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    root: String
  },

  methods: {
    ...mapActions(['setActiveRoot']),

    handleClick() {
      this.setActiveRoot(this.root)
    }
  },

  computed: {
    ...mapGetters(['activeRoot']),

    isActive() {
      return this.root === this.activeRoot
    }
  }
}
</script>
