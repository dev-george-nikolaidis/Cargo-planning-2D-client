export function calculateLDM(pallets: number): number {
	const ldmPerPallet = 0.4;
	const num = (pallets * ldmPerPallet).toFixed(2);
	return Number(num);
}

export function generateBackgroundColor() {
	const r = Math.floor(Math.random() * 128);
	const g = Math.floor(Math.random() * 128);
	const b = Math.floor(Math.random() * 128);

	const color = `rgb(${r},${g},${b})`;
	return color;
}
