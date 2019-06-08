<template>
  <button @click="buttonClicked" :class="{selectAll: !isAllSelected, unselectAll: isAllSelected}">{{ isAllSelected ? 'Unselect All' : 'Select All' }}</button>
</template>

<script>
export default {
  name: 'SelectAllButton',
  data () {
    return {
      isAllSelected: false
    }
  },
  props: {
    expression: {
      type: String,
      required: true
    }
  },
  methods: {
    buttonClicked () {
      this.$emit('selectAllClicked', !this.isAllSelected)
    }
  },
  watch: {
    expression (newVal, oldVal) {
      if (newVal === '*') {
        this.isAllSelected = true
      }
      else {
        this.isAllSelected = false
      }
    }
  }
}
</script>

<style scoped>
  button {
    border: none;
    border-radius: 3px;
    padding: 3px 6px 3px 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }
  button:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }

  .selectAll {
    background: lightyellow;
  }

  .unselectAll {
    background: lightgreen;
  }
</style>


