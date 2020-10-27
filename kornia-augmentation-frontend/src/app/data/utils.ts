export function get_random_id() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

  
export function object_add_suffix(obj, suffix) {
    const keyValues = Object.keys(obj).map(key => {
        const newKey = key + suffix;
        return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
}


export function object_remove_suffix(obj) {
    const keyValues = Object.keys(obj).map(key => {
        const newKey = key.substring(0, key.length - 9);
        return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
}


export class KorniaFormDataControl {
    private _name: string;
    private _kwargs: object;
    private _timestamp: string;

    constructor(name: string, kwargs: object, timestamp?: string) {
        this._name = name;
        this._kwargs = kwargs;
        if (timestamp) {
            this._timestamp = timestamp;
        } else {
            this._timestamp = get_random_id()
        }
    }

    get name() { return this._name; }
    get kwargs() { return this._kwargs; }
    get timestamp() { return this._timestamp; }

    set name(value) { this._name = value; }
    set kwargs(value) { this._kwargs = value; }

}