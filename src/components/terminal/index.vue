<template>
    <div class="diagram" ref="terminalChart"  :style = styleObject>

    </div>
</template>

<script>

    export default {
        name: "terminal",
        props: {
           option: {
              type: Object
           },
            component: Object,
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
        computed:{
            styleObject: function () {
                return {
                    width:this.component.width + "px",
                    height:this.component.height + "px"
                }
            },
            switchTheme() {
                return this.option.switchTheme;
            },
        },
        watch: {
            "component.width": function(newValue,oldValue){
                if(newValue != oldValue){
                    if(this.instance){
                        this.instance.resize();
                    }
                }
            },
            "component.height": function(){
                if(this.instance){
                        this.instance.resize();
                    }
            },
            
            "option":{
                 handler() { 
                     this.drawBar(this.result)
                 },
                 deep: true,
            },
            time:function(newValue,oldValue){
                if(newValue != oldValue && this.dataType == 1){
                    clearInterval(this.flushData)
                    this.flush();
                }
            },
            data:{
                handler(newValue,oldValue){
                    if(newValue != oldValue){
                        this.result = newValue;
                        this.drawBar(this.result)
                    }
                },
                deep:true
            },

            dataType:function(newValue){//1:请求远程接口数据
                this.queryData(newValue);
            },
        },
          data() {
            return {
                result: [], 
                flushData:null,
                instance:null
            }
        },
        methods: {
            updateData(){
                 this.queryData(this.dataType)
            },
               queryData(type){
                    if(type == 1){
                        this.getRemoteData();
                    }else{
                        clearInterval(this.flushData);
                        this.flushData = null;
                        this.result = this.data;
                        this.drawBar(this.result);
                    }
               },
               getColor(index, first) {
                    const barColor = this.option.barColor || [];
                    if (barColor[index]) {
                        const color1 = barColor[index].color1;
                        const color2 = barColor[index].color2;
                        const postion = (barColor[index].postion || 0.9) * 0.01;
                        if (first) return color1;
                        if (color2) {
                         return {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                offset: 0,
                                color: color1 // 0% 处的颜色
                                }, {
                                offset: postion,
                                color: color2 // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            };
                        }
                        return color1;
                    }
                },
                ishasprop(condition, isprop, alwaysObj) {
                    return Object.assign((() => {
                        return condition ? isprop : {};
                    })(), alwaysObj);
                },
                drawBar(result) {
                    let legendSeat = this.option.legendSeat;
                    if (legendSeat == "legendTop"){
                    
                        myCharts.getOption()
                    }
                    if(legendSeat == "legendPostion"){
                        myCharts.getOption()
                    }
                    let myCharts = echarts.init(this.$refs.terminalChart)
                    myCharts.clear();
                     const option =  {
                         title: {
                            left: this.option.titlePostion || "left",
                            text: this.option.title,
                            show: this.option.titleShow || false,
                            textStyle: {
                                fontSize: this.option.titleFontSize || 20,
                                color: this.option.titleColor || "#fff",
                                fontWeight:this.option.titleFontWeight
                            },
                            subtext:this.option.subtext,
                            subtextStyle: {
                                fontSize: this.option.subTitleFontSize || 20,
                                color: this.option.subTitleColor || "#fff",
                                fontWeight:this.option.subTitleFontWeight
                            },
                        },
                        tooltip: {
                            trigger: "axis",
                            formatter: "{a}:{c}",
                            axisPointer: {
                                type: "cross",
                            },
                            textStyle: {
                                fontSize: this.option.tipFontSize,
                                color: this.option.tipColor || "#fff"
                            }
                        },
                        grid: {
                            show: false,
                            top: this.option.gridY ||100,
                            bottom: this.option.gridY2 || 100,
                            right: this.option.gridX2 || 60,
                            left: this.option.gridX || 60
                        },
                        legend: {
                            show: this.option.legend,
                            top: this.option.legendTop || 5,
                            left: this.option.legendPostion || 100,
                            orient:this.option.legendOrient||"horizontal",
                            textStyle: {
                                fontSize: this.option.legendFontSize || 20
                            },
                            itemGap: 20,
                            itemWidth:this.option.itemWidth || 20,
                            data: result.legend,
                            inactiveColor: "#fff"
                        },
                        xAxis:{
                            type: this.option.type || "category",
                            data: result.xAxis.data,
                            name: this.option.xAxisName,
                            show: this.option.xAxisShow || false,
                            inverse: this.option.xAxisInverse || false,
                            interval: this.option.xAxisinterval || 50,
                            nameTextStyle:{
                                fontSize: this.option.xNameFontSize || 20,
                                color: this.option.nameColor || "#fff"
                            },
                            axisLine: {
                                lineStyle: {
                                    color: this.option.lineColor  || "#333",
                                }
                            },
                            axisLabel:{
                                fontSize:this.option.xNameFontSize || 16,
                                color: this.option.nameColor || "#fff",
                                rotate:this.option.xAxisRotate || 0
                            },
                            splitLine:{
                                show:this.option.xAxisSplitLineShow || false,
                                lineStyle:{
                                    color:this.option.xAxisSplitLineColor // 网格线颜色设置
                                }
                            },
                        },
                        axisPointer: {
                            type: "shadow"
                        },
                        axisTick: {
                            show: true,
                            interval: 0
                        },
                        yAxis: [
                            {
                                type: "value",
                                name: this.option.yAxisName,
                                show:this.option.yAxisShow || false,
                                inverse:this.option.yAxisInverse || false,
                                interval: this.option.yAxisinterval,
                                nameTextStyle:{
                                    fontSize:this.option.yNameFontSize || 20,
                                    color: this.option.nameColor || "#fff"
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: this.option.lineColor  || "#333"
                                    }
                                },
                                axisLabel:{
                                    fontSize:this.option.yNameFontSize || 16,
                                    color: this.option.nameColor || "#fff"
                                },
                                splitLine:{
                                    show:this.option.yAxisSplitLineShow || false,
                                    lineStyle:{
                                       color:this.option.yAxisSplitLineColor // 网格线颜色设置
                                   }
                                },
                            },
                            {
                                type: "value",
                                name: this.option.yAxisName2,
                                show:this.option.yAxisShow || false,
                                inverse:this.option.yAxisInverse || false,
                                nameTextStyle:{
                                    fontSize:this.option.yNameFontSize || 20,
                                    color: this.option.nameColor || "#fff"
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: this.option.lineColor  || "#333"
                                    }
                                },
                                axisLabel: {
                                    formatter: "{value}",
                                    fontSize:this.option.axisLabelFontSize || 16,
                                    color: this.option.nameColor || "#fff"
                                },
                                splitLine:{
                                    show: this.option.yAxisSplitLineShow || false,
                                     lineStyle:{
                                       color:this.option.yAxisSplitLineColor // 网格线颜色设置
                                   }
                                },
                            }
                        ],
                        series: (() =>{
                            const barColor_1 = this.option.barColor || [];
                            const list = (result.series || []).map((ele, index) => {
                                return Object.assign(ele, {
                                    barWidth: this.option.barWidth || 16,
                                    barMinHeight: this.option.barMinHeight || 0,
                                    symbol: this.option.symbol===false?"none":"circle",
                                    smooth: this.option.smooth,
                                    symbolSize: this.option.symbolSize || 10,
                                    lineStyle: {
                                        width: this.option.lineWidth || 2
                                    },
                                    itemStyle: this.ishasprop(!this.switchTheme, {
                                        color: this.getColor(index)
                                       
                                    }, { barBorderRadius: this.option.barRadius || 0 }),
                                    label: {
                                        show: this.vaildData(this.option.labelShow, false), //开启显示
                                        position: "top", //在上方显示,
                                        formatter: name => this.getLabelFormatter(name),
                                        textStyle: {
                                        //数值样式
                                        fontSize: this.option.labelShowFontSize || 14,
                                        color: this.option.labelShowColor || "#333",
                                        fontWeight: this.option.labelShowFontWeight || 500
                                        }
                                    }
                                });
                            });
                            return list;
                        })(),
                     }
                          //设置图例颜色
                    if(this.option.legendTextColor){
                        option.legend.textStyle.color=this.option.legendTextColor
                    }
                    myCharts.setOption(option)
                    window.addEventListener('resize', function () {
                        myCharts.resize()
                    })
                    this.instance = myCharts;
                    myCharts.on("click", this.eConsole);
                },
                 eConsole:function(){
                    this.option.link?window.open(this.option.link):null
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
                        this.result = res.data.data;
                        this.drawBar(this.result)

                    });
                    if(!this.flushData){
                        this.flush();
                    }
                }
        },
        mounted(){
            this.queryData(this.dataType)
        }
    }
</script>

<style scoped>

</style>