import { sessaoExpirada } from '../state.svelte';
import type { PaginaTurma, PaginaTurmaNoticia } from './types';

const SIGAA_URL_DISCENTE = 'https://sigaa.ufcg.edu.br/sigaa/portais/discente/discente.jsf' as const;
const SIGAA_URL_AVA = 'https://sigaa.ufcg.edu.br/sigaa/ava/index.jsf' as const;
const COMMON_OPTIONS = {
	headers: {
		accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
		'accept-language': 'en-US,en;q=0.9,pt;q=0.8,es;q=0.7',
	},
	credentials: 'include',
} as const;

export class RequisicaoInvalida extends Error {
	readonly description: string;
	constructor(description: string) {
		super(`Requisição invalida! (${description})`);
		this.description = description;
	}
}

function checkErrors(body: string, checkInicial = true): string {
	if (
		checkInicial &&
		body.includes('Dados Institucionais') &&
		body.includes('capes.jpg') &&
		body.includes('Turmas do Semestre')
	) {
		throw new RequisicaoInvalida('retornou pagina inicial quando não deveria');
	}
	if (body.includes("alert('Sua sess")) {
		sessaoExpirada.set(true);
		throw new RequisicaoInvalida('sessão expirada');
	}
	return body;
}

class SigaaRequests {
	private cachedRequests: Map<string, string>;

	constructor() {
		this.cachedRequests = new Map();
	}

	private async checkCache(key: string, fn: () => Promise<string>): Promise<string> {
		if (this.cachedRequests.has(key)) {
			console.log(key, 'tinha no cache!');
			return this.cachedRequests.get(key)!;
		}
		const result = await fn();
		this.cachedRequests.set(key, result);
		return result;
	}

	async requestInicial(): Promise<string> {
		return this.checkCache('inicial', async () => {
			const req = await fetch(SIGAA_URL_DISCENTE, {
				...COMMON_OPTIONS,
				method: 'GET',
			});
			return checkErrors(await req.text(), false);
		});
	}

	async requestTurma(frontendId: string): Promise<string> {
		return this.checkCache(`turma/${frontendId}`, async () => {
			// parece que só liga pro frontendid, o resto pode ser sempre o mesmo
			const body = new URLSearchParams({
				form_acessarTurmaVirtualj_id_1: 'form_acessarTurmaVirtualj_id_1',
				'javax.faces.ViewState': 'j_id1',
				'form_acessarTurmaVirtualj_id_1:j_id_jsp_340461267_387j_id_1':
					'form_acessarTurmaVirtualj_id_1:j_id_jsp_340461267_387j_id_1',
				frontEndIdTurma: frontendId,
			});
			const req = await fetch(SIGAA_URL_DISCENTE, {
				...COMMON_OPTIONS,
				body,
				method: 'POST',
			});
			return checkErrors(await req.text());
		});
	}

	async requestTurmaFrequencia(turma: PaginaTurma): Promise<string> {
		return this.checkCache(`turma/${turma.codigo}/frequencia`, async () => {
			const body = new URLSearchParams(turma.links.frequencia);
			const req = await fetch(SIGAA_URL_AVA, {
				...COMMON_OPTIONS,
				body,
				method: 'POST',
			});
			return checkErrors(await req.text());
		});
	}

	async requestNoticia(noticia: PaginaTurmaNoticia): Promise<string> {
		return this.checkCache(`noticia/${noticia.id}`, async () => {
			const body = new URLSearchParams(noticia.formData);
			const req = await fetch(SIGAA_URL_AVA, {
				...COMMON_OPTIONS,
				body,
				method: 'POST',
			});
			return checkErrors(await req.text());
		});
	}
}

const instance = new SigaaRequests();
export default instance;
