
export function copy_text(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(function(){});
    }
}
