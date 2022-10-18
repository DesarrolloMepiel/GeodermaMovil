export const goScanner = () => {
	scanner();
	$('#exampleModal').modal('show');
	$('canvas').addClass('hidden'); 
}

export const scanner = () => {
	const $resultados = document.querySelector("#resultado");
	Quagga.init({
		inputStream: {
			constraints: {
				width: 470,
				height: 300,
				// width: 1920,
				// height: 1080,
			},
			name: "Live",
			type: "LiveStream",
			target: document.querySelector('#contenedor'),
		},
		decoder: {
			readers: ["ean_reader"]
		}
	}, function (err) {
		if (err) {
			console.log(err);
			return
		}
		Quagga.start();
		// console.log("Iniciado correctamente");
	});

	Quagga.onDetected((data) => {
		$resultados.textContent = data.codeResult.code;
		// Imprimimos todo el data para que puedas depurar
		console.log(data);
		$('#exampleModal').modal('hide');
		// $('#contenedor').hide();
		Quagga.stop(data);
	});
}