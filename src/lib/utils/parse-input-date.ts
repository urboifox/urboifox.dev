export function parseInputDate(date: string | Date): string {
    if (!date) {
        return '';
    }
    return new Date(date).toISOString().split('T')[0];
}
