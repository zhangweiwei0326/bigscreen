<template>
  <div style="position: relative;overflow: hidden;height: 100%;width: 100%">
     <div v-for="(item,index) in newDataList" style="height: 20%;width: 80%;position: relative;overflow: hidden;
      transition: top 0.5s;" :option="animateOption" :style="{top}" :key="index">
          <img :src="item.img_url" alt="banner" style="height: 100%;width: 100%;text-align: center;">
     </div>
  </div>
</template>

<script>
export default {
  name:"slippage",
  props: {
        component: Object,
        option: Object,
    },
    data() {
        return {
          animateOption: {
                bannData: this.dataList,
            },
            dataList: [],
            activeIndex: 0,
            animate: true,
            timer2: '',
            timeOut: ''
        }
    },
    created(){
        const timer = setInterval(this.scroll,2000)
        this.$once('hook:beforeDestroy', () => {
            clearInterval(timer)
        })

    },
    computed: {
        option_2 () {
            return this.component.option|| {}
        },
        top() {
            return -this.activeIndex * 20 + '%';
        },
        newAnimateOption(){
            this.animateOption.bannData = this.option.bannData
            return this.animateOption
        },
        newDataList(){
      
            if(this.option.bannData) {
                this.dataList = eval(this.option.bannData)
            }
            return this.dataList
        },
    },
    
    mounted() {
        this.timer2 = setInterval(() => {
            if(this.activeIndex < this.dataList.length) {
                this.activeIndex += 1
                // this.dataList.push(this.dataList[this.activeIndex])
            } else {
                this.activeIndex = 0
            }

        }, 2000);
    },
    methods: {

        scroll(){
            this.animate = true
            this.timeOut = setTimeout(() => {
                this.dataList.push(this.dataList[0])
                this.dataList.shift()
                this.animate = false
            },2000)
        }
    },
    beforeDestroy() {
        if(this.dataList.length == 0){
            clearInterval(this.timer)
        }
        clearInterval(this.timer2)
        clearTimeout(this.timeOut)
    }
}
</script>

<style>

</style>