//图形选择按钮的控件
Vue.component('chu-imgul',{
    data:function () {
      return {ulshow:false}
    },
    props:["ulimg"],
    template:`<ul class="chu_imgul">
                <li class="chu_imgul_li"><a><img :src="ulimg" class="chu_imgul_img" ><div class="chu_subline"></div><img src="img/more_unfold.png" class="chu_icon_down"></a>
                <slot></slot>
                </li>
              </ul>`,
    });
//图形选择器的下拉控件
Vue.component('chu-imgli',{
    props:["ulword","liimg","liword"],
    template:`      <ul class="chu-imgli" >
                        <li class="chu-imgli-head">{{ulword}}</li>
                        <li  v-for="(item,index) of liimg" :id="liword[index]" class="chu-imgli-item" v-on:click="chooseChart(liword[index])" v-on:mouseenter="chengeBack('mouseIn',liword[index])" v-on:mouseleave="chengeBack('mouseOut',liword[index])"><img :src="item" class="chu_imgli_img"><span>{{liword[index]}}</span></li>
                    </ul>`,
    methods:{
        chengeBack(value,index){
            value === "mouseIn" ? document.getElementById(index).style.background = "#20a0ff" : document.getElementById(index).style.background = "#ffffff";
        },
        chooseChart(value){
            switch (value){
                case "柱状图A" : this.$emit("change-chart",histogramA);break;
                case "柱状图B" : this.$emit("change-chart",histogramB);break;
                case "饼状图A" : this.$emit("change-chart",pieA);break;
                case "饼状图B" : this.$emit("change-chart",pieB);break;
                default:$(".chart").css("visibility","visible");
            }
            //作品栏作品清除选中
            $('.chart_item').css("border","1px solid #1c8ce1");
            $('.vs').removeClass('vs');
        }
    }
});
//搜索框
Vue.component("chu-search-input",{
   template:`<div class="search">
                <i class="icon-search"></i>
                <input placeholder="查找" class="search-input" />
            </div>`,
});
//度量组件
Vue.component("chu-ul",{
    props:['dimension','aggregation'],
    data:function () {
      return {
          clicked:'',
      }
    },
   template:`<ul class="chu-ul">
                <ul class="chu-ul-row" v-for="(item,index) of dimension">
                    <li class="chu-ul-header" :id="'ul-header'+index">
                    <a v-on:mouseenter="showSetImg('chu-ul'+index)" v-on:mouseleave="hideSetImg(index)">
                    <i class="chu-img-head"></i>
                    <span class="chu-ul-span" v-text="dimension[index].label"></span>
                    <i class="chu-ul-img-set" :id="'chu-ul'+index" @click.stop="chooseSet(index)"></i>
                    <span class="chu-ul-small-span">{{dimension[index].set.aggregation}}</span>
                    </a>
                    </li>
                </ul>
                <ul class="chu-ul-set">
                    <li class="chu-ul-set-head" v-for="(item,index) of aggregation"><a>{{aggregation[index].label}}<img v-show="aggregation[index].value.length" src="./img/right.png"></a><div class="cut_off_line"></div>
                        <ul class="chu-ul-set-ul" v-if="aggregation[index].value.length">
                            <li v-for="val of item.value"><a @click="changeAgg(val)">{{val}}</a></li>
                        </ul>
                    </li>
                </ul>
            </ul>`,
    methods:{
        //显示设置按钮
        showSetImg(val){
            $('#'+val).css('visibility','visible');
        },
        //隐藏设置按钮
        hideSetImg(index){
            $('.chu-ul-img-set').css('visibility','hidden');
            if($('.chu-ul-set').css('visibility')==='hidden'){
                this.clicked = '';
            }else if(this.clicked.length>0){
                $('#'+'chu-ul'+this.clicked).css('visibility','visible');
            }
        },
        //
        chooseSet(index){
            this.clicked = index;
            $('.chu-ul-set').css('top',$('#'+'chu-ul'+index).offset().top-60+'px');//控制设置面板的位置
            $('.chu-ul-set').css('left',$('#'+'chu-ul'+index).offset().left+26+'px');//控制设置面板的位置
            $('.chu-ul-set').css('visibility','visible');
            $('#'+'chu-ul'+index).css('visibility','visible');
            $('.chu-ul-header').css('background-color','#f6f6f6');
            $('#'+'ul-header'+index).css('background-color','#dadada');
        },
        changeAgg(val){
            this.$emit("change-agg",this.clicked,val);
        }
    }
});
//维组件
Vue.component('chu-ul-menu',{
   props:["measure","settings","measure_length"],
    data:function () {
        return {
            clicked:'',
        }
    },
    template:`<ul class="chu-ul-menu">
                <ul class="chu-um-row" v-for="(item,index) of measure">
                    <li class="chu-um-header">
                        <a v-on:mouseenter="showSetImg('chu-ul-menu'+index)" v-on:mouseleave="hideSetImg('chu-ul-menu'+index)">
                        <i :id="'fold'+index" v-show="measure[index].children.length" class="fold" @click="fold('fold'+index)"></i>
                        <img :src="measure[index].img" class="chu-menu-img-head">
                        <span v-text="measure[index].label" class="chu-menu-head-span"></span>
                        <i :id="'chu-ul-menu'+index" class="chu-menu-img-set" @click.stop="chooseSet('chu-ul-menu'+index)"></i>
                        </a>
                    </li>
                    <ul class="chu-um-item" v-for="(val,index) of item.children">
                        <li>
                            <a v-on:mouseenter="showSetImg(item.children[index].label)" v-on:mouseleave="hideSetImg(item.children[index].label)">
                            <img :src="item.children[index].img" class="chu-menu-img-item">
                            <span class="chu-menu-item-span" v-text="item.children[index].label"></span>
                            <i :id="item.children[index].label" class="chu-menu-img-set" @click.stop="chooseSet(item.children[index].label)"></i>
                            </a>
                        </li>
                    </ul>
                </ul>
                <ul class="chu-menu-set">
                    <li class="chu-ul-set-head" v-for="(item,index) of settings"><a>{{settings[index].label}}<img v-show="settings[index].value.length" src="./img/right.png"></a><div class="cut_off_line"></div>
                        <ul class="chu-ul-set-ul" v-if="settings[index].value.length">
                            <li v-for="val of item.value"><a @click="changeSet(val)">{{val}}</a></li>
                        </ul>
                    </li>
                </ul>
            </ul>`,
    methods:{
        showSetImg(val){
            $('#'+val).css('visibility','visible');
        },
        hideSetImg(back,set){
            $('#'+back).css('visibility','hidden');
            $('#'+set).css('visibility','hidden');
        },
        fold(id){
            $('#'+id).toggleClass("unfold");
            $('#'+id).parent().parent().parent().find(".chu-um-item").slideToggle(300);
        },
        chooseSet(index){
            this.clicked = index;
            $('.chu-menu-set').css('top',$('#'+index).offset().top-60+'px');//控制设置面板的位置
            $('.chu-menu-set').css('left',$('#'+index).offset().left+26+'px');//控制设置面板的位置
            $('.chu-menu-set').css('visibility','visible');
            $('#'+index).css('visibility','visible');
            // $('.chu-um-header').css('background-color','#f6f6f6');
            // $('#'+'ul-header'+index).css('background-color','#dadada');
        },
        changeSet(val){

        }
    }
});
//度量容器
Vue.component('chu-d-container',{
    props:['title','subhead','set','dimensions_choose'],
    template:`<div class="chu_container">
                <div class="chu_container_title">{{title}}</div>
                <div class="chu_container_subhead">{{subhead}}</div>
                <div class="pl5 pr5">
                    <div class="chu_container_data">
                        <div class="chu_container_data_item" v-for="(item,index) of dimensions_choose" v-on:mouseenter="showDeleteImg('d_delete'+index)" v-on:mouseleave="hideDeleteImg">
                        <span>{{item}}</span>
                        <i :id="'d_delete'+index" class="chu_container_delete" @click="deleteChoose(item)"></i>
                        </div>
                    </div>
                    <img id="d_add" src="img/add_data.png" class="chu_container_add_data" @click.stop="showSet('d_add')">
                    <div class="clear"></div>
                    <ul class="chu-d-container-ul">
                        <li class="chu-container-li_head">{{title}}</li>
                        <li v-for="item of set" class="chu-container-li" @click="addItemToData(item)">{{item}}</li>
                    </ul>
                </div>
            </div>`,
    methods:{
        showSet(value){
            this.$emit("hide");
            $('.chu-d-container-ul').css('top',$('#'+value).offset().top-32+'px');
            $('.chu-d-container-ul').css('left',$('#'+value).offset().left+28+'px');
            $('.chu-d-container-ul').css('visibility','visible');
        },
        showDeleteImg(id){
            $('.chu_container_delete').css('visibility','hidden');
            $('#'+id).css('visibility','visible');
        },
        hideDeleteImg(){
            $('.chu_container_delete').css('visibility','hidden');
        },
        addItemToData(item){
            //没有图形时不执行此方法
            if($('#chart').css("visibility")==="hidden"){return}
            this.$emit("d-push-data",'add',item);
        },
        deleteChoose(val){
            this.$emit("d-push-data",'delete',val);
        }
    },
});
//维度容器和颜色容器
Vue.component('chu-m-container',{
    props:['title','subhead','data_set','color_set','measures_choose','color_choose'],
    template:`<div class="chu_container">
                <div class="chu_container_title">{{title}}</div>
                <div class="chu_container_subhead">{{subhead}}</div>
                <div class="pl5 pr5">
                    <div class="chu_container_data">
                        <div class="chu_container_data_item" v-for="(item,index) of measures_choose" v-on:mouseenter="showDeleteImg('m_delete'+index)" v-on:mouseleave="hideDeleteImg"><span>{{item}}</span><i :id="'m_delete'+index" class="chu_container_delete" @click="deleteChoose1(item)"></i></div>
                    </div>
                    <img id="m_add" src="img/add_data.png" class="chu_container_add_data" @click.stop="showSet('m_add')">
                    <div class="clear"></div>
                    <ul class="chu-m-container-ul">
                        <li class="chu-container-li_head">{{title}}</li>
                        <li v-for="item of data_set" class="chu-container-li" @click="addItemToData1(item)">{{item}}</li>
                    </ul>
                </div>
                <div class="chu_container_subhead">颜色</div>
                <div class="pl5 pr5">
                    <div class="chu_container_data">
                        <div class="chu_container_data_item" v-for="(item,index) of color_choose" v-on:mouseenter="showDeleteImg('c_delete'+index)" v-on:mouseleave="hideDeleteImg"><span>{{item}}</span><i :id="'c_delete'+index" class="chu_container_delete" @click="deleteChoose2(item)"></i></div>
                    </div>
                    <img id="c_add" src="img/add_data.png" class="chu_container_add_data" @click.stop="showSet('c_add')">
                    <div class="clear"></div>
                    <ul class="chu-c-container-ul">
                        <li class="chu-container-li_head">颜色</li>
                        <li v-for="item of color_set" class="chu-container-li" @click="addItemToData2(item)">{{item}}</li>
                    </ul>
                </div>
            </div>`,
    methods:{
        showSet(value){
            this.$emit("hide");
            if(value==='m_add') {
                $('.chu-m-container-ul').css('bottom', $(window).height() - $('#' + value).offset().top - 46 + 'px');
                $('.chu-m-container-ul').css('left', $('#' + value).offset().left + 28 + 'px');
                $('.chu-m-container-ul').css('visibility','visible');
            }else if(value==='c_add'){
                $('.chu-c-container-ul').css('bottom', $(window).height() - $('#' + value).offset().top - 46 + 'px');
                $('.chu-c-container-ul').css('left', $('#' + value).offset().left + 28 + 'px');
                $('.chu-c-container-ul').css('visibility','visible');
            }
        },
        showDeleteImg(id){
            $('.chu_container_delete').css('visibility','hidden');
            $('#'+id).css('visibility','visible');
        },
        hideDeleteImg(){
            $('.chu_container_delete').css('visibility','hidden');
        },
        addItemToData1(item){
            //没有图形时不执行此方法
            if($('#chart').css("visibility")==="hidden"){return}
            this.$emit("m-push-data",'add',item);
        },
        addItemToData2(item){
            //没有图形时不执行此方法
            if($('#chart').css("visibility")==="hidden"){return}
            this.$emit("c-push-data",'add',item);
        },
        deleteChoose1(val){
            this.$emit("m-push-data",'delete',val);
        },
        deleteChoose2(val){
            this.$emit("c-push-data",'delete',val);
        }
    },
});
//已完成的作品组件
Vue.component('chu-ready-charts',{
    props:['charts'],
    template:`<div>
                <div v-for="(item,index) of charts" :id="'chart_item'+index" class="chart_item" @click.stop="reloadReadyChart(item,index)">
                    <div class="chart_mask">
                        <img :id="'mask_img'+index" src="img/set.png" class="w18 h18 fr vh" @click.stop="showSet(index)">
                        <p>{{item.set.title.text}}</p>
                    </div>
                    <img :id="'thumbnail'+index" :src="item.thumbnail" class="w h"> 
                </div>
               <div>`,
    methods:{
        //选择作品
        reloadReadyChart:function (item,index) {
            this.$emit('reload-ready-chart',item,index);
            $(".ready_chart_set").css('visibility', 'hidden');
            $(".vh").removeClass("vs");
            $('#mask_img'+index).addClass("vs");
            $('.chart_item').css("border","1px solid #1c8ce1");
            $('#chart_item'+index).css("border","3px solid #1c8ce1");
        },
        //设置作品
        showSet:function (index) {
            $(".ready_chart_set").css('visibility','visible');
            var left = $('#thumbnail'+index).offset().left-5;
            var top = $('#thumbnail'+index).offset().top-$(".ready_chart_set").height()-6;
            $(".ready_chart_set").css('left',left+'px');
            $(".ready_chart_set").css('top',top+'px');
        }
    }
});
//重命名模态框
Vue.component('chu-rename-dialog',{
    data:function () {
      return{
          value:'',
      }
    },
   template:`<div class="mask_rename">
                <div class="dialog chu_rename_dialog">
                    <div class="dialog_head chu_rename_dialog_head">重命名<img src="img/delete_black.png" class="w20 h20 fr mt20 mr20 csp" @click="hideDialog"/></div>
                    <div class="mt30 ml30">新名称：<input class="rename_input" v-model="value"></div>
                    <button class="button w40 h30  mt40 fr mr25" @click="hideDialog">取消</button>
                    <button class="button w40 h30  mt40 fr mr25" @click="renameChart">确定</button>
                </div>
             </div>`,
    methods:{
        hideDialog:function () {
            this.$emit("hide-dialog",'rename');
            this.value = '';
        },
        renameChart:function () {
            this.$emit('rename-chart',this.value);
            this.value = "";
        }
    }
});
//删除模态框
Vue.component('chu-delete-dialog',{
    template:`<div class="mask_delete">
                <div class="dialog chu_delete_dialog">
                    <div class="dialog_head chu_delete_dialog_head">删除该作品<img src="img/delete_black.png" class="w20 h20 fr mt10 mr20 csp" @click="hideDialog"/></div>
                    <button class="button w50 h30  mt30  ml50" @click="deleteChart">确定</button>
                    <button class="button w50 h30  mt30  ml50" @click="hideDialog">取消</button>
                </div>
             </div>`,
    methods:{
        hideDialog:function () {
            this.$emit("hide-dialog",'del');
        },
        deleteChart:function () {
            this.$emit('delete-chart');
        }
    }
});
//维度筛选菜单
Vue.component('chu-filter-menu',{
   props:['measure_filters','head'],
    template:`<ul class="chu-m-filter-ul">
                <li class="chu-container-li_head">{{head}}</li>
                <li v-for="item of measure_filters" class="chu-container-li" @click.stop="openFilterDialog(item)">{{item}}</li>
              </ul>`,
    methods:{
        openFilterDialog:function (val) {
            this.$emit('open-filter-dialog','filter',val);
        }
    }
});
//维度筛选框模态框
Vue.component('chu-filter-dialog',{
    props:['filters'],
    data:function () {
      return{
          choosed:[],
      }
    },
    template:`<div class="mask_filter">
                <div class="dialog chu_filter_dialog">
                    <div class="dialog_head chu_filter_dialog_head">过滤器<img src="img/delete_black.png" class="w20 h20 fr mt18 mr25 csp" @click="hideDialog"/></div>
                    <div class="filter_source_head"><img src="img/ABC.png" class="w20 h20 vm"><strong class="ml10 f14 vm">{{filters.head}}</strong><span class="ml10 f12 vm gray">{{filters.len}}</span></div>
                    <div class="filter_back filter_source">
                        <ul class="filter_source_content" v-for="item of filters.filter">
                            <li @click="addToList(item)">{{item}}</li>    
                        </ul>
                    </div>
                    <div class="filter_back filter_choose">
                        <div v-for="item of this.choosed"><div class="choosed_item"><span class="ml5">{{item}}</span><img src="img/delete-x-s.png" class="vm w13 h13 csp ml5 mr5" @click="deleteItem(item)"></div></div>
                    </div>
                    <div class="filter_delete_choose" @click="deleteAll"></div>
                    <div class="clear"></div>
                    <button class="button w50 h30  mt40  mr50 fr" @click="hideDialog">取消</button>
                    <button class="button w50 h30  mt40  mr25 fr" @click="useFilters">应用</button>
                </div>
             </div>`,
    methods:{
        hideDialog:function () {
            this.choosed.splice(0,this.choosed.length);
            this.$emit("hide-dialog",'filter');
        },
        addToList:function (val) {
            for(var i=0;i<this.choosed.length;i++){
                if(val == this.choosed[i]){
                    return;
                }
            }
            this.choosed.push(val);
        },
        deleteItem:function (val) {
            this.choosed.removeByValue(val);
        },
        deleteAll:function () {
            this.choosed.splice(0,this.choosed.length);
        },
        useFilters:function () {
            this.$emit('use-filters',this.filters.head,this.choosed);
            this.choosed.splice(0,this.choosed.length);
        }
    },
});