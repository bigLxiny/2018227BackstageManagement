<template>
  <div class="detail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/goods/list' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/goods/list' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/goods/list' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- form表单 -->
    <el-form ref="form" label-position="left" :model="form" label-width="80px" class="detail_form">
      <el-form-item label="内容标题">
        <el-input v-model="form.title" autofocus="autofocus"></el-input>
      </el-form-item>
      <el-form-item label="副标题">
        <el-input v-model="form.sub_title"></el-input>
      </el-form-item>
      <el-form-item label="所属类别">
        <el-select v-model="form.category_id" placeholder="请选择">
          <!-- <el-option label="区域一" value="shanghai"></el-option> -->
          <el-option v-for="item in category" :key="item.category_id" :label="item.title" :value="item.category_id">
            <!-- option里面可以加标签覆盖label文本, 但是label属性还得必须要, 不然会报错 -->
            <span>
              <!-- 子级分类才有这个图标 -->
              <span v-if="item.class_layer != 1">|-</span>
              <span>{{ item.title }}</span>

            </span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否发布">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>
      <el-form-item label="推荐类型">
        <el-switch v-model="form.is_slide" active-text="轮播图"></el-switch>
        <el-switch v-model="form.is_top" active-text="置顶"></el-switch>
        <el-switch v-model="form.is_hot" active-text="推荐"></el-switch>
      </el-form-item>

      <el-form-item label="上传封面">
        <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg" :file-list="form.imgList" list-type="picture" :on-success="uploadImg">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="上传附件">
        <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadfile" :file-list="form.fileList" :on-success="uploadFile" 
        :on-remove="handleRemove" :before-remove="beforeRemove">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品货号">
        <el-input v-model="form.goods_no"></el-input>
      </el-form-item>
      <el-form-item label="库存数量">
        <el-input v-model="form.stock_quantity"></el-input>
      </el-form-item>
      <el-form-item label="市场价格">
        <el-input v-model="form.market_price"></el-input>
      </el-form-item>
      <el-form-item label="销售价格">
        <el-input v-model="form.sell_price"></el-input>
      </el-form-item>
      <el-form-item label="内容摘要">
        <el-input type="textarea" v-model="form.zhaiyao"></el-input>
      </el-form-item>
      <el-form-item label="详细内容" class="el-form-item-content">
        <quill-editor v-model="form.content"></quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="$router.go(-1)">返回上一页</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      form: {},

      //分类数据
      category: [],

      //从url里面拿到被编辑的商品id
      id: this.$route.params.id
    };
  },
  methods: {
    handleRemove(file, fileList) {
        // console.log(file, fileList);
        this.form.fileList=fileList;
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
    //根据id获取商品数据
    getGoods() {
      this.$http.get(this.$api.gsDetail + this.id).then(res => {
        // console.log(res);
        if (res.data.status == 0) {
          this.form = res.data.message;

          // 为了让分类列表默认正确显示, 把商品category_id的数据类型改为number
          this.form.category_id = +this.form.category_id;
        }
      });
    },
    // 获取分类
    getCategory() {
      this.$http.get(this.$api.ctList + "goods").then(res => {
        if (res.data.status == 0) {
          // console.log(res.data.message);
          this.category = res.data.message;
        }
      });
    },
    // 上传封面 => 后端接口, 只能接收一张封面
    uploadImg(data) {
      this.form.imgList = [data];
    },
    uploadFile(data) {
      this.form.fileList.push(data);
    },
    onSubmit() {
      this.$http.post(this.$api.gsEdit + this.id, this.form).then(res => {
        if (res.data.status == 0) {
          this.$alert("数据修改成功");
        }
      });
    }
  },
  components: {
    quillEditor
  },
  // 在实例创建完成后被立即调用
  created() {
    // console.log(this);
    this.getGoods();
    this.getCategory();
  }
};
</script>

<style scoped lang='less'>
.detail {
  &_form {
    margin-top: 30px;
    width: 800px;
    .el-form-item-content{
      height: 500px;
      .quill-editor{
      height: 400px;
    }
    }
    
  }
}
</style>
