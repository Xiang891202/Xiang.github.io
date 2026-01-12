// databaseName.js
export const projectDatabase = [
  {
    id: "multi-filter-591",
    type: "filter-project",

    /* 列表頁資料 */
    listPage: {
      title: "房屋列表多重篩選器（仿 591）",
      description:
        "模擬真實租屋平台情境，設計可同時套用多條條件的多重篩選器，提升使用者搜尋效率與體驗。",
      coverImage: "images/multi-filter-cover.jpg",
      alt: "多重篩選器系統介面展示",
      tags: ["JavaScript", "CSS3", "HTML5", "UX Design"]
    },

    /* 詳細頁資料 */
    detailPage: {
      /* 區域一：30秒短片 / Demo */
      videoSection: {
        title: "多重條件篩選操作示範（30 秒）",
        videoUrl: "videos/multi-filter-demo.mp4",
        description:
          "展示多條件篩選、清除篩選以及列表即時更新的完整操作流程。"
      },

      /* 區域二：PM 思維 */
      pmThinking: {
        problem: {
          title: "問題定義",
          content:
            "在房屋列表平台中，使用者需要同時考慮地區、租金、房型等多個條件。若僅能單一條件篩選，會導致搜尋結果過多，增加瀏覽與決策成本。同時，使用者難以知道目前套用的條件，容易迷失於列表之中。"
        },
        solution: {
          title: "解決方式",
          content:
            "設計可同時套用多條篩選條件的多重篩選器，採交集（AND）邏輯，即時更新列表結果，使用者可快速縮小搜尋範圍。每個篩選條件皆可視化顯示，並提供單條件移除與清除全部功能，提升操作直觀性與效率。"
        },
        decision: {
          title: "設計取捨 / 技術決策",
          points: [
            "資料處理主要在前端完成，減少後端依賴，加快回饋速度",
            "篩選條件數量控制在合理範圍，避免操作負擔過重",
            "提供清除篩選按鈕，防止使用者迷失",
            "響應式設計，兼容桌面、平板與手機",
            "效能優化：使用防抖 (debounce) 技術與高效篩選演算法"
          ]
        }
      },

      /* 區域三：實際體驗 / 連結 */
      experienceSection: {
        title: "實際體驗",
        description:
          "點擊下方連結，可實際操作多重篩選器，體驗條件套用與列表即時更新的流程。",
        demoLink: "https://xiang891202.github.io/filter/",
        buttonText: "前往操作篩選器"
      }
    }
  }
];
