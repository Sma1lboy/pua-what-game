import { Story } from '@/types/chat';

const demoStory: Story = {
  id: 'coffee-shop',
  title: '咖啡店邂逅',
  description: '一个阳光明媚的下午，你在咖啡店里遇到了一个女生...',
  npcName: '小雨',
  startNodeId: 'opening',
  nodes: {
    opening: {
      id: 'opening',
      messages: [
        {
          id: 'msg-1',
          sender: 'npc',
          content: '你好，这个座位有人吗？',
          timestamp: 0,
          type: 'text',
        },
        {
          id: 'msg-2',
          sender: 'npc',
          content: '其他地方都坐满了...😅',
          timestamp: 0,
          type: 'text',
        },
      ],
      choices: [
        {
          id: 'c1-1',
          text: '没有哦，请坐吧！',
          nextNodeId: 'ending',
          effect: { affection: 10 },
        },
      ],
    },
    ending: {
      id: 'ending',
      messages: [
        {
          id: 'msg-3',
          sender: 'npc',
          content: '谢谢！你人真好～',
          timestamp: 0,
          type: 'text',
        },
      ],
      choices: [],
    },
  },
};

export default demoStory;
