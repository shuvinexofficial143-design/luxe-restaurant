export function softHaptic(){if(typeof navigator!=="undefined"&&"vibrate"in navigator)navigator.vibrate?.(8)}
export function successHaptic(){if(typeof navigator!=="undefined"&&"vibrate"in navigator)navigator.vibrate?.([10,35,10])}
