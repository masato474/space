/*
 * data.js
 */

const json_path = ["data.json","data6.json","data7.json"];	// 読み込むJSONファイル
const result_box = document.querySelector("#js-result");
let queries = 9;
const back_num = function(i,queries = 9){
	// 0>5 1>6 2>7 3>8 4>9
	i_c = Number(i);
	// console.log(i_c);
	if(i_c < 5){i_c = i_c+5;}else{i_c = i_c-5}

	return i_c;
}
let res_num = {};
let resB_num = {};
const formatJSON = function(json){
	// JSONファイルを整形して表示
	let html = "";
	res_num = {};
	resB_num = {};
	for(let i of json.data){
		let i_res = i.res;
		// console.log(String(i_res).length);
		let item_ = "";

		// if(isNaN(i_res) === false) {
		// }
		// i_res = String(i_res);

			i_res = i_res.split(" ");
			for(let i=0;i<i_res.length;i++) {
				// console.log(i_res.slice(i,i+1));
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


const f_num_list = function(st = "9"){
	// let status = st;
	if(queries && queries !== "" && queries == 9||queries == 37 ||queries == 43) st = queries;
	// console.log(st);
	const num = document.querySelector('#js-num_list');
	num.setAttribute("data-num",queries);
	const set_list = st;
	let list_html = '';
	let ii = 1;
	if(queries == "9") ii = 0;
	for(let i = ii;i<= set_list;i++){
		list_html += `<li class="c-btn c-${i}" data-num="${i}">${i}<div class="c-rBox"><span class="c-r"></span><span class="c-rb"></span></div></li>`;
	}
	num.innerHTML = list_html;
};

document.querySelector("#js-menu").addEventListener("click", (e)=>{
	e.target.closest('#nav').classList.toggle("act");
});

const btn_click = function(btn_class = false){

	if(btn_class == false) return false;
	let btn_ = document.querySelectorAll(btn_class);

	function click_function(){
			e = this;
			// console.log(e.getAttribute("class"));
			// if(!e.hasAttribute("class")) return false;

			//btn toggle act
			let data_num = "";
			if(e.dataset.num) data_num = e.dataset.num;
			if(data_num !== "") result_box.classList.toggle(`c-${data_num}`);
			
			//下部ボタン
			if(e.closest("#js-num_list")) {
				e.classList.toggle("act");
				result_box.classList.add("c-act");
				if(document.querySelectorAll("#js-num_list .act").length < 1) result_box.classList.remove("c-act");
			}

			//navボタン
			if(e.closest("#nav")) {
				if(e.dataset.q) queries = e.dataset.q;
				if(document.querySelectorAll("#nav .act").length>=1) document.querySelector("#nav .act").classList.remove("act");
				// console.log(queries);
				f_num_list(queries);
				reload_json();
				// if(document.querySelectorAll("#js-num_list .act").length < 1) result_box.classList.remove("c-act");
				e.classList.toggle("act");
			}

			//backnumボタン
			if(e.hasAttribute("id") == "js-backNum") {
				if(e.dataset.q) queries = e.dataset.q;
				if(document.querySelectorAll("#nav .act").length>=1) document.querySelector("#nav .act").classList.remove("act");
				// console.log(queries);
				f_num_list(queries);
				reload_json();
				// if(document.querySelectorAll("#js-num_list .act").length < 1) result_box.classList.remove("c-act");
				e.classList.toggle("act");
			}
	}
	btn_.forEach(function(e) {
		e.removeEventListener("click", click_function);
		e.addEventListener("click", click_function);
	});

}

const initialize = function(){
	btn_click(".p-num__box > .c-btn");
	btn_click(".l-nav__list .c-btn");
	btn_click("#js-backNum");
}

const f_num_count = function(){
	// console.log(resB_num);
	function set_num(da,st = false){
		for(var key in da) {
			// console.log(`${key}:${da[key]}`);
			if(st == false){
				if(document.querySelector(`.c-${da[key]}`)) document.querySelector(`.c-${da[key]} .c-r`).textContent = da[key];
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
	// console.log(json);
	fetch(json)
		.then( response => response.json())
		.then( data => formatJSON(data));
}
// 起動時の処理
window.addEventListener("load", ()=>{
	// getUrlQueries();
	// console.log(queries);

	reload_json();
	f_num_list();

});
