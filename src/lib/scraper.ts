export function parseInicial(document: Document) {
	const turmas = Array.from(
		document
			.getElementById('turmas-portal')
			?.querySelectorAll(':scope > table')[1]
			.querySelectorAll('a')!,
		(x) => x.textContent?.trim() ?? '?'
	);
	return {
		turmas
	};
}

export function parseTurma(document: Document) {
	const nome = document.getElementById('linkNomeTurma')!.textContent;
	const codigo = document.getElementById('linkCodigoTurma')!.textContent?.replace('-', '').trim();
	// TODO: jeito melhor de extrair o professor
	const professor = document
		.getElementById('ultimaNoticia')
		?.querySelector('small > i')
		?.textContent?.trim();
	return {
		nome,
		codigo,
		professor
	};
}
