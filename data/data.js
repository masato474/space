/*
 * data.js
 */

const url = "data.json";	// 読み込むJSONファイル

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
				item_ += `<span>${i_}</span>`;
			};
		}

		html += `<li id="n${i.id}">
		<p>${i.id}</p>
		<p>${item_}</p>
		<p>${i.m}</p>
		</li>`
		;
	}
	document.getElementById("js-result").innerHTML = html;
}

const  num_list = function(){
	const num = document.querySelector('#js-num_list');
	const set_list = '3';
	let list_html = '';
	for(let i = 1;i<= set_list;i++){
		list_html += `<li class="c-btn">${i}</li>`;
	}
	num.innerHTML = list_html;
};
num_list();


// 起動時の処理
window.addEventListener("load", ()=>{

	fetch(url)
		.then( response => response.json())
		.then( data => formatJSON(data));

});
