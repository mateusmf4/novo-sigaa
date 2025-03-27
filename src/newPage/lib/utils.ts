export function toTitleCase(str: string): string {
	return str
		.toLocaleLowerCase()
		.split(' ')
		.map((x) => {
			return x.substring(0, 1).toUpperCase() + x.substring(1);
		})
		.join(' ');
}
