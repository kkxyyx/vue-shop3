<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <div class="sort" v-show="show">
          <!-- 利用 事件委派+编程式导航 实现路由跳转和传递参数 -->
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex === index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a
                  :data-categoryName="c1.categoryName"
                  :data-categoryId="c1.category1Id"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <!-- 二三级分类 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">快乐购超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// import { throttle } from 'lodash'
import throttle from "lodash/throttle";

import { mapState } from "vuex";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  // 组件挂载完毕，向服务器发送请求
  mounted() {
    // 这里是全局组件发送的请求
    // 为优化性能->实现只发一次，把这个移到App.vue组件中
    // this.$store.dispatch("getCategoryList");
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    // 仓库准备就绪，通过mapState,从仓库中获取数据
    ...mapState({
      categoryList: state => state.home.categoryList,
    }),
    // ???为什么不能这样写
    // ...mapState('home',['categoryList'])
  },
  methods: {
    // 节流
    changeIndex: throttle(function (index) {
      // console.log(index)
      this.currentIndex = index;
    }, 50),
    // 当鼠标离开全部商品分类，列表收起
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    // 当鼠标进入全部商品分类，列表展开显示
    enterShow() {
      this.show = true;
    },
    // 路由跳转，并合并参数
    goSearch(e) {
      // console.log(e.target);// <a data-v-18b3c0cc data-categoryname="手机">手机</a>
      // console.log(e.target.dataset);// {v-18b3c0cc:''categoryname:'手机'}
      let { categoryname, category1id, category2id, category3id } =
        e.target.dataset;
      if (categoryname) {
        // 整理路由参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 判断第几级列表
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 合并params参数
        if (this.$route.params) {
          // 整理参数
          location.params = this.$route.params;
          location.query = query;
        }
        // 路由跳转
        this.$router.push(location);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /* &:hover {
            .item-list {
              display: block;
            }
          } */
        }
        /*.item:hover{
            background:#f9d1d0;
                          } */

        .cur {
          background: #f9d1d0;
        }
      }
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }
  }
}
</style>
