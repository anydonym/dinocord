export default interface InternalEvents {
	ERROR: ErrorEvent;
	FATAL_ERROR: ErrorEvent;
	WEBSOCKET_DEBUG: WebsocketDebug;
	REST_DEBUG: RestDebug;
	CLIENT_EVENT: ClientEvent;
}

export interface WebsocketDebug {
	name: string;
	message: string;
}

export interface RestDebug {
	route: string;
	method: string;
}

export interface ErrorEvent {
	name: string;
	message: string;
	severity: 'ignorable' | 'moderate' | 'severe' | 'fatal';
	trace: string;
}

export interface ClientEvent {
	name: string;
	message: string;
}
