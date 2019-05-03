declare global {
    interface String {
        replaceAll(search: string, replacement: string): string;
    }
}

function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export function stringReplaceAll(target: String, search: string, replacement: string): string {
    return target.replace(new RegExp(escapeRegExp(search), 'g'), replacement);
};

String.prototype.replaceAll = function(search: string, replacement: string): string {
    return stringReplaceAll(this, search, replacement);
};

export {}; 
