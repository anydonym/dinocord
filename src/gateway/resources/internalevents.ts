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
	error_type: string;
	error: Error;
}

export interface DispatchEvent {
	event_name: string;
}
