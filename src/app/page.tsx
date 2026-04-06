'use client';

import Link from 'next/link';
import {
  Drama,
  MessageCircle,
  Search,
  Brain,
  Clapperboard,
  Target,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const features = [
  { icon: Drama, title: '多重剧情', desc: '33个故事节点，多条分支路线' },
  { icon: MessageCircle, title: '随机邂逅', desc: '沉浸式微信聊天体验' },
  { icon: Search, title: '话术识别', desc: '识别9种常见PUA操控手法' },
  { icon: Brain, title: '熟能生巧', desc: '反复练习提升识别能力' },
  { icon: Clapperboard, title: '多种结局', desc: '4种结局取决于你的选择' },
  { icon: Target, title: '随心走向', desc: '每个选择都影响故事发展' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center px-4 py-24">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        {/* Hero */}
        <div className="text-center space-y-3 animate-fadeIn">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            PUA话术识别
          </h1>
          <p className="text-lg text-muted-foreground">聊天模拟器</p>
        </div>

        <Separator className="my-10" />

        {/* Disclaimer */}
        <Card className="w-full mb-10 bg-muted/50 animate-fadeIn">
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            本游戏剧情纯属娱乐，请勿代入剧情，所有名称和剧情都是虚构。你将扮演纯情男大/女大，通过选择回复消息来体验剧情。
            <span className="block mt-2 text-xs opacity-60">--BY ARKSEC.NET</span>
          </CardContent>
        </Card>

        {/* Bento feature grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mb-10 animate-slideUp">
          {features.map((f) => (
            <Card
              key={f.title}
              size="sm"
              className="hover:ring-foreground/20 transition-all duration-200"
            >
              <CardContent className="flex flex-col items-center text-center gap-2">
                <div className="rounded-full bg-muted w-10 h-10 flex items-center justify-center">
                  <f.icon className="size-5 text-muted-foreground" />
                </div>
                <div className="text-sm font-medium text-foreground">{f.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  {f.desc}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto animate-slideUp">
          <Link href="/play" className={buttonVariants({ size: 'lg' })}>
            开始游戏
          </Link>
          <Link href="/analysis" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
            查看PUA手法解析
          </Link>
          <Link href="/generator" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
            LLM一键生成剧情
          </Link>
        </div>
      </div>
    </main>
  );
}
