/*
 * data.js
 */

const url = "data.json";	// 読み込むJSONファイル

function formatJSON(json){

	// JSONファイルを整形して表示
	let html = "";
	for(let i of json.data){
		//console.log(i);
		html += `<p>${i.id} ${i.res} / ${i.m}</p>`;
	}
	document.getElementById("result").innerHTML = html;
}

// 起動時の処理
window.addEventListener("load", ()=>{

	fetch(url)
		.then( response => response.json())
		.then( data => formatJSON(data));

});
