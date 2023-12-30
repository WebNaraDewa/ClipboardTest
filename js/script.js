const btn = document.getElementById('btn');
const img = document.getElementById('img');

document.addEventListener('DOMContentLoaded', function() {
  
    // Safariを使用している場合はボタンを非活性にする
    if (isSafariOrFirefox()) {
        btn.disabled = true;
  
    // メッセージを表示するテキスト要素を作成
    let message = document.createElement('p');
    message.textContent = 'このブラウザでは直接画像をクリップボードに保存できません。代わりに、画像を選択してコピーしてください。';
      
    // メッセージをボタンの後に追加
    btn.parentNode.insertBefore(message, btn.nextSibling);
    }
  });



btn.addEventListener('click', async()=>{
    try{
        // canvas要素作成
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // canvasからBlobオブジェクト生成
        canvas.toBlob(async (blob)=>{
            const item = new ClipboardItem({
                'image/png': blob
            });
            await navigator.clipboard.write([item]);
            alert('クリップボードに保存しました！')
        });
    }catch(err){
        console.log(err);
        alert('クリップボードの保存に失敗しました。(エラー)' + err);        
    }
})

// SafariまたはFirefoxを使用しているかどうかを判定する関数
function isSafariOrFirefox() {
    var userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes("safari") && !userAgent.includes("chrome") || userAgent.includes("firefox");
}