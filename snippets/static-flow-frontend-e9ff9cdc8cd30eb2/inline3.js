
export function gpt2api_copy_text(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(function(){});
    }
}
export function gpt2api_make_draggable(panelId, handleId) {
    const panel = document.getElementById(panelId);
    const handle = document.getElementById(handleId);
    if (!panel || !handle || panel.dataset.dragBound === "1") return;
    panel.dataset.dragBound = "1";
    handle.addEventListener("pointerdown", function(event) {
        if (event.button !== 0) return;
        if (event.target && event.target.closest && event.target.closest("button,input,select,textarea,a")) return;
        event.preventDefault();
        const rect = panel.getBoundingClientRect();
        const startX = event.clientX;
        const startY = event.clientY;
        const startLeft = rect.left;
        const startTop = rect.top;
        panel.style.right = "auto";
        panel.style.left = startLeft + "px";
        panel.style.top = startTop + "px";
        handle.setPointerCapture(event.pointerId);
        function move(moveEvent) {
            const nextLeft = Math.max(8, Math.min(window.innerWidth - 80, startLeft + moveEvent.clientX - startX));
            const nextTop = Math.max(8, Math.min(window.innerHeight - 48, startTop + moveEvent.clientY - startY));
            panel.style.left = nextLeft + "px";
            panel.style.top = nextTop + "px";
        }
        function up(upEvent) {
            handle.releasePointerCapture(upEvent.pointerId);
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", up);
        }
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);
    });
}
