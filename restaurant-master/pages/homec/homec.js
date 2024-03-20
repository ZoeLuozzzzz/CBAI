// 获取到小程序实例
var app = getApp();
Page({
	data: {
		shop:{
      name:'草本AI茶语',
			desc:'由AI小组与中医茶饮小组共同完成'
		},
		goods: {
			1: {
				id: 1,
        name: '茶饮1',
				pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
				sold: 1014,
				price: 20
			},
			2: {
				id: 2,
				name: '茶饮2',
				pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
				sold: 1029,
				price: 20
			},
			3: {
				id: 3,
        name: '茶3',
				pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
				sold: 1030,
				price: 5
			},
			4: {
				id: 4,
				name: '茶5',
				pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
				sold: 1059,
				price: 5
			},
			5: {
				id: 5,
				name: '茶6',
				pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
				sold: 1029,
				price: 0
			},
			6: {
				id: 6,
				name: '茶7',
				pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
				sold: 1064,
				price: 150
			},
			7: {
				id: 7,
				name: '茶8',
				pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
				sold: 814,
				price: 200
			},
			8: {
				id: 8,
				name: '茶9',
				pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
				sold: 124,
				price: 220
			},
			9: {
				id: 9,
				name: '茶10',
				pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
				sold: 102,
				price: 300
			}
		},
		goodsList: [
			{
				id: 'hot',
				classifyName: '热销',
				goods: [1, 2, 3, 4, 5]
			},
			{
				id: 'new',
				classifyName: '中医',
				goods: [1, 3]
			},
			{
				id: 'vegetable',
				classifyName: '茶饮',
				goods: [1, 6, 5]
			},
			{
				id: 'mushroom',
				classifyName: '中医茶饮',
				goods: [1, 7, 8, 9]
			},
			{
				id: 'food',
				classifyName: '啦啦啦啦',
				goods: [3, 4]
			}
		],
		cart: {
			count: 0,
			total: 0,
			list: {}
		},
		cartList:{},
		showCartDetail: false
	},
	// 生命周期函数--监听页面加载
	// 一个页面只会调用一次。
	onLoad: function (_options) {
		var that = this
		//调用应用实例的方法获取全局数据
		app.getUserInfo(function(userInfo){
		//更新数据
		that.setData({
			userInfo: userInfo
		});
		// that.update();
		console.log(userInfo)
		});
	},
	// 生命周期函数--监听页面初次渲染完成
	onReady: function(){},
	// 生命周期函数--监听页面显示
	// 每次打开页面都会调用一次
	onShow: function () {
		this.setData({
			classifySeleted: this.data.goodsList[0].id
		});
	},
	// 生命周期函数--监听页面隐藏
	// 当navigateTo或底部tab切换时调用
	onHide: function(){},
	// 生命周期函数--监听页面卸载
	// 当redirectTo或navigateBack的时候调用。
	onUnload:function(){},
	// 页面相关事件处理函数--监听用户下拉动作
	onPullDownRefresh:function(){},
	// 页面上拉触底事件的处理函数
	onReachBottom:function(){},

	// 开发者可以添加任意的函数或数据到
	//  object 参数中，在页面的函数中用 this 可以访问
	checkOrderSame: function(name){
		var list = this.data.goods;
		for(var index in list){
			if(list[index].name === name){
				return index;
			}
		}
		return false;
	},
	tapAddCart: function (e) {
		this.addCart(e.target.dataset.id);
	},
	tapReduceCart: function (e) {
		this.reduceCart(e.target.dataset.id);
	},
	addCart: function (id) {
		var num = this.data.cart.list[id] || 0;
		this.data.cart.list[id] = num + 1;
		this.countCart();
		var price = this.data.goods[id].price;
		var name  = this.data.goods[id].name;
		var img   = this.data.goods[id].pic;
		var list  = this.data.cartList;
		var sortedList = [];
		var index;
		if(index = this.checkOrderSame(name)){
			sortedList = list[index];
			var num = this.data.cart.list[id] || 0;
			num = num + 1;
		}
		else{
			var order = {
				"price" : price,
				"num" : 1,
				"name": name,
				'img':  img,
				"shopId": this.data.shopId,
				"shopName": this.data.shop.restaurant_name,
				"pay": 0,
			}
			list.push(order);
			
			sortedList = order;
		}
		this.setData({
			cartList: list,
		});
		console.log(list)
	},
	reduceCart: function (id) {
		var num = this.data.cart.list[id] || 0;
		if (num <= 1) {
			delete this.data.cart.list[id];
		} else {
			this.data.cart.list[id] = num - 1;
		}
		this.countCart();
	},
	countCart: function (_index,_lists) {
		var count = 0,
			total = 0;
		var goods;
		for (var id in this.data.cart.list) {
		    goods = this.data.goods[id];
			count += this.data.cart.list[id];
			total += goods.price * this.data.cart.list[id];
		}
		this.data.cart.count = count;
		this.data.cart.total = total;
		this.setData({
			cart: this.data.cart
		});
		// 存储订单页所需要的数据
		wx.setStorage({
			key: 'orderList',
			data: {
				count: this.data.cart.count,
				total: this.data.cart.total,
				list: this.data.cart.list,
			}
		})
		
	},
	follow: function () {
		this.setData({
			followed: !this.data.followed
		});
	},
	onGoodsScroll: function (e) {
		if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
			this.setData({
				scrollDown: true
			});
		} else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
			this.setData({
				scrollDown: false
			});
		}

		var scale = e.detail.scrollWidth / 570,
			scrollTop = e.detail.scrollTop / scale,
			h = 0,
			classifySeleted,
			len = this.data.goodsList.length;
		this.data.goodsList.forEach(function (classify, _i) {
			var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
			if (scrollTop >= h - 100 / scale) {
				classifySeleted = classify.id;
			}
			h += _h;
		});
		this.setData({
			classifySeleted: classifySeleted
		});
	},
	tapClassify: function (e) {
		var id = e.target.dataset.id;
		this.setData({
			classifyViewed: id
		});
		var self = this;
		setTimeout(function () {
			self.setData({
				classifySeleted: id
			});
		}, 100);
	},
	showCartDetail: function () {
		this.setData({
			showCartDetail: !this.data.showCartDetail
		});
	},
	hideCartDetail: function () {
		this.setData({
			showCartDetail: false
		});
  },
  //  前面gonewpage 就是我定义的bind:tap="gonewpage" ，gonewpage这个名字，你可以自己定义，
//只有一个就行，定义好了之后。
  gonewpage:function(){
    // 这里跳转就好，记得写完之后按下ctrl + s 保存 这样就能跳转了 那后面也是加这个定义的这个就行了吗，页面跳转 ，首先 wxml 加一个按钮
    //     <button bind:tap="gonewpage" class="yellow">我是按钮</button>
    // 然后同级的js 加一个方法
    // 然后里面写跳转页面
    //   url: '/pages/new/new' 这个url ，格式就是路径最外层pages/new/new就可以了 哦哦 那那个按钮加在哪是可以设置的吗 就加在页面的哪个位置，都可以，你自己决定在哪，我目前是在点单的旁边，你也可以加在其他地方，具体的位置，你自己放就好，主要是上面定义按钮，然后页面跳转这个 哦哦好的  记得写完之后按下ctrl + s 保存 还有其他问题不 就是ui怎么自己修改设置 
    // 下面那个蓝色的
    // 点一下 然后去页面随便一个位置点，就能找到对应的代码
    wx.navigateTo({
      url: '/pages/new/new'
		})
  },
	submit: function (_e) {
		var agrs = JSON.stringify(this.data.cart);
    console.log(agrs)
    // 这里就是点单按钮， 然后 需要跳转，你下面的跳转没有跳转
    // https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.redirectTo.html
    // 这就是跳转的文档
    // 
    // 每个跳转的方式都不一样。不同的方式跳转对应不同的api
    // 你是想把 agrs 带到 订单页面对吧
    // 现在跳转这个看懂了吧 大概看懂了
    // 我给你改好吧
    // 现在我教你加那个 
    
		wx.navigateTo({
      url: '/pages/order/order?order=' + agrs
    })
    //  这下面就能跳转  跟着路径写 直接写到new就行，后面的wxml不用加 想问他这一串应该加在什么后面呢 
    // 比如说我这里加的地方就是点单按钮
   
		}
});