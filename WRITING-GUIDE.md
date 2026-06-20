# LS 博客写作指南

## 文章存放位置

所有文章放在 `articles/` 目录下，文件名格式：

```
YYYY-MM-DD-文章标识.md
```

示例：`2024-01-15-hello-world.md`

## 文章格式

每篇文章包含两部分：**头部信息（Frontmatter）** 和 **正文内容**。

### 完整模板

```markdown
---
title: 中文标题
titleEn: English Title
date: 2024-01-15
tags: [中文标签1, 中文标签2]
tagsEn: [English Tag1, English Tag2]
summary: 中文摘要，简短描述文章内容
summaryEn: English summary describing the article
---

# 中文标题

中文正文内容...

---EN---

# English Title

English content...
```

### 头部字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 中文标题 |
| `titleEn` | 是 | 英文标题 |
| `date` | 是 | 发布日期，格式 `YYYY-MM-DD` |
| `tags` | 否 | 中文标签数组 |
| `tagsEn` | 否 | 英文标签数组 |
| `summary` | 否 | 中文摘要 |
| `summaryEn` | 否 | 英文摘要 |

### 双语内容分隔

中文内容写在前面，英文内容写在 `---EN---` 之后：

```markdown
中文内容在这里...

---EN---

English content here...
```

如果只写中文，不添加 `---EN---` 分隔符，英文版本会显示与中文相同的内容。

## Markdown 语法支持

### 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
```

### 文本样式

```markdown
**粗体**
*斜体*
~~删除线~~
```

### 列表

```markdown
- 无序列表项
- 另一个项

1. 有序列表项
2. 另一个项
```

### 代码

行内代码：

```markdown
这是 `code` 行内代码
```

代码块：

````markdown
```javascript
function hello() {
  return 'Hello World';
}
```
````

支持的语言：`javascript`, `typescript`, `jsx`, `tsx`, `css`, `html`, `python`, `bash`, `json` 等。

### 引用

```markdown
> 这是一段引用文字
```

### 链接

```markdown
[链接文字](https://example.com)
```

### 图片

```markdown
![图片描述](图片地址)
```

### 表格

```markdown
| 表头1 | 表头2 |
|-------|-------|
| 内容1 | 内容2 |
| 内容3 | 内容4 |
```

### 分隔线

```markdown
---
```

## 写作示例

```markdown
---
title: 如何学习 React
titleEn: How to Learn React
date: 2024-06-20
tags: [React, 前端, 教程]
tagsEn: [React, Frontend, Tutorial]
summary: 一篇关于 React 学习路径的指南
summaryEn: A guide about React learning path
---

# 如何学习 React

React 是目前最流行的前端框架之一...

## 基础概念

首先需要了解组件、JSX、Props 和 State：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

## 学习资源

- [React 官方文档](https://react.dev)
- [React 中文文档](https://zh-hans.react.dev)

> 实践是最好的学习方式。

---EN---

# How to Learn React

React is one of the most popular frontend frameworks...

## Basic Concepts

First, you need to understand components, JSX, Props, and State:

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

## Learning Resources

- [React Official Docs](https://react.dev)
- [React Chinese Docs](https://zh-hans.react.dev)

> Practice is the best way to learn.
```

## 发布流程

1. 在 `articles/` 目录创建 `.md` 文件
2. 按照上述格式编写内容
3. 运行 `npm run build` 构建
4. 部署 `dist/` 目录到 Netlify / Vercel / GitHub Pages

## 注意事项

- 文件名中的日期用于文章排序，日期越新排在越前面
- `titleEn` 和 `summaryEn` 如果省略，会默认使用中文版本
- 标签用于文章分类和筛选，建议每篇文章 2-4 个标签
- 摘要会显示在文章列表中，建议控制在 100 字以内
