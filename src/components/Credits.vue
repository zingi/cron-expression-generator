<template>
  <div id="creditsContainer">
    <a href="https://raw.githubusercontent.com/zingi/cron-expression-generator/master/LICENSE">
      <img alt="licesnce" src="/assets/license.svg">
    </a>

    <p>bachelor thesis @ TU Wien,</p>

    <p>Aaron Zingerle</p>
  </div>
</template>

<script>
export default {
  name: 'Credits'
}
</script>

<style scoped>
  #creditsContainer {
    display: flex;
    justify-content: center;
  }

  a,p {
    display: inline-block;
    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */
  }

  p {
    margin-left: 20px;
    font-size: 1rem;
  }
</style>
