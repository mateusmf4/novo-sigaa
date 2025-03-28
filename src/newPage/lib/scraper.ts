export interface PaginaInicialTurmaInfo {
	nome: string;
	formId: string;
	frontendId: string;
}

export interface PaginaInicial {
	turmas: PaginaInicialTurmaInfo[];
}

export function parseInicial(document: Document): PaginaInicial {
	const turmas = Array.from(
		document
			.getElementById('turmas-portal')
			?.querySelectorAll(':scope > table')[1]
			.querySelectorAll('a')!,
		(x) => {
			const nome = x.textContent?.trim() ?? '?';
			const [_, formId, frontendId] =
				x.attributes
					.getNamedItem('onclick')
					?.textContent?.match(/{'(.+?)':'\1','frontEndIdTurma':'(.+?)'}/) ?? [];
			return {
				nome,
				formId,
				frontendId,
			};
		}
	);
	return {
		turmas,
	};
}

export interface PaginaTurma {
	nome: string;
	codigo: string;
	professor: string;
	ultimasNoticias: {
		horario: string;
		titulo: string;
	}[];
	aulas: {
		titulo: string;
		inicio: string;
		fim: string;
		descricao: string;
	}[];
}

function turmaBlocoDireito(document: Document, nome: string): Element | undefined {
	return Array.from(document.querySelectorAll('div.blocoDireita > div.rich-stglpanel-body')).find(
		(el) => {
			return el.parentElement?.querySelector('.headerBloco')?.textContent?.trim() === nome;
		}
	);
}

export function parseTurma(document: Document): PaginaTurma {
	const nome = document.getElementById('linkNomeTurma')!.textContent!;
	const codigo = document
		.getElementById('linkCodigoTurma')!
		.textContent?.replace('-', '')
		.trim()!;
	// TODO: jeito melhor de extrair o professor
	const professor = document
		.getElementById('ultimaNoticia')
		?.querySelector('small > i')
		?.textContent?.trim()!;

	const ultimasNoticias = turmaBlocoDireito(document, 'Notícias')!
		.textContent!.trim()
		.split('(Visualizar)')
		.filter((x) => x.trim())
		.map((str) => {
			const [horario, titulo] = str
				.trim()
				.split('\n')
				.map((x) => x.trim());
			return {
				horario,
				titulo,
			};
		});

	const aulas = Array.from(
		document.querySelectorAll('[id="formAva:panelTopicosNaoSelecionados"] .topico-aula')
	).map((el) => {
		const tituloString = el.querySelector('.titulo')!.textContent!.trim();
		const descricao = el.querySelector('.conteudotopico p')?.textContent?.trim() ?? '';
		const [_, titulo, inicio, fim] = tituloString.match(
			/(.+?) \((\d{2}\/\d{2}\/\d{4}) - (\d{2}\/\d{2}\/\d{4})\)/
		)!;
		return {
			titulo,
			inicio,
			fim,
			descricao,
		};
	});
	return {
		nome,
		codigo,
		professor,
		ultimasNoticias,
		aulas,
	};
}
