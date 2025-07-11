const questions = {
  "zh-HK": [
    { q: "開 party 嗰陣，我覺得我係全場焦點。", trait: "外向度", reverse: false },
    { q: "我成日都主動問朋友有冇嘢要我幫手。", trait: "親和度", reverse: false },
    { q: "我成日將計劃安排得妥妥當當。", trait: "認真盡責度", reverse: false },
    { q: "我好容易因為啲芝麻綠豆嘅小事而有壓力。", trait: "情緒不穩定度", reverse: false },
    { q: "我鍾意探索新事物，例如新餐廳或者活動。", trait: "經驗開放度", reverse: false },

    { q: "同朋友一齊嗰陣我鍾意成日講嘢。", trait: "外向度", reverse: false },
    { q: "我會為朋友準備小禮物。", trait: "親和度", reverse: false },
    { q: "我對工作細節特別講究。", trait: "認真盡責度", reverse: false },
    { q: "我有時會擔心自己嘅表現。", trait: "情緒不穩定度", reverse: false },
    { q: "我鍾意參加各種文化活動。", trait: "經驗開放度", reverse: false },

    { q: "傾計嗰陣我會主動帶起話題。", trait: "外向度", reverse: false },
    { q: "我會耐心聆聽朋友嘅煩惱。", trait: "親和度", reverse: false },
    { q: "我成日都會提早完成工作。", trait: "認真盡責度", reverse: false },
    { q: "我好容易因為啲芝麻綠豆嘅小事而有焦慮。", trait: "情緒不穩定度", reverse: false },
    { q: "我對藝術同音樂有濃厚興趣。", trait: "經驗開放度", reverse: false },

    { q: "我鍾意喺陌生人面前表演。", trait: "外向度", reverse: false },
    { q: "我會主動邀請朋友出街。", trait: "親和度", reverse: false },
    { q: "我成日都攪禍(gaau2 wo5)晒啲嘢。", trait: "認真盡責度", reverse: true },
    { q: "我會因為未來嘅事情而感到不安。", trait: "情緒不穩定度", reverse: false },
    { q: "我鍾意嘗試新事物。", trait: "經驗開放度", reverse: false },

    { q: "我定期參加社交活動。", trait: "外向度", reverse: false },
    { q: "我記得住朋友嘅重要日子。", trait: "親和度", reverse: false },
    { q: "我有時覺得工作好無聊。", trait: "認真盡責度", reverse: true },
    { q: "我好容易因為啲芝麻綠豆嘅小事而容易失落。", trait: "情緒不穩定度", reverse: false },
    { q: "我對新工嘅適應能力好強。", trait: "經驗開放度", reverse: false },

    { q: "我唔介意成為焦點。", trait: "外向度", reverse: false },
    { q: "我會主動關心其他人嘅情緒。", trait: "親和度", reverse: false },
    { q: "我會計劃好所有的行程。", trait: "認真盡責度", reverse: false },
    { q: "我成日會因為情緒波動而覺得好困擾。", trait: "情緒不穩定度", reverse: false },
    { q: "我成日都諗到啲天馬行空嘅嘢。", trait: "經驗開放度", reverse: false }
  ],

  "zh-TW": [
    { q: "在舉辦派對過程中，我覺得我是焦點。", trait: "外向度", reverse: false },
    { q: "我經常主動詢問朋友是否需要幫助。", trait: "親和度", reverse: false },
    { q: "我總是將計劃安排得井井有條。", trait: "認真盡責度", reverse: false },
    { q: "我很容易因為小事而感到壓力。", trait: "情緒不穩定度", reverse: false },
    { q: "我喜歡探索新事物，比如新餐廳或活動。", trait: "經驗開放度", reverse: false },

    { q: "我和朋友聚在一起時喜歡經常說話。", trait: "外向度", reverse: false },
    { q: "我會為朋友準備小禮物。", trait: "親和度", reverse: false },
    { q: "我對工作的細節特別講究。", trait: "認真盡責度", reverse: false },
    { q: "我有時會擔心自己的表現。", trait: "情緒不穩定度", reverse: false },
    { q: "我對文化活動充滿興趣。", trait: "經驗開放度", reverse: false },

    { q: "我會主動引導對話。", trait: "外向度", reverse: false },
    { q: "我會耐心傾聽朋友的煩惱。", trait: "親和度", reverse: false },
    { q: "我經常會提前完成工作。", trait: "認真盡責度", reverse: false },
    { q: "我容易因為小事而感到焦慮。", trait: "情緒不穩定度", reverse: false },
    { q: "我對藝術和音樂有濃厚的興趣。", trait: "經驗開放度", reverse: false },

    { q: "我喜歡在陌生人面前表演。", trait: "外向度", reverse: false },
    { q: "我會主動邀請朋友出去。", trait: "親和度", reverse: false },
    { q: "我常把事情弄到亂七八糟。", trait: "認真盡責度", reverse: true },
    { q: "我會因為未來的事情感到不安。", trait: "情緒不穩定度", reverse: false },
    { q: "我喜歡嘗試新食物和菜式。", trait: "經驗開放度", reverse: false },

    { q: "我會定期參加社交活動。", trait: "外向度", reverse: false },
    { q: "我會記得朋友的重要日子。", trait: "親和度", reverse: false },
    { q: "我對工作有時會感到無聊。", trait: "認真盡責度", reverse: true },
    { q: "我會因為小事而容易失落。", trait: "情緒不穩定度", reverse: false },
    { q: "我對新工作的適應能力強。", trait: "經驗開放度", reverse: false }
  ],

  "en-UK": [
    { q: "I consider myself the life of the party.", trait: "Extraversion", reverse: false },
    { q: "I often ask my friends if they need help.", trait: "Agreeableness", reverse: false },
    { q: "I always plan everything meticulously.", trait: "Conscientiousness", reverse: false },
    { q: "I easily feel stressed over minor issues.", trait: "Neuroticism", reverse: false },
    { q: "I love exploring new things, like new restaurants or activities.", trait: "Openness", reverse: false },

    { q: "I like to chat a lot when I am with my friends.", trait: "Extraversion", reverse: false },
    { q: "I like to prepare small gifts for my friends.", trait: "Agreeableness", reverse: false },
    { q: "I pay special attention to details in my work.", trait: "Conscientiousness", reverse: false },
    { q: "I sometimes worry about my performance.", trait: "Neuroticism", reverse: false },
    { q: "I have a keen interest in cultural events.", trait: "Openness", reverse: false },

    { q: "I tend to start conversations.", trait: "Extraversion", reverse: false },
    { q: "I patiently listen to my friends' troubles.", trait: "Agreeableness", reverse: false },
    { q: "I often complete my tasks ahead of time.", trait: "Conscientiousness", reverse: false },
    { q: "I can get anxious over small matters.", trait: "Neuroticism", reverse: false },
    { q: "I have a strong interest in arts and music.", trait: "Openness", reverse: false },

    { q: "I enjoy performing in front of strangers.", trait: "Extraversion", reverse: false },
    { q: "I actively invite friends out for activities.", trait: "Agreeableness", reverse: false },
    { q: "I always make a mess of things.", trait: "Conscientiousness", reverse: true },
    { q: "I sometimes feel uneasy about the future.", trait: "Neuroticism", reverse: false },
    { q: "I love trying new foods and cuisines.", trait: "Openness", reverse: false },

    { q: "I regularly attend social events.", trait: "Extraversion", reverse: false },
    { q: "I remember important dates for my friends.", trait: "Agreeableness", reverse: false },
    { q: "I sometimes feel bored with work tasks.", trait: "Conscientiousness", reverse: true },
    { q: "I can feel down over minor setbacks.", trait: "Neuroticism", reverse: false },
    { q: "I adapt well to new jobs and experiences.", trait: "Openness", reverse: false }
  ]
};