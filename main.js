/**
 * 変換処理を実行する.
 */
function execute() {
    var spaceNum = Number(getHtmlInputElementById("spaceNum").value);
    var inputText = getHtmlInputElementById("inputTextarea").value;
    var commentSymbol = getHtmlInputElementById("commentSymbol").value == "" ? "//" : getHtmlInputElementById("commentSymbol").value;
    var inputRows = inputText.split("\n");
    var maxLengthWithoutComment = getMaxLengthWithoutComment(inputRows, commentSymbol);
    for (var i = 0; i < inputRows.length; i++) {
        // 対象の行でない場合は除く
        if (!isTargetRow(inputRows[i], commentSymbol)) {
            continue;
        }
        var lengthWithoutComment = getLengthWithoutComment(inputRows[i], commentSymbol);
        var spaceNumToAdd = " ".repeat((maxLengthWithoutComment - lengthWithoutComment) + spaceNum);
        var splitedWithComment = inputRows[i].split(commentSymbol);
        splitedWithComment[splitedWithComment.length - 2] = splitedWithComment[splitedWithComment.length - 2].trim() + spaceNumToAdd;
        inputRows[i] = splitedWithComment.join(commentSymbol);
    }
    var outputTextarea = document.getElementById("outputTextarea");
    outputTextarea.value = inputRows.join("\n");
}
/**
 * 指定したIDを持つエレメントを返す.
 * @param id エレメントID
 */
function getHtmlInputElementById(id) {
    return document.getElementById(id);
}
/**
 * 操作すべき行か判定する.
 * @param text 判定する対象テキスト
 * @param commentSymbol コメント文字列
 */
function isTargetRow(text, commentSymbol) {
    if (!text.includes(commentSymbol)) {
        return false;
    }
    if (text.trim().startsWith(commentSymbol)) {
        return false;
    }
    return true;
}
/**
 * 文字列のリストからコメントを除いて最大の長さを持つ要素の長さを返す.
 * コメントのない行は判定要素としない.
 * @param inputTexts 文字列のリスト
 * @param commentSymbol コメント文字列
 */
function getMaxLengthWithoutComment(inputTexts, commentSymbol) {
    var maxLength = 0;
    for (var i = 0; i < inputTexts.length; i++) {
        // 対象の行でない場合は除く
        if (!isTargetRow(inputTexts[i], commentSymbol)) {
            continue;
        }
        var lengthWithoutComment = getLengthWithoutComment(inputTexts[i], commentSymbol);
        if (lengthWithoutComment > maxLength) {
            maxLength = lengthWithoutComment;
        }
    }
    return maxLength;
}
/**
 * コメント文字列を除く文字列の長さを取得する.
 * @param inputText テキスト
 * @param commentSymbol コメント文字列
 */
function getLengthWithoutComment(inputText, commentSymbol) {
    var splitedWithComment = inputText.split(commentSymbol);
    var splitedWithoutComment = splitedWithComment.slice(0, splitedWithComment.length - 1);
    return splitedWithoutComment.join(commentSymbol).trim().length;
}
