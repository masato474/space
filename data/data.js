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
const formatJSON = function(json){
	// JSONファイルを整形して表示
	let html = "";
	for(let i of json.data){
		// console.log(i);
		let i_res = i.res;
		// console.log(String(i_res).length);
		let item_ = "";
		// if(isNaN(i_res) === false) {
			// console.log(i.res);
			// i_res = String(i_res);
			i_res = i_res.split(" ");
			for(let i=0;i<i_res.length;i++) {
				// console.log(i_res.slice(i,i+1));
				// i_ = i_res.slice(i,i+1);
				i_ = i_res[i];
				i_c = 0;
				i_c = back_num(i_);
				item_ += `<span class="c-n c-${i_}">${i_}<span class="c-b">${i_c}</span></span>`;
			};
		// }

		html += `<li class="p-result__item" id="n${i.id}">
		<div class="p-result__id">${i.id}</div>
		<div class="p-result__number">${item_}</div>
		<div class="p-result__memo">${i.m}</div>
		</li>`
		;
	}
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


const num_list = function(st = "9"){
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
		list_html += `<li class="c-btn c-${i}" data-num="${i}">${i}</li>`;
	}
	num.innerHTML = list_html;
};


document.querySelector("#js-menu").addEventListener("click", (e)=>{
	e.target.closest('#nav').classList.toggle("act");
});

const btn_click = function(btn_class = false){
	if(btn_class == false) return false;
	let btn_ = document.querySelectorAll(btn_class);

	btn_.forEach(function(e) {
		e.addEventListener("click", ()=>{
			// console.log(e.getAttribute("class"));
			// if(!e.hasAttribute("class")) return false;

			//btn toggle act
			let data_num = "";
			if(e.dataset.num) data_num = e.dataset.num;
			if(data_num !== "") result_box.classList.toggle(`c-${data_num}`);
			

			//下部ボタン
			if(e.closest("#js-num_list")) {
				result_box.classList.add("c-act");
				if(document.querySelectorAll("#js-num_list .act").length < 1) result_box.classList.remove("c-act");
			}

			//navボタン
			if(e.closest("#nav")) {
				if(e.dataset.q) queries = e.dataset.q;
				if(document.querySelectorAll("#nav .act").length>=1) document.querySelector("#nav .act").classList.remove("act");
				// console.log(queries);
				num_list(queries);
				reload_json();
				// queries
				// if(document.querySelectorAll("#js-num_list .act").length < 1) result_box.classList.remove("c-act");
			}
			
			e.classList.toggle("act");
			
		});
	});

}

const initialize = function(){
	btn_click(".p-num__box > .c-btn");
	btn_click(".l-nav__list .c-btn");
}

const reload_json = function(){
	if(queries == 37){
		json = json_path[2];
	}else if(queries == 43){
		json = json_path[1];
	}else {
		json = json_path[0];
	}
	console.log(json);
	fetch(json)
		.then( response => response.json())
		.then( data => formatJSON(data));
}
// 起動時の処理
window.addEventListener("load", ()=>{
	// getUrlQueries();
	num_list();
	// console.log(queries);

	reload_json();

});
