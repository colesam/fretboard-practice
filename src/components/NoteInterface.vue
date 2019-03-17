<template>
  <div class="note-interface">
    <div
      v-for="(fret, fretIndex) in board.getNoteMatrix()"
      class="note-interface__fret"
      :class="`fret-${fretIndex}`"
      :key="`fret--${fretIndex}`"
    >
      <note
        v-for="(note, stringIndex) in fret"
        :content="board.notePreferences[note]"
        :note-class="`note__content--${semitonesFromRoot[note]}`"
        :is-active="board.includesPosition({ fret: fretIndex, string: stringIndex })"
        :key="`note--${fretIndex}-${stringIndex}`"
        :ref="`note--${fretIndex}-${stringIndex}`"
        @click="handleNoteClick({ fret: fretIndex, string: stringIndex })"
      ></note>
    </div>
  </div>
</template>

<script>
import { NOTES } from '@/globals'
import Note from '@/components/Note'
import Board from '@/classes/Board'

/**
 * Handles all the functionality of the parent Fretboard component
 * @namespace Components.NoteInterface
 *
 * @vue-prop {Board} board - Board object to display
 * @vue-prop {Boolean} [isEditable=false] - Whether positions can be toggled on or off
 *
 * @vue-event {Position} note-click - Emit position of note that was clicked
 */
export default {
  components: {
    Note
  },

  computed: {
    semitonesFromRoot() {
      let semitonesObj = {}
      NOTES.forEach(note => {
        semitonesObj[note] = this.calculateSemitonesFromRoot(note)
      })
      return semitonesObj
    }
  },

  props: {
    board: {
      type: Board,
      required: true
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    calculateSemitonesFromRoot(note) {
      const rootIndex = NOTES.indexOf(this.board.root)
      let semitones
      for (let i = 0; i < 12; i++) {
        if (NOTES[(rootIndex + i) % 12] === note) {
          semitones = i
        }
      }
      return semitones
    },

    handleNoteClick(position) {
      if (this.isEditable) {
        this.$emit('note-click', position)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_fretboard.scss';

.note-interface {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
}

.note-interface__fret {
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  padding: $note-padding--vertical 0;
}
</style>
