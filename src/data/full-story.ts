import { Story } from '@/types/chat';

function msg(id: string, sender: 'npc' | 'user' | 'system', content: string, type: 'text' | 'tactic-alert' = 'text') {
  return { id, sender, content, timestamp: 0, type };
}

const fullStory: Story = {
  id: 'pua-awareness',
  title: 'PUA觉醒之路',
  description: '一段从心动到觉醒的微信聊天故事，学会识别9种PUA操控手段',
  npcName: '陈昊',
  startNodeId: 'ch1-pickup',
  nodes: {
    // ═══════════════════════════════════════════
    // 第一章：搭讪 (Pickup)
    // ═══════════════════════════════════════════
    'ch1-pickup': {
      id: 'ch1-pickup',
      messages: [
        msg('1-1', 'npc', '嘿，不好意思打扰一下'),
        msg('1-2', 'npc', '你是不是上次在线下读书会见过的？我感觉你好面熟'),
        msg('1-3', 'npc', '我叫陈昊，在互联网公司做产品总监'),
      ],
      choices: [
        {
          id: 'c1-1', text: '嗯？我没参加过读书会诶，你认错人了吧',
          nextNodeId: 'ch1-honest',
          effect: { alertness: 5 },
        },
        {
          id: 'c1-2', text: '哈哈可能吧！我偶尔去，你好呀～',
          nextNodeId: 'ch1-friendly',
          effect: { affection: 5, alertness: -5 },
        },
        {
          id: 'c1-3', text: '你好，不过我不太跟陌生人聊天',
          nextNodeId: 'ch1-guarded',
          effect: { alertness: 10 },
        },
        {
          id: 'c1-4', text: '产品总监？好厉害！你在哪家公司？',
          nextNodeId: 'ch1-impressed',
          effect: { affection: 10, alertness: -10 },
        },
      ],
    },

    'ch1-honest': {
      id: 'ch1-honest',
      messages: [
        msg('1h-1', 'npc', '哈哈是嘛，那可能是我记错了'),
        msg('1h-2', 'npc', '不过缘分这东西挺奇妙的，你觉得呢？'),
        msg('1h-3', 'npc', '加个微信吧，说不定以后能一起去读书会'),
      ],
      choices: [
        {
          id: 'c1h-1', text: '行吧，加一下也无妨',
          nextNodeId: 'ch2-wechat-added',
          effect: { affection: 5 },
        },
        {
          id: 'c1h-2', text: '算了，我不太习惯加陌生人',
          nextNodeId: 'ch1-reject-wechat',
          effect: { alertness: 10 },
        },
        {
          id: 'c1h-3', text: '好呀，我也一直想去读书会呢',
          nextNodeId: 'ch2-wechat-added',
          effect: { affection: 10, alertness: -5 },
        },
        {
          id: 'c1h-4', text: '你先说说你叫什么，哪个读书会',
          nextNodeId: 'ch1-verify',
          effect: { alertness: 10 },
        },
      ],
    },

    'ch1-friendly': {
      id: 'ch1-friendly',
      messages: [
        msg('1f-1', 'npc', '你的笑容好治愈啊！'),
        msg('1f-2', 'npc', '方便加个微信吗？我想邀请你参加我们公司下周的分享会'),
      ],
      choices: [
        {
          id: 'c1f-1', text: '好呀，扫一下',
          nextNodeId: 'ch2-wechat-added',
          effect: { affection: 10, alertness: -5 },
        },
        {
          id: 'c1f-2', text: '什么分享会呀？先说说内容呗',
          nextNodeId: 'ch1-verify',
          effect: { alertness: 5 },
        },
        {
          id: 'c1f-3', text: '我考虑一下，下次碰到再说？',
          nextNodeId: 'ch1-reject-wechat',
          effect: { alertness: 5 },
        },
        {
          id: 'c1f-4', text: '加可以，不过别乱发广告哈哈',
          nextNodeId: 'ch2-wechat-added',
          effect: { affection: 5 },
        },
      ],
    },

    'ch1-guarded': {
      id: 'ch1-guarded',
      messages: [
        msg('1g-1', 'npc', '哈哈理解，现在确实要小心'),
        msg('1g-2', 'npc', '这样吧，我把名片给你，你随时可以验证我是谁'),
        msg('1g-3', 'npc', '我人还挺靠谱的，朋友圈可以翻翻看'),
      ],
      choices: [
        {
          id: 'c1g-1', text: '好吧，那先加一下看看',
          nextNodeId: 'ch2-wechat-added',
          effect: { affection: 5 },
        },
        {
          id: 'c1g-2', text: '不用了谢谢，我走了',
          nextNodeId: 'ending-early-leave',
          effect: { alertness: 15 },
        },
        {
          id: 'c1g-3', text: '名片给我看看',
          nextNodeId: 'ch1-verify',
          effect: { alertness: 5 },
        },
        {
          id: 'c1g-4', text: '行，加微信可以，但我不一定回消息哈',
          nextNodeId: 'ch2-wechat-added',
          effect: { alertness: 5 },
        },
      ],
    },

    'ch1-impressed': {
      id: 'ch1-impressed',
      messages: [
        msg('1i-1', 'npc', '一家还不错的公司啦，改天细聊'),
        msg('1i-2', 'npc', '你是做什么工作的呀？感觉你气质很好'),
        msg('1i-3', 'npc', '加个微信吧，我给你推荐点好资源'),
      ],
      choices: [
        {
          id: 'c1i-1', text: '好呀好呀，我做设计的，扫你的码吧',
          nextNodeId: 'ch2-wechat-added',
          effect: { affection: 15, alertness: -10 },
        },
        {
          id: 'c1i-2', text: '什么资源呀？',
          nextNodeId: 'ch2-wechat-added',
          effect: { affection: 5 },
        },
        {
          id: 'c1i-3', text: '那你先说说你在哪家公司？我了解了解',
          nextNodeId: 'ch1-verify',
          effect: { alertness: 5 },
        },
        {
          id: 'c1i-4', text: '不用了，我自己有资源渠道',
          nextNodeId: 'ch1-reject-wechat',
          effect: { alertness: 10 },
        },
      ],
    },

    'ch1-verify': {
      id: 'ch1-verify',
      messages: [
        msg('1v-1', 'npc', '哈哈你还挺谨慎的，我喜欢！'),
        msg('1v-2', 'npc', '我在XX科技，你可以百度一下，产品部的'),
        msg('1v-3', 'npc', '那加个微信？我真的没恶意啦'),
      ],
      choices: [
        {
          id: 'c1v-1', text: '好吧，那加一下',
          nextNodeId: 'ch2-wechat-added',
          effect: { affection: 5 },
        },
        {
          id: 'c1v-2', text: '嗯好，我回去查查再说',
          nextNodeId: 'ch2-wechat-added',
          effect: { alertness: 5 },
        },
        {
          id: 'c1v-3', text: '今天就算了吧，下次见面再说',
          nextNodeId: 'ending-early-leave',
          effect: { alertness: 15 },
        },
        {
          id: 'c1v-4', text: '可以加，但我先声明我有男朋友',
          nextNodeId: 'ch2-wechat-added',
          effect: { alertness: 10, affection: -5 },
        },
      ],
    },

    'ch1-reject-wechat': {
      id: 'ch1-reject-wechat',
      messages: [
        msg('1r-1', 'npc', '没关系没关系，不勉强'),
        msg('1r-2', 'npc', '不过我是真的觉得你很特别，跟别的女生不一样'),
        msg('1r-3', 'npc', '就当交个朋友嘛，我人品绝对没问题'),
      ],
      choices: [
        {
          id: 'c1r-1', text: '好吧好吧，那就加一下',
          nextNodeId: 'ch2-wechat-added',
          effect: { affection: 5, alertness: -5 },
        },
        {
          id: 'c1r-2', text: '你越这么说我越不想加了…',
          nextNodeId: 'ending-early-leave',
          effect: { alertness: 15 },
        },
        {
          id: 'c1r-3', text: '什么叫跟别的女生不一样？这话听着怪怪的',
          nextNodeId: 'ending-early-leave',
          effect: { alertness: 20 },
        },
        {
          id: 'c1r-4', text: '哈哈行吧，你挺会说话的',
          nextNodeId: 'ch2-wechat-added',
          effect: { affection: 10, alertness: -10 },
        },
      ],
    },

    // Early exit ending
    'ending-early-leave': {
      id: 'ending-early-leave',
      messages: [
        msg('ee-1', 'system', '你果断地离开了，没有留下任何联系方式。'),
        msg('ee-2', 'system', '保持警惕是保护自己的第一步。在搭讪阶段就能识别出不舒适的信号，是很强的自我保护能力。'),
      ],
      choices: [],
    },

    // ═══════════════════════════════════════════
    // 第二章：加微信后聊天 (WeChat Chat)
    // ═══════════════════════════════════════════
    'ch2-wechat-added': {
      id: 'ch2-wechat-added',
      messages: [
        msg('2-1', 'npc', '太好了加上了！'),
        msg('2-2', 'npc', '我翻了下你的朋友圈，你养了一只猫对吧？好可爱！'),
        msg('2-3', 'npc', '对了，我前几天去了一个超棒的展览，下次带你去'),
      ],
      tacticId: 'future-faking',
      tacticExplanation: '【画饼承诺】"下次带你去"——用未来的美好许诺来拉近关系，但这些承诺往往不会兑现。PUA者擅长用"以后我们一起..."来制造亲密感，但你可以观察他是否真的会落实。',
      choices: [
        {
          id: 'c2-1', text: '哈哈是呀！她叫团团，超粘人的～什么展览呀好期待',
          nextNodeId: 'ch2-lovebomb',
          effect: { affection: 15, alertness: -10 },
        },
        {
          id: 'c2-2', text: '嗯是我的猫，展览的话看时间吧',
          nextNodeId: 'ch2-lovebomb',
          effect: { affection: 5 },
        },
        {
          id: 'c2-3', text: '你翻我朋友圈了？有点快吧…',
          nextNodeId: 'ch2-lovebomb',
          effect: { alertness: 10, affection: -5 },
        },
        {
          id: 'c2-4', text: '说带就带呗，别光画饼不兑现哦',
          nextNodeId: 'ch2-lovebomb',
          effect: { alertness: 15 },
        },
      ],
    },

    'ch2-lovebomb': {
      id: 'ch2-lovebomb',
      messages: [
        msg('2l-1', 'npc', '我昨天梦到你了哈哈，是不是很奇怪'),
        msg('2l-2', 'npc', '说真的，我遇到过很多女生，但你真的不一样'),
        msg('2l-3', 'npc', '你身上有一种很安静的力量，让我很想靠近'),
      ],
      choices: [
        {
          id: 'c2l-1', text: '哈哈哈你怎么梦到我了！说来听听',
          nextNodeId: 'ch3-date-invite',
          effect: { affection: 10, alertness: -10 },
        },
        {
          id: 'c2l-2', text: '你对每个女生都这么说吗？',
          nextNodeId: 'ch3-date-invite',
          effect: { alertness: 15, affection: -5 },
        },
        {
          id: 'c2l-3', text: '谢谢，但我们才认识没多久，别这么快下结论',
          nextNodeId: 'ch3-date-invite',
          effect: { alertness: 10 },
        },
        {
          id: 'c2l-4', text: '你也很特别，跟我之前遇到的男生不一样',
          nextNodeId: 'ch3-date-invite',
          effect: { affection: 15, alertness: -15 },
        },
      ],
    },

    // ═══════════════════════════════════════════
    // 第三章：约会 (Date)
    // ═══════════════════════════════════════════
    'ch3-date-invite': {
      id: 'ch3-date-invite',
      messages: [
        msg('3-1', 'npc', '周末有空吗？我知道一家很棒的日料店'),
        msg('3-2', 'npc', '我的一个朋友是老板，可以给我们安排包间'),
        msg('3-3', 'npc', '对了，我上次说的那个展览也在附近，可以一起去'),
      ],
      choices: [
        {
          id: 'c3-1', text: '好呀！终于兑现展览的承诺了哈哈',
          nextNodeId: 'ch3-date-hotcold',
          effect: { affection: 10 },
        },
        {
          id: 'c3-2', text: '周末我跟闺蜜有约，改天吧',
          nextNodeId: 'ch3-isolation-start',
          effect: { alertness: 5, socialCircle: 5 },
        },
        {
          id: 'c3-3', text: '日料好贵的，我们去简单的地方就行',
          nextNodeId: 'ch3-date-hotcold',
          effect: { alertness: 5, affection: 5 },
        },
        {
          id: 'c3-4', text: '包间？我们去大厅就好，第一次约会不用那么隆重',
          nextNodeId: 'ch3-date-hotcold',
          effect: { alertness: 10 },
        },
      ],
    },

    'ch3-isolation-start': {
      id: 'ch3-isolation-start',
      messages: [
        msg('3is-1', 'npc', '又跟闺蜜？你是不是跟闺蜜的时间比跟我的多多了'),
        msg('3is-2', 'npc', '我不是说不让你去啊，就是觉得…'),
        msg('3is-3', 'npc', '你闺蜜上次是不是还说我坏话来着？我能感觉到她不太喜欢我'),
      ],
      tacticId: 'isolation',
      tacticExplanation: '【孤立控制】试图在你和朋友之间制造隔阂。PUA者会暗示你的朋友对他有偏见，让你逐渐减少与朋友的来往，从而更加依赖他。健康的关系不会要求你放弃社交圈。',
      choices: [
        {
          id: 'c3is-1', text: '她没有说你坏话啊…好吧那我改天跟你去吃饭',
          nextNodeId: 'ch3-date-hotcold',
          effect: { affection: 10, socialCircle: -15, alertness: -10 },
        },
        {
          id: 'c3is-2', text: '她是我最好的朋友，你不要挑拨我们的关系',
          nextNodeId: 'ch3-date-hotcold',
          effect: { alertness: 15, socialCircle: 5, affection: -10 },
        },
        {
          id: 'c3is-3', text: '你多想了，她人很好的。改天介绍你们认识？',
          nextNodeId: 'ch3-date-hotcold',
          effect: { socialCircle: 5, alertness: 5 },
        },
        {
          id: 'c3is-4', text: '我跟谁出去是我的自由，你管不着吧',
          nextNodeId: 'ch3-date-hotcold',
          effect: { alertness: 20, affection: -15 },
        },
      ],
    },

    'ch3-date-hotcold': {
      id: 'ch3-date-hotcold',
      messages: [
        msg('3hc-1', 'npc', '算了不聊了，我最近工作很忙'),
      ],
      choices: [
        {
          id: 'c3hc-1', text: '怎么了？是不是我说错什么了？',
          nextNodeId: 'ch3-hotcold-reveal',
          effect: { alertness: -10, affection: 5 },
        },
        {
          id: 'c3hc-2', text: '好的，那你忙吧',
          nextNodeId: 'ch3-hotcold-reveal',
          effect: { alertness: 5 },
        },
        {
          id: 'c3hc-3', text: '你怎么说不聊就不聊？聊天态度能不能好一点',
          nextNodeId: 'ch3-hotcold-reveal',
          effect: { alertness: 10, affection: -5 },
        },
        {
          id: 'c3hc-4', text: '好吧…那你忙完了记得找我',
          nextNodeId: 'ch3-hotcold-reveal',
          effect: { alertness: -15, affection: 10 },
        },
      ],
    },

    'ch3-hotcold-reveal': {
      id: 'ch3-hotcold-reveal',
      messages: [
        msg('3hr-1', 'npc', '[两天后]'),
        msg('3hr-2', 'npc', '宝贝！这两天太想你了'),
        msg('3hr-3', 'npc', '刚才路过一家花店，给你定了一束花，明天到你公司楼下'),
        msg('3hr-4', 'npc', '上次那个展览我已经买好票了！这周六我们去？'),
      ],
      tacticId: 'hot-and-cold',
      tacticExplanation: '【忽冷忽热】前两天突然冷淡，现在又热情到送花、买票。这种情绪上的忽冷忽热会让你不断猜测、不安，内心产生"他到底喜不喜欢我"的焦虑，从而更在意他的态度。健康的关系应该是稳定的。',
      choices: [
        {
          id: 'c3hr-1', text: '哇送花！太浪漫了～周六见！',
          nextNodeId: 'ch4-deepen',
          effect: { affection: 15, alertness: -15 },
        },
        {
          id: 'c3hr-2', text: '你前两天不是说忙吗？怎么突然又有空了',
          nextNodeId: 'ch4-deepen',
          effect: { alertness: 15 },
        },
        {
          id: 'c3hr-3', text: '花就不用送了，我同事会乱想的。周六再说吧',
          nextNodeId: 'ch4-deepen',
          effect: { alertness: 10, affection: -5 },
        },
        {
          id: 'c3hr-4', text: '好的好的，不过以后别突然消失好吗，我会担心的',
          nextNodeId: 'ch4-deepen',
          effect: { affection: 10, alertness: -5 },
        },
      ],
    },

    // ═══════════════════════════════════════════
    // 第四章：深入关系 (Deepen)
    // ═══════════════════════════════════════════
    'ch4-deepen': {
      id: 'ch4-deepen',
      messages: [
        msg('4-1', 'npc', '今天吃饭我来请，别跟我客气'),
        msg('4-2', 'npc', '以后有我在，什么都不用你操心'),
        msg('4-3', 'npc', '等我升职了，带你去马尔代夫，我已经在看攻略了'),
      ],
      tacticId: 'future-faking',
      tacticExplanation: '【画饼承诺（再次）】"等我升职了带你去马尔代夫"——又是一个遥远的承诺。注意观察：他之前说的展览兑现了吗？画饼者通常会不断描绘新的美好愿景来维持你的期待。',
      choices: [
        {
          id: 'c4-1', text: '马尔代夫！真的吗？好期待！',
          nextNodeId: 'ch4-triangulation',
          effect: { affection: 15, alertness: -10 },
        },
        {
          id: 'c4-2', text: '你之前说带我去的展览也没去成呢…',
          nextNodeId: 'ch4-triangulation',
          effect: { alertness: 15, affection: -5 },
        },
        {
          id: 'c4-3', text: '不用这么破费，AA就好',
          nextNodeId: 'ch4-triangulation',
          effect: { alertness: 5, affection: -5 },
        },
        {
          id: 'c4-4', text: '你对我太好了，我觉得我配不上',
          nextNodeId: 'ch4-triangulation',
          effect: { affection: 10, alertness: -15 },
        },
      ],
    },

    'ch4-triangulation': {
      id: 'ch4-triangulation',
      messages: [
        msg('4t-1', 'npc', '今天公司的实习生小美又请我喝奶茶了'),
        msg('4t-2', 'npc', '她每次都这样，搞得我都不好意思拒绝'),
        msg('4t-3', 'npc', '不过放心啦，我心里只有你'),
      ],
      tacticId: 'triangulation',
      tacticExplanation: '【三角测量】故意提到其他异性的好感来制造竞争感。"实习生小美请我喝奶茶"——让你产生危机感和嫉妒，从而更努力地讨好他。这是一种常见的PUA手段，健康的伴侣不会故意让你吃醋。',
      choices: [
        {
          id: 'c4t-1', text: '她是不是对你有意思？你能不能离她远一点',
          nextNodeId: 'ch4-gaslight',
          effect: { affection: 5, alertness: -10 },
        },
        {
          id: 'c4t-2', text: '人家请你喝奶茶也没什么吧，你是不是故意说给我听的',
          nextNodeId: 'ch4-gaslight',
          effect: { alertness: 15 },
        },
        {
          id: 'c4t-3', text: '哦这样啊，你们同事关系好也正常',
          nextNodeId: 'ch4-gaslight',
          effect: { alertness: 5, affection: -5 },
        },
        {
          id: 'c4t-4', text: '我相信你～不过要是她再这样你可以直接说你有女朋友了',
          nextNodeId: 'ch4-gaslight',
          effect: { affection: 10, alertness: -5 },
        },
      ],
    },

    'ch4-gaslight': {
      id: 'ch4-gaslight',
      messages: [
        msg('4g-1', 'npc', '你怎么最近老是疑神疑鬼的'),
        msg('4g-2', 'npc', '我就随口说一句你就这样，你是不是太敏感了'),
        msg('4g-3', 'npc', '正常人不会这么想的，你是不是最近压力太大了'),
      ],
      tacticId: 'gaslighting',
      tacticExplanation: '【煤气灯效应】否定你的感受，说你"太敏感"、"疑神疑鬼"。这会让你怀疑自己的判断力，觉得"是不是我想多了"。实际上，你的感受是合理的。当一个人总是让你觉得自己有问题，这本身就是一种操控。',
      choices: [
        {
          id: 'c4g-1', text: '对不起…可能是我想多了，我以后注意',
          nextNodeId: 'ch4-intermittent',
          effect: { alertness: -20, affection: 5 },
        },
        {
          id: 'c4g-2', text: '我有感受不正常吗？你不能因为我有情绪就说我有问题',
          nextNodeId: 'ch4-intermittent',
          effect: { alertness: 20, affection: -10 },
        },
        {
          id: 'c4g-3', text: '你说得对，最近确实累了，不说了',
          nextNodeId: 'ch4-intermittent',
          effect: { alertness: -10 },
        },
        {
          id: 'c4g-4', text: '你先提的别人，现在又怪我多想？你什么意思',
          nextNodeId: 'ch4-intermittent',
          effect: { alertness: 15, affection: -5 },
        },
      ],
    },

    'ch4-intermittent': {
      id: 'ch4-intermittent',
      messages: [
        msg('4i-1', 'npc', '[隔了三天没联系]'),
        msg('4i-2', 'npc', '宝贝你在吗'),
        msg('4i-3', 'npc', '不好意思这几天实在太忙了，但是我每天都在想你'),
        msg('4i-4', 'npc', '今天给你转了个红包，买点好吃的犒劳自己～'),
      ],
      tacticId: 'intermittent-reinforcement',
      tacticExplanation: '【间歇强化】消失三天再突然出现给你温暖。就像赌博机一样，不可预测的奖励比固定奖励更让人上瘾。当他偶尔出现给你一点甜头，你会觉得特别珍贵，从而更加离不开他。',
      choices: [
        {
          id: 'c4i-1', text: '你终于出现了！我这几天好担心你',
          nextNodeId: 'ch5-money',
          effect: { affection: 10, alertness: -15 },
        },
        {
          id: 'c4i-2', text: '三天不联系连个消息都没有，你觉得合适吗',
          nextNodeId: 'ch5-money',
          effect: { alertness: 10, affection: -5 },
        },
        {
          id: 'c4i-3', text: '红包就不用了，但是以后忙也说一声',
          nextNodeId: 'ch5-money',
          effect: { alertness: 10 },
        },
        {
          id: 'c4i-4', text: '哈哈谢谢红包～你忙完了就好',
          nextNodeId: 'ch5-money',
          effect: { affection: 5, alertness: -5 },
        },
      ],
    },

    // ═══════════════════════════════════════════
    // 第五章：金钱与操控 (Money & Control)
    // ═══════════════════════════════════════════
    'ch5-money': {
      id: 'ch5-money',
      messages: [
        msg('5-1', 'npc', '宝贝我跟你说个事'),
        msg('5-2', 'npc', '我有个朋友有个特别好的投资项目，稳赚不赔的那种'),
        msg('5-3', 'npc', '我自己投了5万，你要不要也来点？两个月就能翻倍'),
        msg('5-4', 'npc', '你信我嘛，我不会害你的'),
      ],
      tacticId: 'financial-exploitation',
      tacticExplanation: '【金钱榨取】用"稳赚不赔"的投资项目诱导你出钱。PUA者可能通过各种理由借钱或让你投资：创业、投资、家人生病、急事周转等。一旦涉及到钱，请务必保持警惕，天上不会掉馅饼。',
      choices: [
        {
          id: 'c5-1', text: '稳赚不赔？那我也投点吧，投多少合适？',
          nextNodeId: 'ch5-money-deep',
          effect: { money: -5000, alertness: -15, affection: 10 },
        },
        {
          id: 'c5-2', text: '我对投资不太懂，还是算了吧',
          nextNodeId: 'ch5-guilt',
          effect: { alertness: 10 },
        },
        {
          id: 'c5-3', text: '世上没有稳赚不赔的项目，你自己小心点吧',
          nextNodeId: 'ch5-guilt',
          effect: { alertness: 20, affection: -10 },
        },
        {
          id: 'c5-4', text: '我要先了解清楚才能决定，你把项目资料发给我看看',
          nextNodeId: 'ch5-guilt',
          effect: { alertness: 15 },
        },
      ],
    },

    'ch5-money-deep': {
      id: 'ch5-money-deep',
      messages: [
        msg('5d-1', 'npc', '你太聪明了，早投入早回本'),
        msg('5d-2', 'npc', '对了，这个月我手头有点紧，上次请你吃饭也花了不少'),
        msg('5d-3', 'npc', '你能不能先借我3000块周转一下？下个月发工资就还你'),
      ],
      choices: [
        {
          id: 'c5d-1', text: '好的，转给你',
          nextNodeId: 'ch5-guilt',
          effect: { money: -3000, alertness: -10 },
        },
        {
          id: 'c5d-2', text: '你不是说你是产品总监吗，会缺这点钱？',
          nextNodeId: 'ch5-guilt',
          effect: { alertness: 20, affection: -10 },
        },
        {
          id: 'c5d-3', text: '我最近也不太宽裕，要不你找别人借一下',
          nextNodeId: 'ch5-guilt',
          effect: { alertness: 10 },
        },
        {
          id: 'c5d-4', text: '3000可以借，但是你要打个欠条',
          nextNodeId: 'ch5-guilt',
          effect: { alertness: 15 },
        },
      ],
    },

    'ch5-guilt': {
      id: 'ch5-guilt',
      messages: [
        msg('5g-1', 'npc', '你知道吗，我为了这段感情付出了多少吗'),
        msg('5g-2', 'npc', '那次你生病我大半夜打车来看你，我对谁都没这么好过'),
        msg('5g-3', 'npc', '你现在连这点信任都不给我，我真的很心寒'),
        msg('5g-4', 'npc', '算了，可能是我太傻了，总是一厢情愿'),
      ],
      tacticId: 'guilt-tripping',
      tacticExplanation: '【内疚操控】通过列举自己的付出让你产生内疚感。"我为你做了这么多，你怎么不信任我"——利用你的愧疚心理来操控你的行为。健康的付出不应该成为要挟的筹码。',
      choices: [
        {
          id: 'c5g-1', text: '对不起，我不是不信任你，那我转给你…',
          nextNodeId: 'ch6-isolation',
          effect: { money: -2000, alertness: -15, affection: 10 },
        },
        {
          id: 'c5g-2', text: '你付出是你的选择，不能用来绑架我',
          nextNodeId: 'ch6-isolation',
          effect: { alertness: 20, affection: -15 },
        },
        {
          id: 'c5g-3', text: '我知道你对我好，但钱是钱，感情是感情',
          nextNodeId: 'ch6-isolation',
          effect: { alertness: 10, affection: -5 },
        },
        {
          id: 'c5g-4', text: '你确实对我很好…但你这么说我压力好大',
          nextNodeId: 'ch6-isolation',
          effect: { alertness: 5, affection: 5 },
        },
      ],
    },

    // ═══════════════════════════════════════════
    // 第六章：孤立与控制 (Isolation & Control)
    // ═══════════════════════════════════════════
    'ch6-isolation': {
      id: 'ch6-isolation',
      messages: [
        msg('6-1', 'npc', '你昨天是不是跟你那个男同事一起吃饭了'),
        msg('6-2', 'npc', '我在你闺蜜的朋友圈看到照片了'),
        msg('6-3', 'npc', '你怎么不跟我说？是不是怕我知道'),
        msg('6-4', 'npc', '我觉得你闺蜜是故意发的，她就是想挑拨我们'),
      ],
      tacticId: 'isolation',
      tacticExplanation: '【孤立控制（加强）】监视你的社交动态，质问你的正常社交行为，同时持续攻击你与朋友的关系。目标是让你感到跟朋友来往需要"汇报"，逐渐减少社交，最终只剩下他。',
      choices: [
        {
          id: 'c6-1', text: '只是部门聚餐而已…我以后跟你说',
          nextNodeId: 'ch6-control-deep',
          effect: { socialCircle: -15, alertness: -10, affection: 5 },
        },
        {
          id: 'c6-2', text: '我跟谁吃饭需要向你汇报？你管得也太多了',
          nextNodeId: 'ch6-control-deep',
          effect: { alertness: 20, affection: -15, socialCircle: 5 },
        },
        {
          id: 'c6-3', text: '你别这样说我闺蜜，她没有那个意思',
          nextNodeId: 'ch6-control-deep',
          effect: { socialCircle: 5, alertness: 10 },
        },
        {
          id: 'c6-4', text: '好吧，我以后少跟他们来往，别生气了',
          nextNodeId: 'ch6-control-deep',
          effect: { socialCircle: -20, alertness: -15 },
        },
      ],
    },

    'ch6-control-deep': {
      id: 'ch6-control-deep',
      messages: [
        msg('6c-1', 'npc', '你能不能把那个男同事微信删了'),
        msg('6c-2', 'npc', '还有，以后别动不动就跟你闺蜜说我们的事'),
        msg('6c-3', 'npc', '两个人的事情两个人解决，拉外人进来算什么'),
      ],
      choices: [
        {
          id: 'c6c-1', text: '他就是同事啊…好吧，删了',
          nextNodeId: 'ch7-fake-breakup',
          effect: { socialCircle: -20, alertness: -10 },
        },
        {
          id: 'c6c-2', text: '你要控制我的社交？这已经不正常了',
          nextNodeId: 'ch7-fake-breakup',
          effect: { alertness: 25, affection: -15, socialCircle: 5 },
        },
        {
          id: 'c6c-3', text: '同事不能删的，工作需要。闺蜜的事我注意就是了',
          nextNodeId: 'ch7-fake-breakup',
          effect: { alertness: 10, socialCircle: -5 },
        },
        {
          id: 'c6c-4', text: '我觉得你说的有道理，两个人的事确实不应该让外人知道',
          nextNodeId: 'ch7-fake-breakup',
          effect: { socialCircle: -15, alertness: -15, affection: 10 },
        },
      ],
    },

    // ═══════════════════════════════════════════
    // 第七章：假意抽离 (Fake Breakup)
    // ═══════════════════════════════════════════
    'ch7-fake-breakup': {
      id: 'ch7-fake-breakup',
      messages: [
        msg('7-1', 'npc', '我觉得我们可能不太合适'),
        msg('7-2', 'npc', '你总是不信任我，我真的累了'),
        msg('7-3', 'npc', '要不，我们还是退回做朋友吧'),
        msg('7-4', 'npc', '也许是我不够好，配不上你'),
      ],
      tacticId: 'fake-breakup',
      tacticExplanation: '【假意抽离】用"分手"试探你的底线。看你会不会挽留，如果你挽留了，说明你对这段关系的依赖很深，他就可以进一步操控。真正想分手的人不会说"也许是我不够好"来引导你否认。',
      choices: [
        {
          id: 'c7-1', text: '不要！是我的错，我以后改，求你别走',
          nextNodeId: 'ch7-resolution-bad',
          effect: { alertness: -25, affection: 15 },
        },
        {
          id: 'c7-2', text: '你说得对，也许我们确实不合适',
          nextNodeId: 'ch7-resolution-good',
          effect: { alertness: 20, affection: -20 },
        },
        {
          id: 'c7-3', text: '如果分手能让你开心的话…好吧',
          nextNodeId: 'ch7-resolution-mid',
          effect: { alertness: 5, affection: -10 },
        },
        {
          id: 'c7-4', text: '你这不是第一次这样了，每次吵架你就说分手，你到底想怎样',
          nextNodeId: 'ch7-resolution-aware',
          effect: { alertness: 20 },
        },
      ],
    },

    'ch7-resolution-bad': {
      id: 'ch7-resolution-bad',
      messages: [
        msg('7rb-1', 'npc', '唉，你说改就能改吗'),
        msg('7rb-2', 'npc', '你要是真的在乎我，先把上次的事情解决了'),
        msg('7rb-3', 'npc', '那个投资项目还差2000就够了，你要是愿意投说明你是认真的'),
      ],
      choices: [
        {
          id: 'c7rb-1', text: '好的，我转给你，你别离开我',
          nextNodeId: 'ch8-final',
          effect: { money: -2000, alertness: -20, affection: 10 },
        },
        {
          id: 'c7rb-2', text: '等等…你是在拿分手逼我出钱？',
          nextNodeId: 'ch8-final',
          effect: { alertness: 30, affection: -15 },
        },
        {
          id: 'c7rb-3', text: '用钱来证明感情？这什么道理',
          nextNodeId: 'ch8-final',
          effect: { alertness: 25, affection: -10 },
        },
        {
          id: 'c7rb-4', text: '我没有多余的钱了…但我可以借',
          nextNodeId: 'ch8-final',
          effect: { money: -2000, alertness: -15 },
        },
      ],
    },

    'ch7-resolution-good': {
      id: 'ch7-resolution-good',
      messages: [
        msg('7rg-1', 'npc', '你说真的？你真的舍得？'),
        msg('7rg-2', 'npc', '我就知道你不是真的在乎我'),
        msg('7rg-3', 'npc', '所有的付出都喂了狗了'),
      ],
      choices: [
        {
          id: 'c7rg-1', text: '你看，又来了，用情绪来操控我。我不吃这套了。',
          nextNodeId: 'ch8-final',
          effect: { alertness: 25, affection: -10 },
        },
        {
          id: 'c7rg-2', text: '我很在乎，但这段关系让我不开心',
          nextNodeId: 'ch8-final',
          effect: { alertness: 15 },
        },
        {
          id: 'c7rg-3', text: '对不起…那我们再试试？',
          nextNodeId: 'ch8-final',
          effect: { alertness: -15, affection: 10 },
        },
        {
          id: 'c7rg-4', text: '你的付出不应该成为要挟我的工具，再见',
          nextNodeId: 'ch8-final',
          effect: { alertness: 30, affection: -20 },
        },
      ],
    },

    'ch7-resolution-mid': {
      id: 'ch7-resolution-mid',
      messages: [
        msg('7rm-1', 'npc', '你怎么这么冷淡？'),
        msg('7rm-2', 'npc', '你是不是早就想分了？是不是有别人了？'),
      ],
      choices: [
        {
          id: 'c7rm-1', text: '没有别人，只是你先说的退回朋友啊',
          nextNodeId: 'ch8-final',
          effect: { alertness: 10 },
        },
        {
          id: 'c7rm-2', text: '你说分手的，怎么现在又怪我冷淡了',
          nextNodeId: 'ch8-final',
          effect: { alertness: 15, affection: -5 },
        },
        {
          id: 'c7rm-3', text: '好了别吵了，我不想分手，行了吧',
          nextNodeId: 'ch8-final',
          effect: { alertness: -10, affection: 10 },
        },
        {
          id: 'c7rm-4', text: '我需要冷静想想，给我点空间',
          nextNodeId: 'ch8-final',
          effect: { alertness: 10 },
        },
      ],
    },

    'ch7-resolution-aware': {
      id: 'ch7-resolution-aware',
      messages: [
        msg('7ra-1', 'npc', '你这是什么态度？我这么为你好你不领情'),
        msg('7ra-2', 'npc', '你去问问别的男生有谁像我这样对你的'),
      ],
      choices: [
        {
          id: 'c7ra-1', text: '好男生不需要通过威胁分手来证明自己',
          nextNodeId: 'ch8-final',
          effect: { alertness: 25, affection: -10 },
        },
        {
          id: 'c7ra-2', text: '别的男生？那正好我认识几个不错的呢',
          nextNodeId: 'ch8-final',
          effect: { alertness: 15, affection: -15 },
        },
        {
          id: 'c7ra-3', text: '算了算了我不想吵了',
          nextNodeId: 'ch8-final',
          effect: { alertness: -5 },
        },
        {
          id: 'c7ra-4', text: '我已经看清你了，再见吧',
          nextNodeId: 'ch8-final',
          effect: { alertness: 30, affection: -20 },
        },
      ],
    },

    // ═══════════════════════════════════════════
    // 第八章：最终抉择 (Final)
    // ═══════════════════════════════════════════
    'ch8-final': {
      id: 'ch8-final',
      messages: [
        msg('8-1', 'npc', '我今天不太舒服，能不能来陪陪我'),
        msg('8-2', 'npc', '如果你不来的话…算了，我习惯了一个人撑着'),
        msg('8-3', 'npc', '不用了，你去陪你的闺蜜/同事吧，反正我也排不上号'),
      ],
      tacticId: 'guilt-tripping',
      tacticExplanation: '【内疚操控（终章）】用生病和自我牺牲来引发你的内疚。"算了我习惯了一个人撑着"是经典的被动攻击型操控。这里是游戏的最终抉择——你的答案决定了结局。',
      choices: [
        {
          id: 'c8-1', text: '我马上来！你等着我，别一个人扛着',
          nextNodeId: 'ending-controlled',
          effect: { alertness: -20, affection: 15, socialCircle: -10 },
        },
        {
          id: 'c8-2', text: '你先去看医生吧，我明天再来看你',
          nextNodeId: 'ending-trapped',
          effect: { alertness: 5, affection: 5 },
        },
        {
          id: 'c8-3', text: '你别用这种方式让我内疚，你不舒服应该去医院',
          nextNodeId: 'ending-hesitant',
          effect: { alertness: 15, affection: -10 },
        },
        {
          id: 'c8-4', text: '我们之间的问题不是一次探望能解决的。我需要认真想想这段关系。',
          nextNodeId: 'ending-awakened',
          effect: { alertness: 25, affection: -15 },
        },
      ],
    },

    // ═══════════════════════════════════════════
    // 结局 (Endings)
    // ═══════════════════════════════════════════
    'ending-awakened': {
      id: 'ending-awakened',
      messages: [
        msg('ea-1', 'npc', '你什么意思？你要分手？'),
        msg('ea-2', 'npc', '你会后悔的，没人会像我这样对你好'),
        msg('ea-3', 'system', '你深吸一口气，发出了最后一条消息——'),
        msg('ea-4', 'user', '我不会后悔的。我终于看清了这段关系的真相。一个真正爱我的人，不会让我失去朋友、失去金钱、失去自我。再见。'),
        msg('ea-5', 'system', '—— 觉醒离开 ——'),
      ],
      choices: [],
    },

    'ending-hesitant': {
      id: 'ending-hesitant',
      messages: [
        msg('eh-1', 'npc', '你真的不来？'),
        msg('eh-2', 'npc', '好吧…'),
        msg('eh-3', 'system', '你放下手机，心情复杂。你知道这段关系有问题，但还是放不下。'),
        msg('eh-4', 'system', '你决定给自己一些时间去思考，这已经是很勇敢的一步了。'),
        msg('eh-5', 'system', '—— 认清但心软 ——'),
      ],
      choices: [],
    },

    'ending-trapped': {
      id: 'ending-trapped',
      messages: [
        msg('et-1', 'npc', '那你明天一定要来啊，我等你'),
        msg('et-2', 'system', '你答应了明天去看他。虽然心里隐隐觉得不对劲，但你告诉自己"他也没那么差"。'),
        msg('et-3', 'system', '你的社交圈在缩小，存款在减少，但你还没完全意识到发生了什么。'),
        msg('et-4', 'system', '—— 深陷其中 ——'),
      ],
      choices: [],
    },

    'ending-controlled': {
      id: 'ending-controlled',
      messages: [
        msg('ec-1', 'npc', '嗯，你来的时候顺便帮我买点药'),
        msg('ec-2', 'npc', '对了，再带点吃的，我今天没力气做饭'),
        msg('ec-3', 'system', '你急急忙忙出了门，甚至推掉了跟朋友的约会。'),
        msg('ec-4', 'system', '你已经习惯了被他的情绪所左右，不知不觉中失去了自己。'),
        msg('ec-5', 'system', '—— 完全被控制 ——'),
      ],
      choices: [],
    },
  },
};

export default fullStory;
