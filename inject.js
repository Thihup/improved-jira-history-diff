(function () {

  const injectChangeNodeScript = () => {

    const script = document.createElement('script');
    script.type = "module";
    script.src = chrome.runtime.getURL('changeNode.mjs');
    document.body.appendChild(script);
  };

  if (window.document.getElementsByClassName("changehistory").length == 0 || window.monaco) {
    return
  }
  const monacoEditor = document.createElement('script');
  monacoEditor.src = "https://cdn.jsdelivr.net/gh/vanillawc/wc-monaco-editor@1/index.js";
  monacoEditor.type = "module";
  monacoEditor.onload = injectChangeNodeScript;
  document.body.appendChild(monacoEditor);

}) ();