export interface PaginaInicialTurmaInfo {
	nome: string;
	formData: JspViewFormData;
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
			const formData = parseJspViewForm(x.parentElement! as HTMLFormElement);
			return {
				nome,
				formData,
			};
		}
	);
	return {
		turmas,
	};
}

export interface PaginaTurmaNoticia {
	id: string;
	horario: string;
	titulo: string;
	formData: JspViewFormData;
}

export interface PaginaTurma {
	nome: string;
	codigo: string;
	professor: string;
	ultimasNoticias: PaginaTurmaNoticia[];
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

	const noticiasElem = turmaBlocoDireito(document, 'Notícias')!;
	const noticiasForms = noticiasElem.querySelectorAll('form');
	const ultimasNoticias = noticiasElem
		.textContent!.trim()
		.split('(Visualizar)')
		.filter((x) => x.trim())
		.map((str, i) => {
			const formData = parseJspViewForm(noticiasForms[i]);
			const id = formData.id as string;
			const [horario, titulo] = str
				.trim()
				.split('\n')
				.map((x) => x.trim());
			return {
				id,
				horario,
				titulo,
				formData,
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

export function parseNoticia(document: Document) {
	const conteudo = document.querySelector('.conteudoNoticia')?.textContent?.trim() ?? '';
	return {
		conteudo,
	};
}

export type JspViewFormData = Record<string, string>;

function parseJspViewForm(form: HTMLFormElement): JspViewFormData {
	let entries = Object.fromEntries(new FormData(form).entries()) as JspViewFormData;
	try {
		const extra = JSON.parse(
			form
				.querySelector('a')!
				.getAttribute('onclick')!
				.match(/({'.+?'})/)![1]
				.replace(/'/g, '"')
		);
		entries = { ...entries, ...extra };
	} catch (_) {}
	return entries;
}
