/*
 * data.js
 */

// const json_path = ["data.json","data6.json","data7.json"];	// 読み込むJSONファイル
const json_path = ["NUMBERS3_ALL.csv","LOTO6_ALL.csv","LOTO7_ALL.csv"];	// 読み込むJSONファイル
const result_box = document.querySelector("#js-result");
let queries = 9;
let before_count = 5;
const back_num = function(i,queries = 9){
	// 0>5 1>6 2>7 3>8 4>9
	i_c = Number(i);
	if(i_c < 5){i_c = i_c+5;}else{i_c = i_c-5}
	return i_c;
}
let res_num = {};
let resB_num = {};

function func_selectList_make(st = false,n_ = false){
	// selectList__item = document.querySelectorAll('#js-selectBox .c-selectList__item');
	// if(n_ == false) return false;
	// let sub_ =  [];
	// if(st == "sub") {
		// sub_list = document.querySelectorAll('#js-num_list .act');
		// sub_list.forEach(function(e){
			// num__ = e.dataset.num;
			// sub_.push(num__);
		// })
	// }
	// if(document.querySelector('#js-selectBox .act')){
		// html = `<p class="c-selectList__itemTitle">${n_}</p><div class="c-selectList__itemSub">${sub_}</div>`;
		// document.querySelector('#js-selectBox .act').innerHTML = html;
	// }else{
		// html = `<li class="act"><p class="c-selectList__itemTitle">${n_}</p><div class="c-selectList__itemSub">${sub_}</div></li>`;
		// document.querySelector('#js-selectBox').insertAdjacentHTML('beforeend',html);
	// }

	if(st == "bottom") {
		
		let main_ =  [];
		if(document.querySelectorAll('#js-num_list .main').length>=1){
			main_list = document.querySelectorAll('#js-num_list .main');
			main_list.forEach(function(e){
				num__ = e.dataset.num;
				main_.push(num__);
			})
		}
		let not_ =  [];
		if(document.querySelectorAll('#js-num_list .not').length>=1){
			// console.log(1);
			not_list = document.querySelectorAll('#js-num_list .not');
			not_list.forEach(function(e){
				num__ = e.dataset.num;
				not_.push(num__);
			})
		}

		// html = `<li class="main_not"><p class="c-selectList__itemTitle">${n_}</p><div class="c-selectList__itemSub">${sub_}</div></li>`;
		document.querySelector('#js-selectBox .c-selectList__itemTitle').innerHTML = main_;
		document.querySelector('#js-selectBox .c-selectList__itemSub').innerHTML = not_;
	}
	
	
	// selectList__item.forEach(){
		// html = `<li class="p-result__item" id="n${i_id}" >
		// <div class="p-result__id">${i_id}</div>
		// <div class="p-result__number">
		// <span class="c-memo"><i class="c-memo_u2${set_stock_flg}"></i><i class="c-memo_b2${set_stock_b_flg}"></i><i class="c-memo_o2"></i></span>
		// ${item_}
		// </div>
		// <div class="p-result__memo">${i_m}</div>
		// </li>\n${html}`;
		// }
	
}
function func_bottom_btn(e){
	let data_num = "";
	if(e.dataset.num) data_num = e.dataset.num;
	// console.log(data_num);
	
	if(data_num !== "") {
		if(e.classList.contains("act")) result_box.classList.toggle(`c-${data_num}`);
		if(document.querySelector('#js-selectMainAdd').classList.contains('act')||
			document.querySelector('#js-result').classList.contains(`c-${data_num}--Main`)) document.querySelector('#js-result').classList.toggle(`c-${data_num}--Main`);
	}

	if(e.closest('#js-num_list')){

		if(e.classList.contains("act")){
			e.classList.remove("act");
			result_box.classList.remove(`c-${data_num}`);
			e.classList.add("not");
		}else if(e.classList.contains("not")){
			e.classList.remove("not");
		}else{
			e.classList.add("act");
			result_box.classList.add(`c-${data_num}`);
		}
		if(document.querySelector("#js-selectMainAdd").classList.contains("act") ){
			if(e.classList.contains("not")){
				e.classList.remove("not");
				e.classList.add("main");
			}else if(e.classList.contains("main")){
				e.classList.remove("main");
			}else{
				e.classList.add("main");
			}
		}
		if(document.querySelectorAll("#js-num_list .main").length>=1 || document.querySelectorAll("#js-num_list .not").length>=1 ){
			func_selectList_make("bottom");
		}
	}else{
		if(e.classList.contains("act")){
			e.classList.remove("act");
		}else{
			e.classList.add("act");
		}
	}

	result_box.classList.add("c-act");
	if(document.querySelectorAll("#js-num_list .act").length < 1) result_box.classList.remove("c-act");


	//js-selectBox
	if(document.querySelector('#js-selectMainAdd').classList.contains('act')){
		document.querySelector('#js-selectMainAdd').classList.toggle('act');
		// console.log('m'+data_num);
		func_selectList_make('main',data_num);
	}
	if(document.querySelector('#js-selectSubAdd').classList.contains('act')){
		// console.log('s'+data_num);
		func_selectList_make('sub',data_num);
		// document.querySelector('#js-selectSubAdd').classList.toggle('act');
	}
}

const btn_resultId_click = function(){
	let list =  document.querySelectorAll('#js-result .p-result__id');
	if(list.length<1) return false;
	list.forEach(function(i) {
		i.addEventListener("click", ()=>{
			i.closest('.p-result__item').classList.toggle('act');
		});
	})
}

function getCSV(path){
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "log/"+path, true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
	// console.log(path);
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
	// document.querySelector('#js-result').setAttribute('class','p-result__box');
	result_box.setAttribute('class','p-result__box');
	let numlist_act =  document.querySelectorAll('#js-num_list .act');
	if(numlist_act.length>=1) {
		numlist_act.forEach(function(i) {
			i.classList.remove('act');
		});
	}
    req.onload = function(){
		convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
		btn_resultId_click();
		btn_resultList_click();
		btn_numList_click();
	}
}

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
let limit_num = document.querySelector('#js-limit');
function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
	
    // var result = []; // 最終的な二次元配列を入れるための配列
    var result = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成

    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    // for(var i=0;i<tmp.length;++i){
        // result[i] = tmp[i].split(',');
    // }

	let html = "";
	res_num = {};
	resB_num = {};
	let limit_ = 1000;
	if(limit_num.value !== "" && isNaN(limit_num.value) == false) limit_ = limit_num.value;
	let set_limit = limit_;
	if(result.length >= limit_) set_limit = result.length - set_limit;
	let old_stock = "";
	let old_stock_b = "";

	for(let i=0; i<result.length;i++){

		if(result.length >=limit_ && i<set_limit) continue;
		
        result_ = result[i].split(',');
		if(result_ == '') continue;

		let i_id = result_[0];
		if(queries == 37){//7
			i_res = `${result_[2]} ${result_[3]} ${result_[4]} ${result_[5]} ${result_[6]} ${result_[7]} ${result_[8]} ${result_[9]} ${result_[10]}`;
		}else if(queries == 43){//6
			i_res = `${result_[2]} ${result_[3]} ${result_[4]} ${result_[5]} ${result_[6]} ${result_[7]} ${result_[8]}`;
		}else{//3
			i_res = result_[2];
		}
		let i_m = result_[12];
		let item_ = "";

		// if(isNaN(i_res) === false) {
		// }
		// i_res = String(i_res);
		
		if(!i_res) return false;


		if(queries == 9) {//3
			i_res = String(i_res).split('');
		}else{//6 or 7
			i_res = i_res.split(" ");
		}

		set_stock_b = [];
		set_stock_flg = "";
		set_stock_b_flg = "";
		//result list make
		
		for(let i=0;i<i_res.length;i++) {
			// console.log(i_res.slice(i,i+1));
			i_ = i_res[i];
			i_n = Number(i_)
			i_c = 0;
			i_b = back_num(i_);
			
			if(i>=1) set_stock_b.push(i_b);
			
			set_i_ = Number(i_);
			if(Number.isNaN(set_i_)) continue;

			if(i>=1 && old_stock.includes(i_)) {
				set_stock_flg = " act";
			}

			if(i>=1 && old_stock_b.includes(set_i_)) {
				set_stock_b_flg = " act";
			}

			if(!res_num[`n${set_i_}`]) {res_num[`n${set_i_}`] = 1;}else{res_num[`n${set_i_}`] += 1;}
			if(!resB_num[`n${i_b}`]) {resB_num[`n${i_b}`] = 1;}else{resB_num[`n${i_b}`] += 1}
			item_ += `<span class="c-n c-${i_n}" data-num="${i_n}">${i_}<span class="c-b">${i_b}</span></span>`;
		};
		html = `<li class="p-result__item" id="n${i_id}" >
		<div class="p-result__id">${i_id}</div>
		<div class="p-result__number">
		<span class="c-memo"><i class="c-memo_u2${set_stock_flg}"></i><i class="c-memo_b2${set_stock_b_flg}"></i><i class="c-memo_o2"></i></span>
		${item_}
		</div>
		<div class="p-result__beforeNum">
		</div>
		<div class="p-result__memo">${i_m}</div>
		</li>\n${html}`;

		if(queries == 9){
			old_stock = [i_res[1],i_res[2]];
		}else{
			old_stock = i_res;
		}
		old_stock_b = set_stock_b;
	}
	// console.log(html);
	// console.log(res_num);
	// console.log(resB_num);
	// result_box.innerHTML = "<li>a</li>";
	result_box.innerHTML = html;
	f_num_count();

	// initialize();
}

//no use
const formatJSON = function(json){
	// JSONファイルを整形して表示
	let html = "";
	res_num = {};
	resB_num = {};
	for(let i of json.data){
		let i_res = i.res;
		let item_ = "";

		// if(isNaN(i_res) === false) {
		// }
		// i_res = String(i_res);

			i_res = i_res.split(" ");
			for(let i=0;i<i_res.length;i++) {
				// i_ = i_res.slice(i,i+1);
				i_ = i_res[i];
				i_c = 0;
				i_b = back_num(i_);
				if(!res_num[`n${i_}`]) {res_num[`n${i_}`] = 1;}else{res_num[`n${i_}`] += 1;}
				if(!resB_num[`n${i_b}`]) {resB_num[`n${i_b}`] = 1;}else{resB_num[`n${i_b}`] += 1}
				item_ += `<span class="c-n c-${i_}">${i_}<span class="c-b">${i_b}</span></span>`;
			};

		html += `<li class="p-result__item" id="n${i.id}">
		<div class="p-result__id">${i.id}</div>
		<div class="p-result__number">${item_}</div>
		<div class="p-result__memo">${i.m}</div>
		</li>`
		;
	}
	// console.log(res_num);
	// console.log(resB_num);
	f_num_count();
	result_box.innerHTML = html;

	initialize();
}

// const getUrlQueries = function() {
//   let queryStr = window.location.search.slice(1);  // 文頭?を除外
      
  // クエリがない場合は空のオブジェクトを返す
//   if (!queryStr) {
    // return queries;
//   }
  
  // クエリ文字列を & で分割して処理
//   queryStr.split('&').forEach(function(queryStr) {
    // = で分割してkey,valueをオブジェクトに格納
    // var queryArr = queryStr.split('=');
    // queries[queryArr[0]] = queryArr[1];
//   });
//   document.querySelectorAll("#js-menu .l-nav__list .c-btn");
//   return queries;
// }


const st = 43;
const f_numbtn_make = function(id=false){
	const num = document.querySelector(id);
	document.querySelector('#js-query').setAttribute("data-num",queries);
	const set_list = st;
	let list_html = '';
	let ii = 1;
	for(let i = 0;i<= set_list;i++){
		if(id=="#js-num_list"){
			list_html += `<li class="c-btn c-${i}" data-num="${i}">${i}<div class="c-rBox"><span class="c-r"></span><span class="c-rb"></span></div></li>`;
		}else{
			list_html += `<li class="c-btn c-${i}" data-num="${i}">${i}</li>`;
		}
	}
	num.innerHTML = list_html;
};
f_numbtn_make("#js-num_list");

const f_num_list = function(st = "9"){
	// let status = st;
	if(queries && queries !== "" && queries == 9||queries == 37 ||queries == 43) st = queries;
	// st = 43;
	const num = document.querySelector('#js-num_list');
	document.querySelector("#js-query").setAttribute("data-num",queries);
	// const set_list = st;
	// let list_html = '';
	// let ii = 1;
	// for(let i = 0;i<= set_list;i++){
		// list_html += `<li class="c-btn c-${i}" data-num="${i}">${i}<div class="c-rBox"><span class="c-r"></span><span class="c-rb"></span></div></li>`;
	// }
	// num.innerHTML = list_html;
};

document.querySelector("#js-menu").addEventListener("click", (e)=>{
	e.target.closest('#nav').classList.toggle("act");
});


const btn_resultList_click = function(){
	let item = document.querySelectorAll('#js-result .p-result__item');
	item.forEach(function(i) {
		i.addEventListener("click", (e)=>{
			if(document.querySelector("#js-limit").value !== "" && Number(document.querySelector("#js-limit").value)) before_count = document.querySelector("#js-limit").value;
			this_ = Number(i.getAttribute('id').replace('n',""));

			let this_bofore = i.querySelectorAll('.c-n');
			let before_n = [];
			for(let j=1;j<=before_count;j++){
				let n = this_ - j;
				if(n<1) return false;
				let n_id = String(n);
				// console.log(document.querySelector(`#n${n_id}`));
				let get_c_n = document.querySelectorAll(`#n${n_id} .c-n`);
				get_c_n.forEach((c,index)=>{
					// if(index === 0) return;
					if(!before_n.includes(c.dataset.num)) before_n.push(c.dataset.num);
					// console.log(index)
				})
			}
			let before_n_ = before_n;
			if(before_n.length>=2) {
				before_n_ = "";
				before_n.forEach((c) =>{
					before_n_ += " "+c;
				})
			}
			i.querySelector('.p-result__beforeNum').textContent = before_n_;

			// console.log(this_bofore[1].dataset.num);
			if(before_n.includes(this_bofore[1].dataset.num) && before_n.includes(this_bofore[2].dataset.num)){
				i.classList.toggle('act');
			}
			// console.log(before_n);
		});
	});
}

//下部選択ボタン
const btn_numList_click = function(){
	let c_n = document.querySelectorAll('#js-result .c-n');
	c_n.forEach(function(i) {
		i.addEventListener("click", (e)=>{
			n = i.dataset.num;
			item_ = document.querySelector(`#js-num_list .c-btn[data-num="${n}"]`);
			func_bottom_btn(item_);
		});
	});
	// document.querySelectorAll('#js-num_list .c-btn');
}


// #js-selectInput li

const btn_click = function(btn_class = false){

	if(btn_class == false) return false;
	let btn_ = document.querySelectorAll(btn_class);

	function click_function(e_){
		e = this;

		//btn toggle act
		// let data_num = "";
		// if(e.dataset.num) data_num = e.dataset.num;
		// if(data_num !== "") result_box.classList.toggle(`c-${data_num}`);
		
		//LINKボタン
		if(e.closest(".l-nav__link__list")) {
			e_.preventDefault();
            navigator.clipboard.writeText(e.getAttribute('href'))
		}

		//下部ボタン
		if(e.closest("#js-num_list")) {
			func_bottom_btn(e);
			// if(e.classList.contains("act")){
			// 	e.classList.remove("act");
			// }else{
			// 	e.classList.add("act");
			// }
			// result_box.classList.add("c-act");
			// if(document.querySelectorAll("#js-num_list .act").length < 1) result_box.classList.remove("c-act");
		}

		//navボタン
		if(e.closest("#nav")) {
			if(e.dataset.q) queries = e.dataset.q;
			if(document.querySelectorAll("#nav .act").length>=1) document.querySelector("#nav .act").classList.remove("act");
			f_num_list(queries);
			reload_json();
			// if(document.querySelectorAll("#js-num_list .act").length < 1) result_box.classList.remove("c-act");
			if(e.classList.contains("act")){e.classList.remove("act");}else{e.classList.add("act");}
			// console.log(queries)
			
		}

						
		//backnumボタン
		if(e.hasAttribute("id") == "js-backNum") {
			if(e.dataset.q) queries = e.dataset.q;
			if(document.querySelectorAll("#nav .act").length>=1) document.querySelector("#nav .act").classList.remove("act");
			f_num_list(queries);
			reload_json();
			// if(document.querySelectorAll("#js-num_list .act").length < 1) result_box.classList.remove("c-act");
			if(e.classList.contains("act")){e.classList.remove("act");}else{e.classList.add("act");}
		}
	}
	btn_.forEach(function(e) {
		e.removeEventListener("click", click_function);
		e.addEventListener("click", click_function);
	});

}
//select view
let nav__selectBtn = document.querySelectorAll(".l-nav__selectBtn > .c-btn");
nav__selectBtn.forEach(function(e) {
	e.addEventListener("click", (i)=>{
		e.classList.toggle("act");
		if(e.hasAttribute('id') && e.getAttribute('id')=='js-selectOpen') {
			document.querySelector('#js-selectList').classList.toggle('act');
		}
	});
});

const initialize = function(){
	// btn_click(".l-nav__selectBtn > .c-btn");
	btn_click(".p-num__box > .c-btn");
	btn_click(".l-nav__list .c-btn");
	btn_click(".l-nav__link__list .c-btn");
	btn_click("#js-backNum");
}

const f_num_count = function(){
	function set_num(da,st = false){
		for(var key in da) {
			set_key = key.replace("n","");
			if(set_key == '') continue;
			if(st == false){
				if(set_key && document.querySelector(`.c-${set_key}`)) {
					document.querySelector(`.c-${set_key} .c-r`).textContent = da[key];
				}
			}else{
				if(set_key && document.querySelector(`.c-${set_key}`)) document.querySelector(`.c-${set_key} .c-rb`).textContent = da[key];
			}
		};
	}
	set_num(res_num,false);
	set_num(resB_num,"b");

}
const reload_json = function(){
	if(queries == 37){
		json = json_path[2];
	}else if(queries == 43){
		json = json_path[1];
	}else {
		json = json_path[0];
	}

	// fetch(json)
		// .then( response => response.json())
		// .then( data => formatJSON(data));
		getCSV(json);
	}

// 起動時の処理
window.addEventListener("load", ()=>{
	// getUrlQueries();
	// console.log(queries);

	reload_json();
	initialize();
	f_num_list();

});
