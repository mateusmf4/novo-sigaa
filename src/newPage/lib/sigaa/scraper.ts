import type { Frequencia, JspViewFormData, PaginaInicial, PaginaTurma } from './types';

export function parseInicial(document: Document): PaginaInicial {
	const turmas = Array.from(
		document
			.getElementById('turmas-portal')
			?.querySelectorAll(':scope > table')[1]
			.querySelectorAll('a')!,
		(x) => {
			const nome = x.textContent?.trim() ?? '?';
			const formData = parseJspViewForm(x);
			return {
				nome,
				formData,
			};
		}
	);
	return {
		turmas,
		userProfile: {
			nome: document.querySelector('#info-usuario p.usuario')!.textContent!.trim(),
			matricula: document
				.querySelector('#agenda-docente td:nth-child(2)')!
				.textContent!.trim(),
			profilePicture: document.querySelector('div.foto img')!.getAttribute('src')!,
		},
	};
}

export function parseTurma(document: Document): PaginaTurma {
	function findBlocoDireita(nome: string): Element | undefined {
		return Array.from(
			document.querySelectorAll('div.blocoDireita > div.rich-stglpanel-body')
		).find((el) => {
			return el.parentElement?.querySelector('.headerBloco')?.textContent?.trim() === nome;
		});
	}

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

	const noticiasElem = findBlocoDireita('Notícias')!;
	const noticiasForms = noticiasElem.querySelectorAll('form');
	const ultimasNoticias = noticiasElem
		.textContent!.trim()
		.split('(Visualizar)')
		.filter((x) => x.trim())
		.map((str, i) => {
			const formData = parseJspViewForm(noticiasForms[i].querySelector('a')!);
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

	const [aulasMinistradas, aulasTotal] = findBlocoDireita('Andamento das Aulas')!
		.querySelector('i')!
		.textContent!.split('/')
		.map((x) => parseInt(x.trim()));

	const linkFrequencia = parseJspViewForm(
		Array.from(document.querySelectorAll('div.itemMenu')).find(
			(x) => x.textContent === 'Frequência'
		)!.parentElement!
	);
	return {
		nome,
		codigo,
		professor,
		ultimasNoticias,
		aulas,
		aulasMinistradas,
		aulasTotal,
		links: {
			frequencia: linkFrequencia,
		},
	};
}

export function parseNoticia(document: Document) {
	const conteudo = document.querySelector('.conteudoNoticia')?.textContent?.trim() ?? '';
	return {
		conteudo,
	};
}

export function parseFrequencia(document: Document): Frequencia[] {
	return Array.from(document.querySelectorAll('table.listing > tbody > tr')).map((row) => {
		const date = row.children[0].textContent?.trim() ?? '';
		const situacao = row.children[1].textContent?.trim() ?? '';
		const faltas = situacao.match(/(\d+) Falta/);
		return {
			date,
			registrada: situacao !== 'Não Registrada',
			faltas: faltas ? parseInt(faltas[1]) : 0,
		};
	});
}

function parseJspViewForm(anchor: Element): JspViewFormData {
	const code = anchor.getAttribute('onclick') ?? '';
	const match = code.match(/document\.getElementById\('(.+?)'\)/);
	let form;
	if (match) {
		form = anchor.ownerDocument.getElementById(match[1])! as HTMLFormElement;
	}
	if (!form && anchor.parentElement?.tagName === 'form') {
		form = anchor.parentElement! as HTMLFormElement;
	}
	if (!form) {
		console.error('eita');
		console.error(anchor);
		console.error(code);
		throw new Error('não achei o form');
	}
	let entries = Object.fromEntries(new FormData(form).entries()) as JspViewFormData;
	try {
		const extra = JSON.parse(code.match(/({'.+?'})/)![1].replace(/'/g, '"'));
		entries = { ...entries, ...extra };
	} catch (_) {}
	return entries;
}
