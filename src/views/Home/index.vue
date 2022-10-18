<template>
  <a-spin :spinning="spinning">
    <div class="charts_block">
       <!-- 饼状图 -->
      <div id="pieEacharts"></div>
      <!-- 柱状图 -->
      <div id="categoryEacharts"></div>
    </div>
  </a-spin>
</template>

<script setup>
import * as echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
import { getTableData } from '@/api/http' //获取表格数据
import { onMounted, ref } from 'vue';
const spinning = ref(false)//加载状态

onMounted(() => {
  spinning.value = true
  getTableData().then(res => {
    console.log("数据", res)
    let pieData = res.map(item => {
      return {
        value: item.age,
        name: item.name
      }
    })
    console.log("数据", pieData)
    const pieEacharts = echarts.init(document.getElementById('pieEacharts'));//饼状
    const categoryEacharts = echarts.init(document.getElementById('categoryEacharts'));//柱状
    // 绘制饼状图
    pieEacharts.setOption({
      title: {
        text: '统计',
        subtext: '用户年龄统计',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'userData',
          type: 'pie',//饼图
          radius: '50%',
          data: [...pieData
            // { value: 1048, name: 'Search Engine' },
            // { value: 735, name: 'Direct' },
            // { value: 580, name: 'Email' },
            // { value: 484, name: 'Union Ads' },
            // { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
    //绘制柱状图
    categoryEacharts.setOption({
      xAxis: {
        type: 'category',
        data: [...res.map(item => item.name)] //横向
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [...res.map(item => item.age)],//竖向
          type: 'bar'
        }
      ]
    })
  }).finally(() => {
    spinning.value = false
  })
})
</script>

<style lang="scss">
.charts_block{
  display: flex;
  justify-content: space-around;
  #pieEacharts,#categoryEacharts {
    width: 500px;
    height: 500px;
    display: inline-block;
  }
}
</style>