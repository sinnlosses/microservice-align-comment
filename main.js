/**
 * 変換処理を実行する.
 */
function execute() {
    var spaceNum = Number(getDocumentId("spaceNum").value);
    var inputText = getDocumentId("inputTextarea").value;
    var commentSymbol = getDocumentId("commentSymbol").value;
    var inputTexts = inputText.split("\n");
    var maxLengthWithoutComment = getMaxLengthWithoutComment(inputTexts, commentSymbol);
    for (var i = 0; i < inputTexts.length; i++) {
        // 行自体にコメント記号がない場合は除く
        if (!inputTexts[i].match(commentSymbol)) {
            continue;
        }
        var space = " ".repeat((maxLengthWithoutComment - getLengthWithoutComment(inputTexts[i], commentSymbol)) + spaceNum);
        var splitedWithComment = inputTexts[i].split(commentSymbol);
        splitedWithComment[splitedWithComment.length - 2] += space;
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
 * 文字列のリストからコメントを除いて最大の長さを持つ要素の長さを返す.
 * コメントのない行は判定要素としない.
 * @param inputTexts 文字列のリスト
 * @param commentSymbol コメント文字列
 */
function getMaxLengthWithoutComment(inputTexts, commentSymbol) {
    var maxLength = 0;
    for (var i = 0; i < inputTexts.length; i++) {
        // 行自体にコメントがない場合は除く
        if (!inputTexts[i].match(commentSymbol)) {
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
