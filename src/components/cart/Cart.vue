<template>
<div>
    <!-- header start -->
    <header id='idx_header' class="cart">
        <div href="##" class="back-lk" @click='back'>
            <i class="fa fa-chevron-left"></i>
        </div>
        <div class="header-title">
            <span>购物车({{ cartNum }})</span>
        </div>
        <div class="right-box"></div>
    </header>
    <!-- header end -->
    <!-- productList start -->
    <section id="idx_section">
        <dl class="product-list">
            <dd class="list-item"  v-for="(pro,index) in product" :key="pro.id">
                <div class="item-header">
                    <dl>
                        <dd>
                            <a href="##">
                            </a>
                        </dd>
                        <dd>
                            <a href="##" class="s-type-lk"></a>
                            <a href="##" class="shop-lk">
                                {{ !pro.shop_name?'店铺名没有数据':pro.shop_name }}
                                <i class="fa fa-angle-right"></i>
                            </a>
                        </dd>
                        <dd>
                            <div class="edit-btn" @click="editItems(index)">{{editArr[index]?'完成':'编辑'}}</div>
                        </dd>
                    </dl>
                </div>
                <div class="s-item-con">
                    <dl class="s-item-list">
                        <dd class="p-item">
                            <div class="tips">
                                <a href="##" :class='!selectIt[index]?"allitem":"allitem allitem-active"'  @click="selectThem(index)"></a>
                            </div>
                            <div class="item-img">
                                <img :src="pro.imgSrc?pro.imgSrc:'/static/images/tblogo.jpg'" alt="">
                            </div>
                            <div class="i-con">
                                    <h3 class="s-tit">
                                        {{pro.p_name}}
                                    </h3>
                                    <span class="s-group">{{pro.group}}</span>
                                    <div class="s-price">
                                        <div>
                                            <span class="now-price">￥{{pro.p_now_price}}.00</span>
                                            <span class='origin-price'>￥{{pro.p_origin_price}}.00</span>
                                        </div>
                                        <span class="s-quantity">X{{pro.p_num}}</span>
                                    </div>
                            </div>
                            <div class="edit-content" v-show="editArr[index]">
                                <div class="input-group">
                                    <a href="##" class="input-group-addon" @click="decNum(index)"><span>-</span></a>
                                    <input type="text" class="form-control" name="p_num" v-model="pro.p_num">
                                    <a href="##" class="input-group-addon" @click="addNum(index)">+</a>
                                </div>
                                    <a href='##' class="del-box" @click="seen?seen=false:seen=true;thisIndex=index;">
                                        <span>删除</span>            
                                    </a>
                            </div>
                        </dd>
                    </dl>
                </div>
            </dd>
        </dl>
    </section>
    <!-- productList end -->
    <section class='end'></section>
    <!-- footer start -->
    <footer class="cart-footer">
        <div class="left-item">
            <a href="##" :class='!sll?"allitem":"allitem allitem-active"' @click="selectAll"></a>
            <span>全选</span>
        </div>
        <div class="right-item">
            <div class="total-block">
                <span class="tit">合计：</span>
                <span class="price-num">￥{{totalPrice}}.00</span>
            </div>
            <a href="##" class="uploadCart">
                结算
            </a>
        </div>
    </footer>
    <!-- footer end -->
    <!-- modal start -->
    <div class="modal" v-show="seen">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">确认要删除该物品吗</div>
            </div>
            <div class="modal-body">
                <a href="##" class="btn  btn-cancel" @click="seen=false">取消</a>
                <a href="##" class="btn btn-confirm"  @click="remove(thisIndex)">确认删除</a>
            </div>
        </div>
    </div>
    <!-- modal end -->
</div>
  
    
</template>
<script>
import Axios from "axios";
export default {
  name: "cart",
  data() {
    return {
      product: [],/* 商品数据 */
      cartNum: 0,/* 当前购物车商品数量 */
      editArr:[],/* 商品是否为编辑状态 */
      selectIt:[],/* 商品是否为选择状态 */
      thisIndex:'',/* 当前操作的列表索引 */
      seen:false,/* 模态框是否显示 */
      sll:false,/* 是否选择所有商品 */
      totalPrice:0/* 结算价格 */
    };
  },
  methods: {
    back() {/* 后退 */
      this.$router.go(-1);
    },
    selectThem(index){/* 选择商品 */
        var its=this.selectIt;
        its[index]?this.$set(its,index,false):this.$set(its,index,true);
    },
    editItems(index){/* 编辑数量 */
        var edit=this.editArr;
        edit[index]?this.$set(edit,index,false):this.$set(edit,index,true);
    },
    decNum(index){/* 减少数量 */
        if (this.product[index].p_num <= 1) {
                if (confirm('确认要删除该物品吗')) {
                    this.remove(index);
                }
                return;
            }
            this.product[index].p_num--;
    },
    remove(idx) { /* 删除商品 */
            if (idx == -2) {
                this.product = [];
                return;
            }
            this.$set(this.editArr,idx,false);
            this.seen=false;
            this.selectIt[idx]=false;
            this.product.splice(idx, 1);
            this.thisIndex="";
            this.cartNum=this.product.length;
    },
    addNum(idx){/* 增加数量 */
        this.product[idx].p_num++;
    },
    selectAll(){/* 选择所有商品 */
        let converts=false;
        let datas=this.selectIt;
        let sll=this.sll;
        if(sll===true){
            converts=false;
        }else if(sll===false){
            converts=true;
        }
        for(var i=0;i<datas.length;i++){
            this.$set(datas,i,converts);
        }
        this.sll?this.sll=false:this.sll=true;
    }
  },
  created() {/* 页面渲染完毕时 载入数据 */
    Axios.get("/static/json/cart.json").then(datas => {
      let data = datas.data.list;
      this.product = data;
      this.cartNum = data.length;
      var _this=this;
      for(var i=0;i<data.length;i++){
          _this.editArr[i]=false;
          _this.selectIt[i]=false;
      }
    });
  },
    watch: {/*  */
        toCounts: function (val, oldVal) {
            this.totalPrice = val;
        }
    },
    computed: {
        toCounts: function () {
            var _this = this;
            var selectIt=this.selectIt;
            _this.totalPrice = 0;
            _this.product.forEach(function (item,index) {
                console.log(index,item)
                if(selectIt[index]){
                    _this.totalPrice += item.p_now_price * item.p_num;
                }
                
            })
            return _this.totalPrice;
        }
    }
};
</script>
