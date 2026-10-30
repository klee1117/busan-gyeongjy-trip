# 釜山・慶州旅行地圖（GitHub Pages）

這是一個純前端、免後端的旅行規劃網站。可以放到 GitHub，使用 GitHub Pages 免費發布。

## 功能

- 互動地圖：使用 Leaflet + OpenStreetMap，可切換釜山／慶州視角。
- 預載景點：釜山與慶州共 17 個起始地點，包含景點、美食、交通與商圈。
- 自訂地點：按「新增地點」，再點選地圖位置；可編輯名稱、韓文名稱、分類、日期、時間、地址、備註、預算與完成狀態。
- 每日行程：以 2026/12/04–12/08 五天行程分組，設定地點日期後會自動列入。
- 搜尋與篩選：可依名稱／備註搜尋，依城市與類別篩選。
- 旅行備忘：可編輯旅程總備忘與出發前 checklist。
- 預算統計：加總各地點填入的韓元預算。
- 備份與還原：右上角可匯出／匯入 JSON。
- 本機保存：修改會保存在目前瀏覽器的 localStorage，不需要帳號或資料庫。

## 發布到 GitHub Pages

1. 在 GitHub 建立一個新的 repository，例如 `busan-gyeongju-trip`。
2. 將本資料夾中的 `index.html`、`styles.css`、`app.js`、`README.md` 上傳到 repository 根目錄。
3. 打開 repository 的 **Settings → Pages**。
4. 在 **Build and deployment** 選擇 **Deploy from a branch**。
5. Branch 選 `main`，資料夾選 `/(root)`，按 **Save**。
6. 等待 GitHub Pages 部署完成，網址會是 `https://你的GitHub帳號.github.io/busan-gyeongju-trip/`。

## 使用注意

- 網站需要網路連線才能載入 Leaflet、OpenStreetMap 地圖圖磚與 Google Fonts。
- 地圖資料由 OpenStreetMap 提供；起始景點座標是方便規劃的參考位置，可能落在景點範圍附近，請以店家／景點官方資訊及導航結果為準。
- localStorage 只保存在目前裝置與瀏覽器。清除瀏覽資料、換瀏覽器或換手機前，請先匯出 JSON 備份。GitHub Pages 不會自動同步不同裝置的修改。
- 若要在手機和電腦間同步資料，下一版可接 Firebase 或 Supabase；目前版本刻意不需要 API key 或後端。
