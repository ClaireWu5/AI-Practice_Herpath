export type OptionKey = 'A' | 'B' | 'C'

export interface NodeOption {
  key: OptionKey
  title: string
  subtitle: string
}

export interface LifeNode {
  age: number
  title: string
  scenario: string
  options: NodeOption[]
}

export const NODES: LifeNode[] = [
  {
    age: 17,
    title: '志愿的岔路口',
    scenario:
      '高考成绩刚出来，你坐在饭桌前，爸妈递过来一张填好的志愿表——师范或医学，稳定，体面，离家近。你握着笔，窗外的风吹动了窗帘。',
    options: [
      { key: 'A', title: '填了他们选的专业', subtitle: '稳定，是一种爱' },
      { key: 'B', title: '坚持填了自己的选择', subtitle: '那一刻，笔很重' },
      { key: 'C', title: '随便填了一个，走一步看一步', subtitle: '反正路还长着呢' },
    ],
  },
  {
    age: 22,
    title: '毕业季的风',
    scenario:
      '毕业典礼结束了，同学们抱着哭，有人要回老家，有人要去北上广，有人要出国。你站在操场上，感受着最后一次校园的风，想到那个关于未来的问题还没有答案。',
    options: [
      { key: 'A', title: '回老家，备考公务员', subtitle: '安稳，是另一种勇气' },
      { key: 'B', title: '去大城市，从头开始', subtitle: '一个人，一个行李箱' },
      { key: 'C', title: '出国读研，再看看世界', subtitle: '还不想停下来' },
    ],
  },
  {
    age: 25,
    title: '催婚的那顿饭',
    scenario:
      '春节饭桌上，七大姑八大姨的眼神都落在你身上。「都25了，有对象了吗？」你夹起一块鱼，慢慢放进嘴里，想好了要怎么回答。',
    options: [
      { key: 'A', title: '顺势相亲，认真试试', subtitle: '也许缘分就在这里' },
      { key: 'B', title: '礼貌拒绝，专注自己', subtitle: '我的时钟，我来定' },
      { key: 'C', title: '谈着恋爱，但不着急结果', subtitle: '感情的事，急不来' },
    ],
  },
  {
    age: 28,
    title: '事业的十字路',
    scenario:
      '你的上司找你谈话，有一个升职机会——更高的薪水，但要牺牲大部分私人时间。同一周，你心里另一个声音也越来越响：那件一直想做但没做的事。',
    options: [
      { key: 'A', title: '接受升职，全力以赴', subtitle: '拼过这几年，以后再说' },
      { key: 'B', title: '辞职，去做那件想做的事', subtitle: '现在不做，以后更难' },
      { key: 'C', title: '留下来，但划定了自己的边界', subtitle: '工作是工作，我还是我' },
    ],
  },
  {
    age: 32,
    title: '此刻的你',
    scenario:
      '你坐在某个地方——可能是家里，可能是咖啡馆，可能是一趟还没到站的列车上。回头看那些年，那些选择，那些没走的路。你想对此刻的自己说什么？',
    options: [
      { key: 'A', title: '我已经找到了答案', subtitle: '不管哪条路，都是我的路' },
      { key: 'B', title: '我还在寻找中', subtitle: '没关系，寻找本身就是意义' },
      { key: 'C', title: '答案本身不重要', subtitle: '活着，就是在写答案' },
    ],
  },
]
