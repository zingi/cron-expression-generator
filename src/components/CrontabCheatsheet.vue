<template>
  <div id="crontabCheatsheetContainer">
    <header class="inputHeader">
      <h2>Crontab Cheatsheet</h2>
    </header>
    <div class="commandsContainer">
      <div v-for="(item, index) in commands" :key="index" class="commandContainer">
        <span class="description">{{ item.description }}</span>
        <button class="command" @click="commandClicked(item.command)">$ {{ item.command }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CrontabCheatsheet',
  data () {
    return {
      commands: [
        { command: 'crontab -l', description: 'display the crontab file' },
        { command: 'crontab -e', description: 'edit or create a crontab file if it doesn’t already exist' },
        { command: 'crontab -r', description: 'remove the crontab file' }
      ]
    }
  },
  methods: {
    commandClicked (command) {
      this.$clipboard(command)
      this.$toasted.show('command copied')
    }
  }
}
</script>

<style scoped>

.commandsContainer {
  user-select: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.commandContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.description {
  font-size: 0.5rem;
  text-decoration: underline;
}

.command {
  display: block;
  margin-top: 5px;
  padding: 5px;
  border: none;

  background: #41295a;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #2F0743, #41295a);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #2F0743, #41295a); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  color: white;
  font-family: Inconsolata, monospace;
  font-size: 1rem;
  text-shadow: 0 0 5px #C8C8C8;

  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
</style>
