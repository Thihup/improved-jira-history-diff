(function () {
    const getElement = (parentElement, className) => {
        return [...(parentElement.children)].find(child => {
            return child.classList.contains(className);
        });
    }

    if (!window.monaco)
        throw new Error("MonacoEditor not loaded");
    var historyNodes = [...window.document.getElementsByClassName("changehistory")]

    historyNodes.forEach(history => {

        let node;
        try {
            node = history.children[0].children[1].children[0];
        } catch (e) {
            node = history.children[0].children[0].children[0];
        }

        var oldText = getElement(node, "activity-old-val").innerText;
        var currentText = getElement(node, "activity-new-val").innerText;

        const newDivNodeId = Math.random().toString(36).substring(2);

        const checkboxInline = document.createElement("input");
        checkboxInline.type = "checkbox";
        checkboxInline.id = `checkbox-${newDivNodeId}`;

        const labelDiv = document.createElement("label");
        labelDiv.innerText = "Inline Diff";
        labelDiv.appendChild(checkboxInline);


        const divNode = document.createElement("div");
        divNode.style.width = "1500px";
        divNode.style.height = "400px";
        divNode.style.display = "block";
        divNode.id = newDivNodeId;

        history.replaceChildren(labelDiv, divNode);

        const diffEditor = window.monaco.editor.createDiffEditor(divNode, {
            enableSplitViewResizing: true,
            renderSideBySide: true,
            automaticLayout: true
        });

        checkboxInline.addEventListener('change', function () {
            diffEditor.updateOptions({
                renderSideBySide: !this.checked
            });
        });


        var lhsModel = window.monaco.editor.createModel(oldText, 'markdown');
        var rhsModel = window.monaco.editor.createModel(currentText, 'markdown');

        diffEditor.setModel({
            original: lhsModel,
            modified: rhsModel
        });

        window.monaco.editor.createDiffNavigator(diffEditor).next()
    })
})();