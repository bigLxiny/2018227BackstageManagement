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
      <el-button plain size="mini" icon="el-icon-check" type="info" @click='all'>全选</el-button>
      <el-button plain size="mini" icon="el-icon-close" type="info" @click='del'>删除</el-button>

      <div class="list_btns_right">
        <el-input placeholder="请输入商品名称" prefix-icon="el-icon-search" label-width="200px" size="mini" v-model="apiQuery.searchvalue" @blur="search">
          <!-- 绑定收缩数据的值，@blur='search'是指失去焦点的时候调用search()函数 -->
        </el-input>
      </div>
    </section>

    <div class="login_table">
      <!-- 表格 -->
      <el-table @selection-change="change" ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" height="440px">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="标题" width="300">

          <template slot-scope="scope">
            <!-- <router-link style="color:#666" :to="{name :'goodsDetail'}">{{scope.row.title}}</router-link> -->
            <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
              <router-link style="color:#666" :to="{path:`/admin/goods/detail/${scope.row.id}`}">{{scope.row.title}}</router-link>
              <div slot="content">
                <img style="width: 200px;" :src="scope.row.imgurl" alt="商品图片">
              </div>
            </el-tooltip>

          </template>
        </el-table-column>
        <!-- prop设置显示对象中的字段名 -->
        <el-table-column prop="categoryname" label="所属类别">
        </el-table-column>
        <el-table-column prop="stock_quantity" label="库存" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="market_price" label="市场价" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="sell_price" label="销售价" show-overflow-tooltip> </el-table-column>
        <el-table-column label="属性" show-overflow-tooltip>
          <!-- <template slot-scope="scope">
            三个图标
          </template> -->
          <template slot-scope="scope">
            <!-- 轮播图: is_slide -->
            <!-- <span :class="['el-icon-picture-outline', scope.row.is_slide == 1? 'active': '']"></span> -->
            <span :class="['el-icon-picture-outline', {'active': scope.row.is_slide == 1}]"></span>

            <!-- 指定: is_top -->
            <span :class="['el-icon-upload2', {'active': scope.row.is_top == 1}]"></span>
            <!-- 推荐: is_hot -->
            <span :class="['el-icon-star-off', {'active': scope.row.is_hot == 1}]"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <router-link style="color: #666;" :to="{path:`/admin/goods/detail/${scope.row.id}`}">修改</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="login_pagination">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="apiQuery.pageIndex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="apiQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="apiQuery.total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiQuery: {
        searchvalue: "",
        pageIndex: 1,
        pageSize: 2,
        total:0
      },
      // 定义一个数组，存放被选中的商品数据
      selectedGoodsList: [],

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
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.apiQuery.pageSize=val;
        this.getGoodsData();
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.apiQuery.pageIndex=val;
        this.getGoodsData();        
      },
    search() {
      this.getGoodsData();
    },
    //多选框选中的数据 参数可以拿到被选的商品数据
    change(selection) {
      this.selectedGoodsList = selection;
    },
    all(){
      document.querySelector('.el-checkbox__original').click();
    },
    del() {
      // 获取所有被选商品的id
      // console.log(this.selectedGoodsList);
      //   数组.map(v数组的每一项=》{v.id}取得每一项中的id值)
      let delIDS = this.selectedGoodsList.map(v => v.id);
      // console.log(delIDS);
      this.$http.get(this.$api.gsDel + delIDS).then(res => {
        // console.log(res);
        if (res.data.status == 0) {
          this.getGoodsData();
        }
      });
    },

    getGoodsData() {
      // console.log(123);
      console.log(this.apiQuery.searchValue);
      let api = `${this.$api.gsList}?pageIndex=${
        this.apiQuery.pageIndex
      }&pageSize=${this.apiQuery.pageSize}&searchvalue=${
        this.apiQuery.searchvalue
      }`;
      this.$http.get(api).then(res => {
        if (res.data.status == 0) {
          // 把请求回来的数据将原数据覆盖
          this.tableData3 = res.data.message;

          // 把后端接口返回的数量总量赋值给分页组件使用
          this.apiQuery.total=res.data.totalcount;
        }
      });
    }
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
  .login_table {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  // 添加icon点亮的样式
  [class^="el-icon"].active {
    color: #000;
    font-weight: bold;
  }
}
</style>
