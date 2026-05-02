/*
 * data.js
 */

const url = "data.json";	// 読み込むJSONファイル
const result_box = document.querySelector("#js-result");
const formatJSON = function(json){

	// JSONファイルを整形して表示
	let html = "";
	for(let i of json.data){
		//console.log(i);
		let i_res = i.res;
		// console.log(String(i_res).length);
		let item_ = "";
		if(isNaN(i_res) === false) {
			i_res = String(i_res);
			for(let i=0;i<i_res.length;i++) {
				// console.log(i_res.slice(i,i+1));
				i_ = i_res.slice(i,i+1);
				item_ += `<span class="c-n c-${i_}">${i_}</span>`;
			};
		}

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

const  num_list = function(){
	const num = document.querySelector('#js-num_list');
	const set_list = '3';
	let list_html = '';
	for(let i = 1;i<= set_list;i++){
		list_html += `<li class="c-btn c-${i}" data-num="${i}">${i}</li>`;
	}
	num.innerHTML = list_html;
};
num_list();

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
			e.classList.toggle("act");


			//下部ボタン
			if(e.closest("#js-num_list")) {
				result_box.classList.add("c-act");
				if(document.querySelectorAll("#js-num_list .act").length < 1) result_box.classList.remove("c-act");
			}

			//
			
		});
	});

}


const initialize = function(){
	btn_click(".p-num__box > .c-btn");
}

// 起動時の処理
window.addEventListener("load", ()=>{

	fetch(url)
		.then( response => response.json())
		.then( data => formatJSON(data));

});
