/**
 * 変換処理を実行する.
 */
function execute() {
    var spaceNum = Number(getDocumentId("spaceNum").value);
    var inputText = getDocumentId("inputTextarea").value;
    var commentSymbol = getDocumentId("commentSymbol").value == "" ? "//" : getDocumentId("commentSymbol").value;
    var inputTexts = inputText.split("\n");
    var maxLengthWithoutComment = getMaxLengthWithoutComment(inputTexts, commentSymbol);
    for (var i = 0; i < inputTexts.length; i++) {
        // 対象の行でない場合は除く
        if (!isTargetRow(inputTexts[i], commentSymbol)) {
            continue;
        }
        var space = " ".repeat((maxLengthWithoutComment - getLengthWithoutComment(inputTexts[i], commentSymbol)) + spaceNum);
        var splitedWithComment = inputTexts[i].split(commentSymbol);
        splitedWithComment[splitedWithComment.length - 2] = splitedWithComment[splitedWithComment.length - 2].trim() + space;
        inputTexts[i] = splitedWithComment.join(commentSymbol);
    }
    var outputTextarea = document.getElementById("outputTextarea");
    outputTextarea.value = inputTexts.join("\n");
}
/**
 * 指定したIDを持つエレメントを返す.
 * @param id エレメントID
 */
function getDocumentId(id) {
    return document.getElementById(id);
}
/**
 * 操作すべき行か判定する.
 * @param text 判定する対象テキスト
 * @param commentSymbol コメント文字列
 */
function isTargetRow(text, commentSymbol) {
    if (!text.match(commentSymbol)) {
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
    return splitedWithoutComment.join(commentSymbol).length;
}
