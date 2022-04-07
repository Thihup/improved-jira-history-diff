(function () {

  if (!window.monaco) {
    var monacoEditor = document.createElement('script');
    monacoEditor.src = "https://cdn.jsdelivr.net/gh/vanillawc/wc-monaco-editor@1/index.js";
    monacoEditor.type = "module";
    monacoEditor.onload = (e) => {

      var script = document.createElement('script');
      script.type = "module";
      script.src = chrome.runtime.getURL('changeNode.mjs');
      document.body.appendChild(script);
    }
    document.body.appendChild(monacoEditor);
    return
  }

})();