<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  beforeRouteLeave(to, from, next) {
    // console.log(to)
    localStorage.removeItem('satisfaction')
    localStorage.removeItem('question')
    next()
  }
}
</script>
