<template>
  <my-archives :id="$route.query.id" />
</template>

<script>
// postArchives
import MyArchives from './MyArchives'
export default {
  components: {
    MyArchives
  }
}
</script>
