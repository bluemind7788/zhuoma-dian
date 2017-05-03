<template>
    <div class="fans-analyse">
        <el-tabs v-model="activeName">
            <el-tab-pane label="概况" name="overview">
                <div class="fans-analyse-overview">
                    <div class="timespan">
                        <span class="shortcut" :class="{ active: shortcutActive == 0 }" @click="onShortcutClick(7)">7天</span>
                        <span class="shortcut" :class="{ active: shortcutActive == 1 }" @click="onShortcutClick(14)">14天</span>
                        <span class="shortcut" :class="{ active: shortcutActive == 2 }" @click="onShortcutClick(30)">30天</span>
                        <el-date-picker v-model="timeSpan" type="daterange" :clearable="false" :picker-options="pickerOptions" placeholder="选择日期范围" class="date-picker">
                        </el-date-picker>
                    </div>
                    <div class="basic-info clearfix">
                        <div class="basic-info-item">
                            <div class="num">{{ sum.income | numFormater }}</div>
                            <div class="title">新增收入</div>
                        </div>
                        <div class="basic-info-item">
                            <div class="num">{{ sum.orderNum | numFormater }}</div>
                            <div class="title">订单量</div>
                        </div>
                    </div>
                    <div class="chart-title">数据详情</div>
                    <div class="detail-info">
                        <chart :options="chartOpt" class="chart"></chart>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="订单明细" name="detail">
                <div class="fans-analyse-detail">
                    <div class="timespan">
                        <span class="shortcut" :class="{ active: shortcutActive == 0 }" @click="onShortcutClick(7)">7天</span>
                        <span class="shortcut" :class="{ active: shortcutActive == 1 }" @click="onShortcutClick(14)">14天</span>
                        <span class="shortcut" :class="{ active: shortcutActive == 2 }" @click="onShortcutClick(30)">30天</span>
                        <el-date-picker v-model="timeSpan" type="daterange" :clearable="false" :picker-options="pickerOptions" placeholder="选择日期范围" class="date-picker">
                        </el-date-picker>
                    </div>
                    <el-table :data="orderList" class="article-table">
                        <el-table-column prop="orderno" label="订单号">
                        </el-table-column>
                        <el-table-column prop="time" label="日期">
                            <template scope="scope">
                                {{ scope.row.time | dateFormater }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="totalprice" label="收入">
                        </el-table-column>
                        <el-table-column prop="desknum" label="桌号">
                        </el-table-column>
                        <el-table-column type="expand" label="明细">
                            <template scope="scope">
                                <el-table :data="scope.row.foodlist" class="article-table">
                                    <el-table-column prop="foodname" label="菜名">
                                    </el-table-column>
                                    <el-table-column prop="price" label="单价">
                                    </el-table-column>
                                    <el-table-column prop="num" label="数量">
                                    </el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
             <!--        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" class="pagination">
                    </el-pagination> -->
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import {
    OrderApi
} from '../api/index'

import Chart from 'vue-echarts/components/ECharts.vue'

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/markLine'

import 'echarts/lib/component/legend'

import Utils from '../util/index'

let yesterday = new Date();
yesterday.setTime(yesterday.getTime() - 3600 * 1000 * 24 * 1);

let genDays = (startDay, endDay) => {
    let start = new Date(startDay),
        end = new Date(endDay),
        tmp = start,
        result = [];
    while (tmp < end) {
        result.push(Utils.formatDate(tmp, 'yyyy-MM-dd'));
        tmp = new Date(tmp.getTime() + 3600 * 1000 * 24 * 1)
    }
    result.push(Utils.formatDate(end, 'yyyy-MM-dd'))
    return result;
}


export default {
   components: {
        Chart,
    },
    // mounted() {
    //     this.fetchData();
    // },
    data() {
        return {
            activeName: 'overview',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            timeSpan: [yesterday, yesterday],
            // sum: {
            //     article: 0,
            //     read: 0
            // },
            chartOpt: {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['新增收入', '订单量']
                },
                xAxis: {
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: []
            },
            total: 0,
            pageSize: 10,
            currentPage: 1,
            orderList: []

        }
    },
    filters: {
        numFormater(val) {
            if(typeof val == undefined || val == null) {
                return '';
            }
            val = val + '';
    
            let result = [];
            let j = val.length, i = j-3;
            while(j > 0) {
                result.push(val.substring(i, j));
                j = j -3;
                i = j -3;
            }
            
            return result.reverse().join(',')
        }
    },
    computed: {
        // 快捷选择日期
        shortcutActive() {
            const today = new Date();
            if(Utils.formatDate(today, 'yyyy-MM-dd') == Utils.formatDate(this.timeSpan[1], 'yyyy-MM-dd')) {
                // 计算距今天的天数
                let days = (new Date(this.timeSpan[1]).getTime() - new Date(this.timeSpan[0]).getTime()) / (3600 * 1000 * 24);
                return parseInt(days) == 7 ? 0 : parseInt(days) == 14 ? 1 : parseInt(days) == 30 ? 2 : -1;
            }
            return -1;
            
        },
        startDate() {
            return Utils.formatDate(this.timeSpan.length == 2 ? this.timeSpan[0] : yesterday, 'yyyy-MM-dd');
        },
        endDate() {
            return Utils.formatDate(this.timeSpan.length == 2 ? this.timeSpan[1] : yesterday, 'yyyy-MM-dd');
        },
        selectedRestId() {
            return this.$store.getters.selectedRestId
        },
        restid() {
            return this.$store.getters.selectedRestId
        },
        sum() {
            let total = {
                income: 0,
                orderNum: this.orderList.length
            }
            this.orderList.forEach((order) => {
                total.income += order.totalprice;

            })
            return total;
        }
    },
    watch: {
        timeSpan(val) {
            // debugger
            this.fetchData();
        },
        selectedRestId() {
            this.fetchData();
        },
        orderList(orders) {
            // 清空图表数据
            this.chartOpt.series.splice(0, this.chartOpt.series.length)
            this.chartOpt.xAxis = {}

            let xAxisData = genDays(this.startDate, this.endDate);
            let ordersByTime = {};
        
            orders.forEach((order) => {
                let t = order.time.substring(0, 10),
                    ot = ordersByTime[t];
                if(!ot) {
                    ot = {income: order.totalprice, orderNum: 1};
                    ordersByTime[t] = ot;
                } else {
                    ot.income += order.totalprice;
                    ot.orderNum++;
                }
            });

            if (xAxisData.length == 1) {
                let time = xAxisData[0],
                    data = ordersByTime[time];
                this.chartOpt.xAxis = {
                    data: ['新增收入', '订单量']
                };

                this.chartOpt.series.push({
                    name: '数量',
                    type: 'bar',
                    barWidth: 40,
                    itemStyle: {
                        normal: {
                            color: '#d91717'
                        }
                    },
                    data: [data.income, data.orderNum]
                });

            } else if (xAxisData.length > 1) {
                let incomeData = [],
                    numData = [];

                this.chartOpt.xAxis = {
                    type: 'category',
                    boundaryGap: false,
                    data: xAxisData
                };

                xAxisData.forEach((t) => {
                    let info = ordersByTime[t];
                    incomeData.push(info ? info.income : 0)
                    numData.push(info ? info.orderNum : 0)
                })
                this.chartOpt.series.push({
                    name: '新增收入',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#d91717'
                        }
                    },
                    data: incomeData
                });
                this.chartOpt.series.push({
                    name: '订单量',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#3757f7'
                        }
                    },
                    data: numData
                })
            }
        }
    },
    methods: {
        onShortcutClick(dateSpan) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * dateSpan);
            this.timeSpan = [start, end]
        },
        fetchData() {
            // OrderApi.getOrderByRestIdAndStatus({
            //     params: {
            //         restid: this.selectedRestId,
            //         status: 2
            //     }
            // }, (data) => {
            //     this.total = parseInt(data.total)
            //     this.infoList = Utils.objValueToArr(data.list)
            //     this.sum = data.sum

            //     // 清空图表数据
            //     this.chartOpt.series.splice(0, this.chartOpt.series.length)
            //     this.chartOpt.xAxis = {}

            //     if (this.infoList.length == 1) {
            //         let info = this.infoList[0];

            //         this.chartOpt.xAxis = {
            //             data: ['新增收入', '取消关注']
            //         };

            //         this.chartOpt.series.push({
            //             name: '数量',
            //             type: 'bar',
            //             barWidth: 40,
            //             itemStyle: {
            //                 normal: {
            //                     color: '#d91717'
            //                 }
            //             },
            //             data: [info.sub_num, info.unsub_num]
            //         });

            //     } else if (this.infoList.length > 1) {
            //         let xAxisData = genDays(this.startDate, this.endDate),
            //             subData = [],
            //             unsubData = [];

            //         this.chartOpt.xAxis = {
            //             type: 'category',
            //             boundaryGap: false,
            //             data: xAxisData
            //         };

            //         this.infoList.forEach((info) => {
            //             subData.push(info.sub_num)
            //             unsubData.push(info.unsub_num)
            //         })
            //         this.chartOpt.series.push({
            //             name: '新增收入',
            //             type: 'line',
            //             itemStyle: {
            //                 normal: {
            //                     color: '#d91717'
            //                 }
            //             },
            //             data: subData
            //         });
            //         this.chartOpt.series.push({
            //             name: '取消关注',
            //             type: 'line',
            //             itemStyle: {
            //                 normal: {
            //                     color: '#3757f7'
            //                 }
            //             },
            //             data: unsubData
            //         })
            //     }
            // });

            OrderApi.fetchOrderDetails({
                restid: this.restid,
                starttime: this.startDate + ' 00:00:00',
                endtime: this.endDate + ' 23:59:59'
            }, (res) => {
                this.orderList.splice(0, this.orderList.length);
                for(let k in res.data.orders) {
                    this.orderList.push(res.data.orders[k]);
                }
                
            })

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.fetchData();
        },
        handleCurrentPageChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
            this.fetchData();
        },

    }
}
</script>
<style lang="stylus">
.fans-analyse
    .timespan
        .shortcut
            margin-right 20px
            color #999
            cursor pointer
            &.active
                color #20a0ff
        .date-picker
            margin-left 14px
    .fans-analyse-overview
        margin-bottom 30px
        .basic-info
            margin-top 30px
            width 400px
            border 1px solid rgb(217, 193, 191)
            .basic-info-item
                float left
                margin-top 20px
                width 200px
                height 90px
                line-height 1.5
                text-align center
                .num
                    color #222
                    font-size 28px
                    font-weight bold
        .detail-info
            margin-top 30px
            width 600px
            border 1px solid rgb(217, 193, 191)
        .chart-title
            margin-top 30px
        .chart
            margin-top 10px
        .article-table
            margin-top 30px
        
    .fans-analyse-detail
        .pagination
            margin 0 auto
            margin-top 20px
            width 300px

</style>
