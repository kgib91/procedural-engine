declare global {
    interface Number {
        enumFlagsToString<T>(e: T): string;
    }
}

export function enumFlagsToString<T>(e: T, flags: number): string {
    var keys = Object.keys(e);
    var parts = [];
    for(var i = 0; i < keys.length; ++i) {
        var prop = keys[i];
        if(e.hasOwnProperty(prop)) {
            var flag_keyVal = e[prop];
            var flag = e[flag_keyVal] as any as number;
            if((flags as any as number) & flag) {
                parts.push(flag_keyVal);
            }
        }
    }
    return parts.join('|');
}

Number.prototype.enumFlagsToString = function<T>(e: T): string {
    return enumFlagsToString(e, this);
};

export {}; 