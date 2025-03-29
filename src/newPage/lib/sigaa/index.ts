import SigaaRequests from './requests';
import * as Scraper from './scraper';
import type { Frequencia, PaginaInicial, PaginaTurma, PaginaTurmaNoticia } from './types';

class Sigaa {
	async getInicial(): Promise<PaginaInicial> {
		return Scraper.parseInicial(Document.parseHTMLUnsafe(await SigaaRequests.requestInicial()));
	}

	async getTurma(frontendId: string): Promise<PaginaTurma> {
		return Scraper.parseTurma(
			Document.parseHTMLUnsafe(await SigaaRequests.requestTurma(frontendId))
		);
	}

	async getTurmaNoticia(noticia: PaginaTurmaNoticia) {
		return Scraper.parseNoticia(
			Document.parseHTMLUnsafe(await SigaaRequests.requestNoticia(noticia))
		);
	}

	async getTurmaFrequencia(turma: PaginaTurma): Promise<Frequencia[]> {
		return Scraper.parseFrequencia(
			Document.parseHTMLUnsafe(await SigaaRequests.requestTurmaFrequencia(turma))
		);
	}
}
const instance = new Sigaa();
export default instance;
