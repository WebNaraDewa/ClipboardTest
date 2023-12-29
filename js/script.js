const btn = document.getElementById('btn');
const img = document.getElementById('img');

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