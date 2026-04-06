import { Story } from '@/types/chat';

const demoStory: Story = {
  id: 'coffee-shop',
  title: '咖啡店邂逅',
  description: '一个阳光明媚的下午，你在咖啡店里遇到了一个女生...',
  startNodeId: 'opening',
  nodes: {
    opening: {
      id: 'opening',
      messages: [
        {
          id: 'msg-1',
          sender: 'npc',
          content: '你好，这个座位有人吗？',
          timestamp: Date.now(),
          type: 'text',
        },
        {
          id: 'msg-2',
          sender: 'npc',
          content: '其他地方都坐满了...😅',
          timestamp: Date.now() + 1000,
          type: 'text',
        },
      ],
      choices: [
        {
          id: 'c1-1',
          text: '没有哦，请坐吧！刚好我一个人也挺无聊的 😊',
          nextNodeId: 'good-start',
          effect: { mood: 10, score: 10 },
        },
        {
          id: 'c1-2',
          text: '坐吧。',
          nextNodeId: 'neutral-start',
          effect: { mood: 0, score: 5 },
        },
        {
          id: 'c1-3',
          text: '美女，缘分啊！我等你很久了～',
          nextNodeId: 'bad-start',
          effect: { mood: -15, score: -10 },
        },
      ],
    },
    'good-start': {
      id: 'good-start',
      messages: [
        {
          id: 'msg-3',
          sender: 'npc',
          content: '谢谢！你也是一个人来的吗？',
          timestamp: Date.now() + 3000,
          type: 'text',
        },
        {
          id: 'msg-4',
          sender: 'npc',
          content: '这家店的拿铁超好喝的，你试过吗？',
          timestamp: Date.now() + 4000,
          type: 'text',
        },
      ],
      choices: [
        {
          id: 'c2-1',
          text: '是啊，我经常来这里看书。他们家的拿铁确实不错，你喜欢咖啡？',
          nextNodeId: 'deep-convo',
          effect: { mood: 10, score: 15 },
        },
        {
          id: 'c2-2',
          text: '对啊。没试过，我一般喝美式。',
          nextNodeId: 'casual-convo',
          effect: { mood: 0, score: 5 },
        },
        {
          id: 'c2-3',
          text: '你不觉得我们特别有缘吗？要不加个微信？',
          nextNodeId: 'too-fast',
          effect: { mood: -20, score: -15 },
        },
      ],
    },
    'neutral-start': {
      id: 'neutral-start',
      messages: [
        {
          id: 'msg-5',
          sender: 'npc',
          content: '嗯...谢谢。',
          timestamp: Date.now() + 3000,
          type: 'text',
        },
      ],
      choices: [
        {
          id: 'c3-1',
          text: '你点了什么？这家的甜品也很不错',
          nextNodeId: 'casual-convo',
          effect: { mood: 5, score: 5 },
        },
        {
          id: 'c3-2',
          text: '（继续看手机，不说话）',
          nextNodeId: 'ending-cold',
          effect: { mood: -5, score: 0 },
        },
      ],
    },
    'bad-start': {
      id: 'bad-start',
      messages: [
        {
          id: 'msg-6',
          sender: 'npc',
          content: '...😅',
          timestamp: Date.now() + 3000,
          type: 'text',
        },
        {
          id: 'msg-7',
          sender: 'npc',
          content: '算了，我还是去别的地方坐吧。',
          timestamp: Date.now() + 4000,
          type: 'text',
        },
      ],
      choices: [],
      nextNodeId: 'ending-bad',
    },
    'deep-convo': {
      id: 'deep-convo',
      messages: [
        {
          id: 'msg-8',
          sender: 'npc',
          content: '超喜欢的！我每周都来这里，一边喝咖啡一边画画 ☕🎨',
          timestamp: Date.now() + 6000,
          type: 'text',
        },
        {
          id: 'msg-9',
          sender: 'npc',
          content: '你平时看什么类型的书呀？',
          timestamp: Date.now() + 7000,
          type: 'text',
        },
      ],
      choices: [
        {
          id: 'c4-1',
          text: '最近在看《小王子》，虽然看了很多遍了 📖 对了，你画画好厉害，能看看吗？',
          nextNodeId: 'ending-good',
          effect: { mood: 15, score: 20 },
        },
        {
          id: 'c4-2',
          text: '什么都看。你画的好不好？发个朋友圈让我看看呗',
          nextNodeId: 'ending-neutral',
          effect: { mood: -5, score: 0 },
        },
      ],
    },
    'casual-convo': {
      id: 'casual-convo',
      messages: [
        {
          id: 'msg-10',
          sender: 'npc',
          content: '他们家的提拉米苏不错哦',
          timestamp: Date.now() + 6000,
          type: 'text',
        },
      ],
      choices: [
        {
          id: 'c5-1',
          text: '真的吗？那我也点一个试试，谢谢推荐！',
          nextNodeId: 'ending-neutral',
          effect: { mood: 5, score: 5 },
        },
      ],
    },
    'too-fast': {
      id: 'too-fast',
      messages: [
        {
          id: 'msg-11',
          sender: 'npc',
          content: '呃...我们才刚见面吧...',
          timestamp: Date.now() + 6000,
          type: 'text',
        },
        {
          id: 'msg-12',
          sender: 'npc',
          content: '我先走了，拜拜。',
          timestamp: Date.now() + 7000,
          type: 'text',
        },
      ],
      choices: [],
      nextNodeId: 'ending-bad',
    },
    'ending-good': {
      id: 'ending-good',
      messages: [
        {
          id: 'msg-13',
          sender: 'npc',
          content: '哈哈《小王子》我也超喜欢！"真正重要的东西，用眼睛是看不到的" ✨',
          timestamp: Date.now() + 9000,
          type: 'text',
        },
        {
          id: 'msg-14',
          sender: 'npc',
          content: '给你看看我最近画的～ 对了，我叫小雨，你呢？',
          timestamp: Date.now() + 10000,
          type: 'text',
        },
        {
          id: 'msg-15',
          sender: 'npc',
          content: '要不...加个微信？以后可以一起来这里 ☕',
          timestamp: Date.now() + 12000,
          type: 'text',
        },
      ],
      choices: [],
    },
    'ending-neutral': {
      id: 'ending-neutral',
      messages: [
        {
          id: 'msg-16',
          sender: 'npc',
          content: '嗯嗯，挺好的',
          timestamp: Date.now() + 9000,
          type: 'text',
        },
        {
          id: 'msg-17',
          sender: 'npc',
          content: '我先忙啦，拜拜～',
          timestamp: Date.now() + 10000,
          type: 'text',
        },
      ],
      choices: [],
    },
    'ending-cold': {
      id: 'ending-cold',
      messages: [
        {
          id: 'msg-18',
          sender: 'npc',
          content: '（沉默了一会儿，戴上耳机开始看手机）',
          timestamp: Date.now() + 6000,
          type: 'text',
        },
      ],
      choices: [],
    },
    'ending-bad': {
      id: 'ending-bad',
      messages: [
        {
          id: 'msg-19',
          sender: 'npc',
          content: '（已离开对话）',
          timestamp: Date.now() + 9000,
          type: 'text',
        },
      ],
      choices: [],
    },
  },
};

export default demoStory;
