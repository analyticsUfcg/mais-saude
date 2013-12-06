
var dataset = [];
var dicionario = [];
var desvios = [];


//Carrega arquivo inicial e os botoes
function loadData() {

	d3.csv("data/tabela_com_todos_os_indicadores_selecionados_e_desvios.csv" , function (data){		
		dataset = data;
		loadUpCities(dataset);
		resetMap(dataset);

	});

	d3.csv("data/dicionario.csv" , function (data){
		dicionario = data;
		// Carrega os buttons de indicadores no arquivo indicador.buttons.js
		loadUpButtons(dicionario)
	});

	d3.csv("data/desvios.csv" , function (data){
		desvios = data.map(function(d){ console.log(d);return {



			indicador: d.indicador,
			ano: d.ano,
			bounds: [d.min, d.q4.neg, d.q3.neg, d.q2.neg, d.q0, d.q2, d.q3, d.q4, d.max]

	    }});
	});

	// ativa o icone back to map
	$("#button_back_map").click(function() { 	
			var selection = $("#myList").val("Visão Geral");
			selection.change();
	});

	// ativa o bootstrap-select.js do seletor
	//$('.selectpicker').selectpicker({'selectedText': 'cat'});

};



function loadUpCities(data) {
		
		//compara unicode characters
		function sortComparer(a,b){
			return a.localeCompare(b);
		};
		
		var cities = data.map(function(d){return d.NOME_MUNICIPIO;}).unique().sort(sortComparer);
		//adiciona um vazio dentro do array
		cities.unshift("Visão Geral");
		
		var myList = d3.selectAll("#myList");
		
		myList.selectAll("option").data(cities).enter().append("option")
			.attr("value",function(d){return d;})
			.attr("label",function(d){return d;})
			.attr("data-icon", "icon-map-marker")
			.text(function(d){return d;})
		;
}



Array.prototype.unique = function() {
    var o = {}, i, l = this.length, r = [];
    for(i=0; i<l;i+=1) o[this[i]] = this[i];
    for(i in o) r.push(o[i]);
    return r;
};