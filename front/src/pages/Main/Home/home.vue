<template>
  <div id="home" @click.stop="clsModal">
    <div class="">
       <router-view></router-view>
    </div>
    <div class="special">
      <put-question></put-question>
      <writeIdea></writeIdea>
      <z-drop></z-drop>
      <remind-list :reminds="['suggest','toTop']"></remind-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import PutQuestion from 'z_components/putQuestion.vue';
import writeIdea from 'z_components/writeIdea.vue';
import zDrop from 'z_components/zDrop.vue';
import {mapMutations} from 'vuex';
import remindList from 'base/remind-list.vue';
import axios from 'axios'
  export default {  
    methods: {
        clsModal() {
          this.setIndexDropDown(false)
        },
        ...mapMutations({
          setIndexDropDown: 'SET_INDEX_DROPDOWN',
        })
      },
      components: {
        PutQuestion,
        writeIdea,
        zDrop,
        remindList
      }
    
  }
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('./cpLess/home.less');
</style>
