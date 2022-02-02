export default interface InternalEvents {
	DEBUG: DebugEvent;
	ERROR: ErrorEvent;
	HEARTBEAT: void;
	HEARTBEAT_ACK: void;
	DISPATCH: DispatchEvent;
}

export interface DebugEvent {
	event_type: string;
	message: string;
}

export interface ErrorEvent {
	name: string;
	type: string;
	message: string;
	trace: string;
}

export interface DispatchEvent {
	event_name: string | number | symbol;
}
