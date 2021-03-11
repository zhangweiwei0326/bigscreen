<template>
 <div class="map" ref="markChart" :style = styleObject></div>
</template>

<script>

export default {
  name: "markMap",
  props: {
        component: Object,
        option: Object,
        time:{
            type:Number,
            default:5000
        },
        url:{
            type:String,
        },
        dataType:{
            type:Number
        },
        data:{},
        dataMethod:{
            type:String,
            default:"GET"
        },
    },
    data() {
        return {
            bannerCount: 0,
            option_2: [],
            flushData:null,
            result:null,
            instance:null
        }
    },
    computed:{
        styleObject: function () {
            return {
                width:this.component.width+"px",
                height:this.component.height+"px"
            }
        },
        bannerTime () {
            return this.option.bannerTime || 3000;
        },
        banner () {
            return this.option.banner;
        },
        scale () {
            return this.option.scale || 100;
        },
    },
    watch: {
        "component.width": function(newValue,oldValue){
            if(newValue!=oldValue){
                if(this.instance){
                    this.instance.resize();
                }
            }
        },
        "component.height": function(newValue,oldValue){
            if(newValue!=oldValue){
                if(this.instance){
                    this.instance.resize();
                }
            } 
        },
        "option":{
            handler() { 
                    this.drawMap(this.result)
            },
            deep: true,
            immediate: true
        },
        dataChartLen () {
            this.setBanner();
        },
        bannerTime () {
            this.setBanner();
        },
        banner:{
            handler () {
                this.setBanner();
            },
            immediate: true
        },
        time:function(newValue,oldValue){
            if(newValue!=oldValue && this.dataType==1){
                clearInterval(this.flushData)
                this.flush();
            }
        },
        data:{
            handler(newValue,oldValue){
                if(newValue!=oldValue){
                    this.result = newValue;
                    this.drawMap(this.result)
                }
            },
            deep:true
        },
        dataType: function(newValue) {
            this.queryData(newValue);
    }
    },
    methods: {
         updateData(){
           this.queryData(this.dataType)
        },
         queryData(type){
            //1:请求远程接口数据
            if(type==1){
                this.getRemoteData();
            }else{
                clearInterval(this.flushData);
                this.flushData = null;
                this.result = this.data;
                this.drawMap(this.result);
            }
        },
        resetBanner () {
            this.$nextTick(() => {
                this.myChart.dispatchAction({
                    type: "hideTip"
                });
                // this.myChart.dispatchAction({
                //   type: "downplay"
                // });
            });
        },
        setBanner () {
            clearInterval(this.bannerCheck);
            if (this.banner) {
                this.bannerCheck = setInterval(() => {
                    const curr = this.bannerCount % this.dataChartLen;
                    this.myChart.dispatchAction({
                        type: "showTip",
                        seriesIndex: "0",
                        dataIndex: curr
                    });
                    this.myChart.dispatchAction({
                        type: "downplay"
                    });
                    this.myChart.dispatchAction({
                        type: "highlight",
                        dataIndex: curr
                    });
                    this.bannerCount += 1;
                }, this.bannerTime);
            }
        },
        drawMap(data) {
            let myCharts = echarts.init(this.$refs.markChart)
            myCharts.setOption({
                title: {
                    text: this.option.title,
                    show: this.option.titleShow || false,
                    textStyle: {
                        fontSize: this.option.titleFontSize || 20,
                        color: this.option.titleColor || "#fff"
                    },
                    left: this.option.titlePostion || "center",
                    subtext:this.option.subtext,
                    subtextStyle: {
                            fontSize: this.option.subTitleFontSize || 20,
                            color: this.option.subTitleColor || "#fff"
                    },
                    
                },
                tooltip: {
                    alwaysShowContent: true,
                    enterable: true,
                    formatter: function (params) {
                        var value = params.value;
                        var a = "<br/> <a href='http://www.baidu.com' style='color: red'>查看详情</a>"
                        return params.name + ": " + value[2] + a;
                    },
                    textStyle: {
                        fontSize: this.option.tipFontSize,
                        color: this.option.tipColor || "#fff"
                    }
                },

                geo: {
                    map: "china",
                    roam: true,
                    zoom: this.zoomData,
                    layoutCenter : ['50%', '50%'],
                    layoutSize : "100%",
                    silent: true,
                    itemStyle: {
                        areaColor: this.option.areaColor || "#004981",
                        borderWidth: this.option.borderWidth,
                        borderColor:this.option.borderColor || "rgb(54,192,118)"
                    },
                    label: {
                        normal: {
                            show: true, // 是否显示对应地名
                            textStyle: {
                                color: this.option.color || "rgba(255,255,255,0.8)"
                            }
                        },
                    },
                    left: this.option.gridX,
                    top: this.option.gridY,
                    right: this.option.gridX2,
                    bottom: this.option.gridY2,
                },
                series: [
                  {
                    type: "effectScatter",
                    coordinateSystem: "geo",
                    itemStyle: {
                        color: function (params) {
                            var color = "";
                            var value = params.value;
                            if (value[2] < 50) {
                                color = "red"
                            }
                            if (value[2] >= 50 && value[2] < 100) {
                                color = "yellow"
                            }
                            if (value[2] >= 100) {
                                color = "green"
                            }
                            return color;
                        }
                    },
                    hoverAnimation: true,
                    data: data
                }
              ]
            })
            myCharts.on("mouseover", () => {
                clearInterval(this.bannerCheck);
                this.resetBanner();
            });
            myCharts.on("mouseout", () => {
                this.bannerCount = 0;
                this.setBanner();
            });
            myCharts.on("georoam", () => {
                const option = myCharts.getOption();
                const geo = option.geo[0];
                this.centerData = geo.center;
                this.zoomData = geo.zoom;
                if (this.zoomData < 1) this.zoomData = 1;
            });
            window.addEventListener('resize', function () {
                myCharts.resize()
            })
             myCharts.hideLoading();
            this.instance = myCharts;
        },
        flush(){
            this.flushData = setInterval(()=>{
                this.getRemoteData();
            },this.time)
        },
        getRemoteData(){
            axios({
                url: this.url,
                method: this.dataMethod
            }).then(res=>{
                this.result = res.data;
                this.drawMap(this.result)

            });
            if(!this.flushData){
                this.flush();
            }
        },
    },
    mounted(){
         axios.get(this.option.chinaMapUrl).then(res=>{
            if(res.data){
                echarts.registerMap("china",res.data)
                this.queryData(this.dataType)
            }
        })
       
        this.result = this.data;
        this.drawMap(this.result);

    }
}
</script>

<style>

</style>
