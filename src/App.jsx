import { useState } from 'react'
import { StampStack } from 'stampstack'
import 'stampstack/styles.css'

// 用 Vite 的 import.meta.glob 一次性把 img 目录下的图片作为静态资源 URL 导入
const modules = import.meta.glob('./img/*.webp', { eager: true, query: '?url', import: 'default' })

// 邮票标题（与参考设计一致的命名感）
const names = ['Tideway', 'Lumen', 'Verdant', 'Cinder', 'Halcyon', 'Zephyr']

// 整理成 stampstack 需要的数据：每项至少有一个 id，其余字段自定义
const items = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], i) => ({
    id: path.split('/').pop().replace('.webp', ''),
    src,
    title: names[i % names.length],
  }))

const frameColors = ['#84a3ff', '#ff78a3', '#54f79d', '#ffa480', '#a47cfb']

export default function App() {
  const [focused, setFocused] = useState(0)

  return (
    <div className="page">
      <header className="masthead">
        <div className="masthead__logo" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M8 13 L20 7 L32 13 L20 19 Z" fill="#2f6bff" />
            <path d="M8 13 L20 19 L20 33 L8 27 Z" fill="#1f4fd6" />
            <path d="M32 13 L20 19 L20 33 L32 27 Z" fill="#5a8bff" />
          </svg>
        </div>

        <div className="masthead__titlerow">
          <h1 className="masthead__title">
            stampstack <span className="masthead__version">v0.2.0</span>
          </h1>
          <a
            className="masthead__gh"
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
            </svg>
          </a>
        </div>

        <p className="masthead__desc">
          stampstack is a postage-styled 3D carousel component. install and drop
          in whatever content you want on the stamps. no deps beyond react 18
        </p>
        <p className="masthead__desc masthead__desc--muted">
          stampstack 是一个邮票风格的 3D 轮播组件。安装后即可在邮票上放入任意内容，除 React 18 外无其他依赖。
        </p>
      </header>

      <main className="stage">
        <StampStack
          items={items}
          cardWidth={260}
          initialIndex={Math.floor(items.length / 2)}
          frameColor={(item, state) => frameColors[state.index % frameColors.length]}
          onFocusChange={setFocused}
          onSelect={(item, index) => alert(`打开第 ${index + 1} 张：${item.title}`)}
          renderStamp={(item, state) => (
            <div className="stamp" style={{ opacity: state.focused ? 1 : 0.9 }}>
              <img className="stamp__img" src={item.src} alt={item.title} draggable={false} />
              <span className="stamp__label">{item.title}</span>
            </div>
          )}
        />
      </main>

      <footer className="page__foot">
        当前焦点：{items[focused]?.title} · 第 {focused + 1} / {items.length} 张
      </footer>
    </div>
  )
}
