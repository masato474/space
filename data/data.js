/*
 * data.js
 */

const url = "data.json";	// 読み込むJSONファイル

const formatJSON = function(json){

	// JSONファイルを整形して表示
	let html = "";
	for(let i of json.data){
		//console.log(i);
		html += `<p>${i.id} ${i.res} / ${i.m}</p>`;
	}
	document.getElementById("result").innerHTML = html;
}


const  num_list = function(){
	const num = document.querySelector('#js-num_list');
	const set_list = '3';
	let list_html = '';
	for(let i = 1;i<= set_list;i++){
		console.log(i);
		list_html += `<li>${i}</li>`;
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
