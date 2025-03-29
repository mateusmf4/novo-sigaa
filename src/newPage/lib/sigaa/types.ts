export interface PaginaInicialTurmaInfo {
	nome: string;
	formData: JspViewFormData;
}

export interface PaginaInicial {
	turmas: PaginaInicialTurmaInfo[];
	userProfile: UserState;
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
	aulasMinistradas: number;
	aulasTotal: number;
	links: {
		frequencia: JspViewFormData;
	};
}

export interface Frequencia {
	date: string;
	registrada: boolean;
	faltas: number;
}

export type JspViewFormData = Record<string, string>;

export interface UserState {
	nome: string;
	matricula: string;
	profilePicture: string;
}
