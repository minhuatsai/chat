# chat
### `結構說明`
頁面主要切割成三大區塊：
* ##### QuestionContainer (輸入問題的區塊)
* ##### AnswerContainer (供回答問題的區塊)
* ##### ConversationHistoryContainer (Q&A的歷史紀錄)

### `State、event管理`
在App的class中存放主要state的資料以及所綁定的事件，任何component所要存放的資料及觸發的事件，均會由此統一管理

### `流程說明`
頁面一載入，會判斷localstorage中是否存放問題及回覆的清單，若有則將此歷史紀錄顯示在頁面上
QuestionContainer 在輸入問題後按下發送，會先檢查欄位是否為空字串，有輸入值才能發送
發送後問題清單出現了則在render頁面時，AnswerContainer 因而出現，這邊 AnswerContainer 按鈕處理邏輯與QuestionContainer一致
，只是傳送的answer資料會一併將容器內的 question 資料發送，發送後由於回答清單出現了，則在render頁面時，ConversationHistoryContainer 因而出現
，ConversationHistoryContainer 就單純顯示傳過來的question、answer資料
