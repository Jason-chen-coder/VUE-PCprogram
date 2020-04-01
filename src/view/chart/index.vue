<template>
  <div>
    <el-card class="topchart-card" :style="{display:'flex',justifyContent:'center'}">
      <div>
        <div id="titleChart" ref="myChart1" :style="{float:'left'}"></div>
        <br />
        <span>今日新增用户</span>
      </div>
      <div>
        <div id="titleChart" ref="myChart2" :style="{float:'left'}"></div>
        <br />
        <span>总用户量</span>
      </div>
      <div>
        <div id="titleChart" ref="myChart3" :style="{float:'left'}"></div>
        <br />
        <span>新增试题</span>
      </div>
      <div>
        <div id="titleChart" ref="myChart4" :style="{float:'left'}"></div>
        <br />
        <span>总试题量</span>
      </div>
      <div>
        <div id="titleChart" ref="myChart5" :style="{float:'left'}"></div>
        <br />
        <span>总刷题量</span>
      </div>
      <div>
        <div id="titleChart" ref="myChart6" :style="{float:'left'}"></div>
        <br />
        <span>人均刷题量</span>
      </div>
    </el-card>
    <el-card style="float:'left;height:'662px'" class="bottomchart-card">
      <div style="float:'left';height:'650px'" class="leftentquestion">
        <span class="counttitle">企业发布题目分布统计</span>
        <div
          ref="entChart"
          :style="{width:'721px',height:'500px',margin:'80px 0 0 0 ',float:'left',marginTop:'-5px'}"
        ></div>
      </div>

      <div style="float:'left'" class="rightcityquestion">
        <span class="counttitle">省份发布题目分布统计</span>
        <div
          ref="cityChart"
          :style="{width:'721px',height:'500px',margin:'80px 0 0 0 ',float:'left',marginTop:'-5px'}"
        ></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getTitleChartApi, getEntChartApi, getCitytApi } from "../../api/chart";
export default {
  mounted() {
    //获取title数据面板数据
    getTitleChartApi()
      .then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.titledata = res.data.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
    setTimeout(() => {
      this.drawLine();
    }, 500);
    //获取企业题目数据统计
    getEntChartApi()
      .then(res => {
        // console.log("这里是企业题目统计", res);
        this.entoption.series[0].data = res.data.data;
        var entname = res.data.data.map(item => {
          return item.name;
        });
        this.entoption.legend.data = entname;
      })
      .catch(err => {
        console.log(err);
      });
    getCitytApi().then(res => {
      // console.log("这里是城市题目统计", res);
      // this.cityoption.series[0].data = res.data.data;
      var cityvalue = [];
      var cityname = [];
      res.data.data.forEach(item => {
        if (item.hotNumber !== 0) {
          cityname.push(item.name);
          cityvalue.push({ name: item.name, value: item.hotNumber });
        }
      });
      this.cityoption.series[0].data = cityvalue;
      this.cityoption.legend.data = cityname;
      console.log("城市,数量", cityvalue);
    });
    setTimeout(() => {
      this.drowEnt();
    }, 1300);
  },

  data() {
    return {
      titledata: "",
      option1: {
        title: {
          text: "80",
          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#0580f2",
            fontSize: "20"
          }
        },
        color: "rgba(176, 212, 251, 1)",
        legend: {
          show: true,
          itemGap: 20,
          data: ["01"]
        },

        series: [
          {
            name: "Line 1",
            type: "pie",
            clockWise: true,
            radius: ["50%", "66%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: 80,
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#00cefc" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#367bec" // 100% 处的颜色
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      option2: {
        title: {
          text: "80",
          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#0580f2",
            fontSize: "20"
          }
        },
        color: "rgba(176, 212, 251, 1)",
        legend: {
          show: true,
          itemGap: 20,
          data: ["01"]
        },

        series: [
          {
            name: "Line 1",
            type: "pie",
            clockWise: true,
            radius: ["50%", "66%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: 80,
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#00cefc" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#367bec" // 100% 处的颜色
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      option3: {
        title: {
          text: "80",
          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#f86137",
            fontSize: "20"
          }
        },
        color: "rgba(176, 212, 251, 1)",
        legend: {
          show: true,
          itemGap: 20,
          data: ["01"]
        },

        series: [
          {
            name: "Line 1",
            type: "pie",
            clockWise: true,
            radius: ["50%", "66%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: 80,
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#f86137" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#f86137" // 100% 处的颜色
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      option4: {
        title: {
          text: "80",
          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#f86137",
            fontSize: "20"
          }
        },
        color: "rgba(176, 212, 251, 1)",
        legend: {
          show: true,
          itemGap: 20,
          data: ["01"]
        },

        series: [
          {
            name: "Line 1",
            type: "pie",
            clockWise: true,
            radius: ["50%", "66%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: 80,
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#f86137" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#f86137" // 100% 处的颜色
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      option5: {
        title: {
          text: "80",
          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#76c092",
            fontSize: "20"
          }
        },
        color: "rgba(176, 212, 251, 1)",
        legend: {
          show: true,
          itemGap: 20,
          data: ["01"]
        },

        series: [
          {
            name: "Line 1",
            type: "pie",
            clockWise: true,
            radius: ["50%", "66%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: 80,
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#76c092" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#76c092" // 100% 处的颜色
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      option6: {
        title: {
          text: "80",
          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#76c092",
            fontSize: "20"
          }
        },
        color: "rgba(176, 212, 251, 1)",
        legend: {
          show: true,
          itemGap: 20,
          data: ["01"]
        },

        series: [
          {
            name: "Line 1",
            type: "pie",
            clockWise: true,
            radius: ["50%", "66%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: 80,
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#76c092" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#76c092" // 100% 处的颜色
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      entoption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          textStyle: {
            fontSize: 20
          },
          // orient: "vertical",
          left: 'center',
          bottom:0,
          // top:0,
          data: []
        },
        series: [
          {
            name: "数量(占比)",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  return [
                    "#afa3f5",
                    "#00d488",
                    "#3feed4",
                    "#3bafff",
                    "#f1bb4c",
                    "rgba(250,250,250,0.5)"
                  ][params.dataIndex];
                }
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]
      },
      cityoption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          textStyle: {
            fontSize: 20
          },
          // orient: "vertical",
           left: 'center',
          bottom:0,
          // top:0,
          data: []
        },
        series: [
          {
            name: "数量(占比)",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  return [
                    "#f66bbf",
                    "#37a2da",
                    "#67e0e3",
                    "#fff065",
                    "#ffae8b",
                    "rgba(250,250,250,0.5)"
                  ][params.dataIndex];
                }
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]
      }
    };
  },
  methods: {
    drowEnt() {
      let entChart = this.$echarts.init(this.$refs.entChart);
      let cityChart = this.$echarts.init(this.$refs.cityChart);
      // console.log("开始渲染", this.entoption);
      entChart.setOption(this.entoption);
      cityChart.setOption(this.cityoption);
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(this.$refs.myChart1);
      let myChart2 = this.$echarts.init(this.$refs.myChart2);
      let myChart3 = this.$echarts.init(this.$refs.myChart3);
      let myChart4 = this.$echarts.init(this.$refs.myChart4);
      let myChart5 = this.$echarts.init(this.$refs.myChart5);
      let myChart6 = this.$echarts.init(this.$refs.myChart6);
      // 更新数据
      this.option1.title.text = this.titledata.increment_users;
      this.option2.title.text = this.titledata.total_users;
      this.option3.title.text = this.titledata.increment_questions;
      this.option4.title.text = this.titledata.total_questions;
      this.option5.title.text = this.titledata.total_done_questions;
      this.option6.title.text = this.titledata.personal_questions;
      //传入数据
      myChart1.setOption(this.option1);
      myChart2.setOption(this.option2);
      myChart3.setOption(this.option3);
      myChart4.setOption(this.option4);
      myChart5.setOption(this.option5);
      myChart6.setOption(this.option6);
    }
  }
};
</script>

<style lang='less'>
.topchart-card {
  margin-bottom: 20px;
  .el-card__body {
    height: 180px;
    width: 100% !important;
    box-sizing: border-box;
    justify-content: space-around;
    display: flex;
    padding: 0;
  }
  #titleChart {
    width: 160px;
    height: 90%;
    margin-top: -10px;
    text-align: center;
    canvas {
      font-size: 12px;
    }
    span {
      display: inline-block;
      margin: 0 auto;
    }
  }
}
.bottomchart-card {
  height: 600px;
}
.rightcityquestion,
.leftentquestion {
  float: left;
  width: 45% !important;
  height: 1180px !important;
}
.counttitle{
  font-size:25px;
  margin-top:20px;
  display:block!important;
  font-weight: bold;
 
}
</style>