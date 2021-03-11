<template>
  <div class="build views">
    <container ref="container"></container>
  </div>
</template>
<style scoped>
 .views >>>.avue-draggable {
  border: none!important;
  background-color:transparent!important;
 }
 .views >>> .avue-draggable__line--label{color: transparent;}
 .views >>>.avue-draggable__line--top{border-left: none;}
 .views >>>.avue-draggable__line--left {border-top: none;}
 .views >>> .avue-draggable__range {background-color: transparent;}
</style>
<script>
import init from '@/mixins/'
import { getHashString } from '@/utils/utils.js'
export default {
  created () {
    let title = getHashString("title");
    if(title){
      document.title = title;
    }
  },
  mixins: [init],
}
</script>
<style lang="scss">
@import "../styles/style.scss";
</style>
