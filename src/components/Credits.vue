<template>
  <div id="creditsContainer">
    <a href="https://raw.githubusercontent.com/zingi/cron-expression-generator/master/LICENSE">
      <img alt="licesnce" src="/assets/license.svg">
    </a>

    <p>bachelor thesis @ <a href="https://www.cvast.tuwien.ac.at">TU Wien</a>,</p>

    <p><a href="https://twitter.com/messages/compose?recipient_id=936710110411411461">Aaron Zingerle</a></p>
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
    color: black;
  }

  p {
    margin-left: 20px;
    font-size: 1rem;
  }
</style>
