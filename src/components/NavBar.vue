<template>
  <nav>
    <router-link class="link" to="/">Jobs</router-link>
    <router-link class="link" to="/regions">Regions</router-link>
  </nav>
</template>

<style scoped>
nav {
  padding: 1.5em;
  margin-bottom: 1em;
  background-color: var(--color-background-soft);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  display: flex;
  flex-direction: row;
  column-gap: 1em;
}
a {
  color: white;
  border: 1px solid var(--color-border);
  text-decoration: none;
  font-weight: 600;
  padding: 0.5em 1em;
  border-radius: 4px;
}

.link:hover {
  border: 1px solid var(--color-border-hover);
}

.router-link-active {
  border: 1px solid #008100;
  background-color: var(--color-background-mute);
}

.router-link-active:hover {
  border: 1px solid #0d9b0d;
}
</style>
