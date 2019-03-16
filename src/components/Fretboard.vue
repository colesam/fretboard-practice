<template>
  <div class="fretboard-wrapper">
    <div class="fretboard">
      <!-- Displays the fretboard background (no functionality)-->
      <div class="fretboard__display">
        <div v-if="startingFret === 0" class="fretboard__nut fret-0"></div>
        <div class="d-flex flex-row justify-content-start align-items-stretch w-100">
          <div
            v-for="(fret, fretIndex) in frets"
            class="fretboard__fret"
            :class="`fret-${fretIndex}`"
            :key="`fret-${fretIndex}`"
            :ref="`fret-${fretIndex}`"
          >
            <!-- For now strings are hardcoded to mandolin, eventually make dynamic -->
            <div class="fretboard__strings">
              <div class="fretboard__string-wrapper">
                <div class="fretboard__string--lightest"></div>
                <div class="fretboard__string--lightest"></div>
              </div>
              <div class="fretboard__string-wrapper">
                <div class="fretboard__string--light"></div>
                <div class="fretboard__string--light"></div>
              </div>
              <div class="fretboard__string-wrapper">
                <div class="fretboard__string--heavy"></div>
                <div class="fretboard__string--heavy"></div>
              </div>
              <div class="fretboard__string-wrapper">
                <div class="fretboard__string--heaviest"></div>
                <div class="fretboard__string--heaviest"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <note-interface
        :note-matrix="noteMatrix"
        :note-preferences="notePreferences"
        :root="root"
        :is-editable="isEditable"
        @note-click="handleNoteClick"
      />
    </div>
  </div>
</template>

<script>
import NoteInterface from '@/components/NoteInterface'

/**
 * Visual component, deligates all functionality to NoteInterface
 * @namespace Components.Fretboard
 *
 * @vue-prop {Array[]} noteMatrix - 2D array of notes on the fretboard
 * @vue-prop {Object} notePreferences - Object of preferred note names
 * @vue-prop {String} root - Root note of the fretboard
 * @vue-prop {Number} numFrets - Number of frets in the board (including nut)
 * @vue-prop {Boolean} [isEditable=false] - Whether positions can be toggled on or off
 * @vue-prop {Number} [startingFret=0] - First fret of the fretboard (alters styling)
 *
 * @vue-event {Position} note-click - Emit position of note that was clicked
 */
export default {
  components: {
    NoteInterface
  },

  computed: {
    frets() {
      // If startingFret is 0, chop off last fret because nut is included (display issue only)
      return this.startingFret === 0 ? this.numFrets - 1 : this.numFrets
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
    numFrets: {
      type: Number,
      required: true
    },
    isEditable: {
      type: Boolean,
      default: false
    },
    startingFret: {
      type: Number,
      default: 0
    }
  },

  methods: {
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

.fretboard-wrapper {
  max-width: 100% !important;
  overflow-x: auto;
}

.fretboard {
  background: rgb(43, 38, 35);
  background: -moz-linear-gradient(
    0deg,
    rgba(43, 38, 35, 1) 0%,
    rgba(60, 49, 42, 1) 50%,
    rgba(43, 38, 35, 1) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(43, 38, 35, 1) 0%,
    rgba(60, 49, 42, 1) 50%,
    rgba(43, 38, 35, 1) 100%
  );
  background: linear-gradient(
    0deg,
    rgba(43, 38, 35, 1) 0%,
    rgba(60, 49, 42, 1) 50%,
    rgba(43, 38, 35, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2b2623", endColorstr="#2b2623", GradientType=1);

  position: relative;
  height: ($note-size * 4) + ($note-padding--vertical * 8);
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
}

.fretboard__display {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
}

.fretboard__nut {
  width: 100px;
  background: #564c45;
  border-right: 4px solid #d8d8d8;
  box-sizing: border-box;
}

.fretboard__fret {
  width: 100px;
  position: relative;
  border-right: 2px solid #564c45;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  &:last-of-type {
    border-right: none;
  }
}

.fretboard__fret:last-child > .fretboard__strings {
  right: 0 !important;
}

.fretboard__strings {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: -2px; // overlap border

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
  padding: $note-padding--vertical 0;
}

.fretboard__string-wrapper {
  height: 25%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}

%fretboard__string {
  background: #bdbdbd;
  box-shadow: 0 0 1px black;
  height: 1px;
  margin: 3px 0;
}

.fretboard__string--lightest {
  @extend %fretboard__string;
}

.fretboard__string--light {
  @extend %fretboard__string;
}

.fretboard__string--heavy {
  @extend %fretboard__string;
  background: #b56c1b
    repeating-linear-gradient(
      290deg,
      rgb(181, 108, 27) 48.5%,
      rgb(52, 46, 43) 50%,
      rgb(181, 108, 27) 51.5%
    );
  height: 2px;
}

.fretboard__string--heaviest {
  @extend %fretboard__string;
  background: #b56c1b
    repeating-linear-gradient(
      290deg,
      rgb(181, 108, 27) 48.5%,
      rgb(52, 46, 43) 50%,
      rgb(181, 108, 27) 51.5%
    );
  height: 3px;
}

.fretboard__dot {
  width: 23px;
  height: 23px;
  border-radius: 50px;
  background: #d6bc93; /* potentially replace with abalone pattern */
}

.w-100 {
  width: 100%;
}
</style>
