<template>
  <base-layout>
    <template v-slot:sidebar>
      Sidebar
    </template>
    <template v-slot:content>
      <div v-for="(board, index) in getBoardList" :key="`board-display-${board.id}`">
        <v-card class="d-inline-block pa-3 mb-4 max">
          <v-card-title class="pa-0 mb-3" primary-title>{{ board.name }}</v-card-title>
          <fretboard
            :board="board"
            :is-editable="index === 0"
            @note-click="handleNoteClick($event, board)"
            :key="board.id"
          />
        </v-card>
      </div>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from '@/components/BaseLayout'
import Fretboard from '@/components/Fretboard'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    BaseLayout,
    Fretboard
  },
  computed: {
    ...mapGetters(['getBoardList'])
  },

  methods: {
    ...mapActions(['setBoard']),

    handleNoteClick(position, board) {
      if (!board.includesPosition(position)) {
        // Insert position
        board.positions.push(position)
      } else {
        // Remove position
        const { fret, string } = position
        board.positions = board.positions.filter(
          position => position.fret !== fret || position.string !== string
        )
      }
      this.setBoard(board.getBoardState())
    }
  }
}
</script>

<style>
.max {
  max-width: 100% !important;
}
</style>
