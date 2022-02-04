export default interface InternalEvents {
	ERROR: ErrorEvent;
	GATEWAY_EVENT: GatewayEvent;
	WEBSOCKET_DEBUG: GatewayEvent;
	DISPATCH: DispatchEvent;
}

export interface GatewayEvent {
	name: string;
	message: string;
}

export interface ErrorEvent {
	name: string;
	message: string;
	trace: string;
}

export interface DispatchEvent {
	event_name: string | number | symbol;
}
