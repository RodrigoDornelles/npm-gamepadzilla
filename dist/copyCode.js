window.onload = function () {


    const copyButtonLabel = "Copy Code";
    // use a class selector if available
    let blocks = document.getElementsByTagName("pre");

    for (let index = 0; index < blocks.length; index++) {
        let block = blocks[index];
        // only add button if browser supports Clipboard API
        if (navigator.clipboard) {
            let button = document.createElement("button");

            button.innerText = copyButtonLabel;
            block.appendChild(button);

            button.addEventListener("click", async () => {
                await copyCode(block, button);
            });
        }
    };

    async function copyCode(block, button) {
        let code = block.querySelector("code");
        let text = code.innerText;

        await navigator.clipboard.writeText(text);

        // visual feedback that task is completed
        button.innerText = "Code Copied";

        setTimeout(() => {
            button.innerText = copyButtonLabel;
        }, 700);
    }

}