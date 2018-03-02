<template>
  <div class="list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 按钮组, 带搜索框 -->
    <section class="list_btns">
      <el-button plain size="mini" icon="el-icon-plus" type="info">新增</el-button>
      <el-button plain size="mini" icon="el-icon-check" type="info">全选</el-button>
      <el-button plain size="mini" icon="el-icon-close" type="info">删除</el-button>

      <div class="list_btns_right">
        <el-input placeholder="请输入商品名称" prefix-icon="el-icon-search" label-width="200px" size="mini">
        </el-input>
      </div>
    </section>

    <div class="login_table">
      <!-- 表格 -->
    <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" height="400px">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="标题" width="300">
        <template slot-scope="scope">
          <router-link style="color:#666" :to="{name :'goodsDetail'}">{{scope.row.title}}</router-link>
        </template>
      </el-table-column>
      <!-- prop设置显示对象中的字段名 -->
      <el-table-column prop="categoryname" label="所属类别">
      </el-table-column>
      <el-table-column prop="stock_quantity" label="库存" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="market_price" label="市场价" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="sell_price" label="销售价" show-overflow-tooltip> </el-table-column>
      <el-table-column label="属性" show-overflow-tooltip>
        <template slot-scope="scope">
          三个图标
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          <router-link style="color: #666;" :to="{ name: 'goodsDetail' }">修改</router-link>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData3: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    getGoodsData() {
      console.log(123);
      this.$http
        .get(this.$api.gsList + "?pageIndex=1&pageSize=10")
        .then(res => {
          if (res.data.status == 0) {
            // 把请求回来的数据将原数据覆盖

            this.tableData3 = res.data.message;
          }
        });
    },
    
  },
  // 生命周期函数，created，在实例创建完成后被立即调用
    created() {
            this.getGoodsData();
        }
};
</script>

<style scoped lang='less'>
.list {
  .list_btns {
    margin-top: 20px;
  }
  .list_btns_right {
    float: right;
    width: 200px;
  }
  .login_table{
    margin-top: 10px;
  }
}
</style>
