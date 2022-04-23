export interface Component {
    id: string;
    fields?: [];//{}
    logs?: [];//
    secrets?: {};
}

// log: time, type, source type, source id, message, detail