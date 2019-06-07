<template>
  <label :style="{borderRadius: radius + 'px'}">
    <input type="checkbox" v-model="checked">
    <span class="content" :id="toggleId" :style="{fontSize: fs, borderRadius: radius + 'px'}">{{ content }}</span>
  </label>
</template>

<script>
export default {
  name: 'ToggleButton',
  data () {
    return {
      checked: false
    }
  },
  props: {
    toggleId: String,
    content: String,
    fs: {
      type: String,
      default: '1em'
    },
    radius: {
      type: Number,
      default: 3
    }
  },
  watch: {
    checked (val) {
      this.$emit('toggled', val)
    }
  }
}
</script>

<style scoped>
  label {
    user-select: none;
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    background: lightyellow;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  label input {
    display: none;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .content {
    display: inline-block;
    cursor: pointer;

    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  input:checked + .content {
    background-color: lightgreen;
  }
</style>