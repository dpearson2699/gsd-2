const pendingAutoResumeTimers = new Set<ReturnType<typeof setTimeout>>();

export function scheduleAutoResumeTimer(delayMs: number, callback: () => void): ReturnType<typeof setTimeout> {
	let handle: ReturnType<typeof setTimeout>;
	handle = setTimeout(() => {
		pendingAutoResumeTimers.delete(handle);
		callback();
	}, delayMs);
	pendingAutoResumeTimers.add(handle);
	return handle;
}

export function clearAutoResumeTimers(): void {
	for (const handle of pendingAutoResumeTimers) {
		clearTimeout(handle);
	}
	pendingAutoResumeTimers.clear();
}
