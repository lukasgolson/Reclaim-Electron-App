const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld(
    'electron',
    {
        getHTML: () => ipcRenderer.invoke('get-html'),
    }
);


if (document.readyState !== 'loading') init()
else document.addEventListener('DOMContentLoaded', init);

function init() {

    console.log('DOM ready');

    // Select the node that will be observed for mutations
    const targetNode = document.body;

    // Options for the observer (which mutations to observe)
    const config = {childList: true, subtree: true};

    // Callback function to execute when mutations are observed
    const callback = async function (mutationsList, observer) {

        console.log('Callback called');


        let xpath = "/html/body/div[2]/div/div/div[1]/div/nav[2]";
        let result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        let navElement = result.singleNodeValue;

        if (navElement) {
            try {
                console.log('Found element, getting HTML');
                const htmlToInject = await window.electron.getHTML();

                console.log('Injecting HTML');

                navElement.insertAdjacentHTML('beforeend', htmlToInject);


                // Once we've found the element, we don't need to keep observing:
                observer.disconnect();
            } catch (err) {
                console.error('Error in script', err);
            }
        }else{
            console.log('Nav element not found');
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
};
