'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Story } from '@/types/chat';

const LLM_PROMPT = `你是一个互动小说作者。请按照以下TypeScript接口定义，生成一个完整的PUA话术识别互动故事JSON。

## 类型定义

\`\`\`typescript
type PuaTacticId =
  | 'future-faking'        // 画饼承诺
  | 'hot-and-cold'         // 忽冷忽热
  | 'intermittent-reinforcement' // 间歇强化
  | 'triangulation'        // 三角测量
  | 'gaslighting'          // 煤气灯效应
  | 'guilt-tripping'       // 内疚操控
  | 'isolation'            // 孤立控制
  | 'financial-exploitation' // 金钱榨取
  | 'fake-breakup';        // 假意抽离

interface Message {
  id: string;           // 唯一ID，如 "1-1"
  sender: 'npc' | 'user' | 'system';
  content: string;      // 中文对话内容
  timestamp: number;    // 设为0
  type: 'text' | 'tactic-alert';  // 一般用 'text'
}

interface StatEffect {
  affection?: number;    // 好感度变化 (-20 到 +20)
  alertness?: number;    // 警觉度变化
  money?: number;        // 金钱变化
  socialCircle?: number; // 社交圈变化
}

interface Choice {
  id: string;           // 唯一ID，如 "c1-1"
  text: string;         // 选项文本（玩家说的话）
  nextNodeId: string;   // 指向下一个节点ID
  effect?: StatEffect;  // 选择该项的数值影响
}

interface DialogNode {
  id: string;
  messages: Message[];       // NPC发的消息（1-3条）
  choices: Choice[];         // 玩家选项（2-4个），结局节点为空数组
  nextNodeId?: string;       // 无选项时自动跳转的下一节点
  tacticId?: PuaTacticId;    // 该节点展示的PUA手法
  tacticExplanation?: string; // PUA手法的中文解释
}

interface Story {
  id: string;
  title: string;
  description: string;
  npcName: string;
  nodes: Record<string, DialogNode>;  // 所有节点
  startNodeId: string;                // 起始节点ID
}
\`\`\`

## 要求

1. 生成20-30个对话节点，涵盖至少6种PUA手法
2. 故事应该有起承转合：初识 → 暧昧 → 操控加深 → 最终选择
3. 对话要自然、口语化，符合中文微信聊天习惯
4. 每个选择需要有不同的stat effect：
   - 顺从PUA: affection+, alertness-, money-可能, socialCircle-可能
   - 保持警觉: alertness+, affection-可能
   - 中性选择: 小幅变化
5. 结局节点的choices为空数组[]且无nextNodeId
6. NPC名字自拟，但要有新意
7. 包含tacticId和tacticExplanation的节点会显示PUA手法提醒

## 示例节点

\`\`\`json
{
  "ch1-start": {
    "id": "ch1-start",
    "messages": [
      { "id": "1-1", "sender": "npc", "content": "在吗？刚看到一个东西想到你了", "timestamp": 0, "type": "text" },
      { "id": "1-2", "sender": "npc", "content": "你知道吗，我觉得我们特别有缘分", "timestamp": 0, "type": "text" }
    ],
    "choices": [
      { "id": "c1-1", "text": "哈哈是吗？什么东西呀", "nextNodeId": "ch1-response-warm", "effect": { "affection": 5 } },
      { "id": "c1-2", "text": "嗯...怎么突然这么说", "nextNodeId": "ch1-response-cautious", "effect": { "alertness": 5 } }
    ]
  }
}
\`\`\`

请直接输出完整的JSON对象（Story类型），不要包含\`\`\`json标记，确保JSON格式有效。`;

function validateStory(data: unknown): data is Story {
  if (!data || typeof data !== 'object') return false;
  const s = data as Record<string, unknown>;
  if (typeof s.id !== 'string') return false;
  if (typeof s.title !== 'string') return false;
  if (typeof s.npcName !== 'string') return false;
  if (typeof s.startNodeId !== 'string') return false;
  if (!s.nodes || typeof s.nodes !== 'object') return false;
  const nodes = s.nodes as Record<string, unknown>;
  if (Object.keys(nodes).length === 0) return false;
  if (!(s.startNodeId in nodes)) return false;
  return true;
}

export default function GeneratorPage() {
  const [copied, setCopied] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(LLM_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('复制失败，请手动选择文本复制');
    }
  };

  const handleImport = () => {
    setError('');
    try {
      const parsed = JSON.parse(jsonInput);
      if (!validateStory(parsed)) {
        setError('JSON格式不正确：缺少必要字段（id, title, npcName, startNodeId, nodes）或startNodeId指向的节点不存在');
        return;
      }
      sessionStorage.setItem('custom-story', jsonInput);
      router.push('/play');
    } catch {
      setError('JSON解析失败，请检查格式是否正确');
    }
  };

  return (
    <main
      className="min-h-screen bg-white px-4 py-12"
      style={{ fontFamily: 'Inter, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif' }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-gray-400 hover:text-gray-600 text-sm mb-8 transition-colors"
        >
          ← 返回主页
        </Link>

        {/* Header */}
        <div className="text-center mb-10 animate-fadeIn">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">LLM 剧情生成器</h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto">
            使用任意LLM（如ChatGPT、Claude）生成自定义剧情，然后导入游戏体验
          </p>
        </div>

        {/* Step 1: Copy prompt */}
        <div className="space-y-4 mb-10 animate-slideUp">
          <div className="flex items-center gap-3">
            <span className="shrink-0 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-sm">1</span>
            <h2 className="text-gray-900 font-bold text-lg">复制Prompt到LLM</h2>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 max-h-64 overflow-y-auto scrollbar-hide">
            <pre className="text-gray-600 text-xs leading-relaxed whitespace-pre-wrap break-words">
              {LLM_PROMPT}
            </pre>
          </div>

          <button
            onClick={handleCopy}
            className={`w-full py-3 rounded-full font-medium transition-all ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-gray-900 hover:bg-gray-800 text-white'
            }`}
          >
            {copied ? '✓ 已复制到剪贴板' : '一键复制Prompt'}
          </button>
        </div>

        {/* Step 2: Import JSON */}
        <div className="space-y-4 animate-slideUp">
          <div className="flex items-center gap-3">
            <span className="shrink-0 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-sm">2</span>
            <h2 className="text-gray-900 font-bold text-lg">粘贴生成的JSON</h2>
          </div>

          <p className="text-gray-500 text-sm">
            将LLM生成的JSON粘贴到下方，点击导入即可开始游戏
          </p>

          <textarea
            value={jsonInput}
            onChange={(e) => { setJsonInput(e.target.value); setError(''); }}
            placeholder='将LLM生成的完整JSON粘贴到这里...'
            className="w-full h-48 bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-700 text-sm font-mono placeholder-gray-400 resize-none focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors"
          />

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleImport}
            disabled={!jsonInput.trim()}
            className="w-full py-3 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium rounded-full transition-all"
          >
            导入并开始游戏
          </button>
        </div>
      </div>
    </main>
  );
}
