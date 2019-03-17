<template>
  <div class="note-interface">
    <div
      v-for="(fret, fretIndex) in noteMatrix"
      class="note-interface__fret"
      :class="`fret-${fretIndex}`"
      :key="`fret--${fretIndex}`"
    >
      <note
        v-for="(note, stringIndex) in fret"
        :content="notePreferences[note]"
        :note-class="`note__content--${semitonesFromRoot[note]}`"
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
import BoardHelpers from '@/helpers/BoardHelpers'

/**
 * Handles all the functionality of the parent Fretboard component
 * @namespace Components.NoteInterface
 *
 * @vue-prop {Array[]} noteMatrix - 2D array of notes on the fretboard
 * @vue-prop {Object} notePreferences - Object of preferred note names
 * @vue-prop {String} root - Root note of the fretboard
 * @vue-prop {Position[]} [positions=[]] - Active positions to display
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
    noteMatrix: {
      type: Array,
      required: true
    },
    notePreferences: {
      type: Object,
      required: true
    },
    root: {
      type: String,
      required: true
    },
    positions: {
      type: Array,
      default: () => []
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    calculateSemitonesFromRoot(note) {
      const rootIndex = NOTES.indexOf(this.root)
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
    },

    positionIsActive(position) {
      return BoardHelpers.boardIncludesPosition(this.positions, position)
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
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  padding: $note-padding--vertical 0;
}
</style>
