/**
 * 変換処理を実行する.
 */
function execute():void{
    const spaceNum:number = Number(getHtmlInputElementById("spaceNum").value);
    const inputText:string = getHtmlInputElementById("inputTextarea").value;
    const commentSymbol:string = getHtmlInputElementById("commentSymbol").value == "" ? "//" : getHtmlInputElementById("commentSymbol").value;
    const inputRows:string[] = inputText.split("\n");
    const maxLengthWithoutComment:number = getMaxLengthWithoutComment(inputRows, commentSymbol);

    for (let i = 0; i < inputRows.length; i++){
        // 対象の行でない場合は除く
        if (!isTargetRow(inputRows[i], commentSymbol)){
            continue;
        }

        const lengthWithoutComment:number = getLengthWithoutComment(inputRows[i], commentSymbol);
        const spaceNumToAdd:string = " ".repeat((maxLengthWithoutComment-lengthWithoutComment)+spaceNum);
        const splitedWithComment:string[] = inputRows[i].split(commentSymbol);
        splitedWithComment[splitedWithComment.length-2] = splitedWithComment[splitedWithComment.length-2].trim()+spaceNumToAdd;
        inputRows[i] = splitedWithComment.join(commentSymbol);
    }
    let outputTextarea:HTMLInputElement = <HTMLInputElement>document.getElementById("outputTextarea");
    outputTextarea.value = inputRows.join("\n");
}

/**
 * 指定したIDを持つエレメントを返す.
 * @param id エレメントID
 */
function getHtmlInputElementById(id:string):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}

/**
 * 操作すべき行か判定する.
 * @param text 判定する対象テキスト
 * @param commentSymbol コメント文字列
 */
function isTargetRow(text:string, commentSymbol:string):boolean{
    if (!text.includes(commentSymbol)){
        return false;
    }
    if (text.trim().startsWith(commentSymbol)){
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
function getMaxLengthWithoutComment(inputTexts:string[], commentSymbol:string):number{
    let maxLength:number = 0;
    for (let i = 0; i < inputTexts.length; i++){
        // 対象の行でない場合は除く
        if (!isTargetRow(inputTexts[i], commentSymbol)){
            continue;
        }
        const lengthWithoutComment = getLengthWithoutComment(inputTexts[i], commentSymbol);
        if (lengthWithoutComment > maxLength){
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
function getLengthWithoutComment(inputText:string, commentSymbol:string):number{
    const splitedWithComment:string[] = inputText.split(commentSymbol);
    const splitedWithoutComment:string[] = splitedWithComment.slice(0, splitedWithComment.length-1);
    return splitedWithoutComment.join(commentSymbol).trim().length;
}