# AI 辅助英语学习 Skill：初步设计方案（Draft v0.8）

> 版本：v0.8  
> 日期：2026-05-31  
> 状态：阶段性修订稿；第 6.2 节、Reading Routine、Listening Routine 与 Writing Routine 已根据讨论更新  

---

## 标记说明

`<AI draft>` 表示该部分主要由 AI 基于当前讨论初步扩展而成，尚未经过逐项讨论和确认。后续需要逐段审阅、修订或删除。

未标注 `<AI draft>` 的部分，表示其内容已经较明确地来自当前讨论中的共识，或只是对用户已提出观点的整理。

---

## 1. 项目定位

本项目的目标是构筑一个 **AI 辅助英语学习的 skill / 工作流文档**，而不是一个面向终端用户的 app。

这里的 skill 可以理解为：

> 为 AI 创建的一套结构化工作说明，使 AI 在英语学习辅助任务中，能够稳定、低摩擦、符合方法论地执行材料生成、训练设计、输出反馈、陪练、复习沉淀等任务。

当前项目服务对象主要是项目创建者本人。因此，skill 不需要一开始承担完整的学习管理、长期路线规划、动机维护等任务，而应优先帮助学习者降低英语自学过程中最耗费时间和精力的环节。

---

## 2. 当前阶段的设计范围

当前阶段只聚焦第一层核心执行能力。

### 2.1 第一层：核心执行能力

第一层是当前要实际实现的 skill 功能，主要包括：

1. 材料生成与改写
2. 练习设计
3. 输出反馈
4. 场景陪练
5. 错误沉淀与复习

这些能力直接服务于学习者的日常训练任务。

### 2.2 第二层：元控制能力

第二层暂不作为当前实现重点。

第二层包括但不限于：

1. 学习问题观察
2. 目标到训练任务的转换
3. 方法论约束
4. 难度调节
5. 训练节奏控制
6. 中长期学习路线设计
7. 学习策略建议

由于当前项目主要服务于已有方法论意识的学习者，第二层任务可以主要由学习者本人完成，或通过 AI 的通用讨论能力辅助完成。

因此，当前只需要在讨论第一层功能实现的过程中，逐步沉淀第二层所需的 **接口信息**。

所谓接口信息，是指第一层执行任务时需要读取或参考的元信息，例如：

- 学习者当前水平
- 各项能力目标水平
- 当前训练目标
- 材料偏好
- 反馈偏好
- 记忆格式偏好
- 常见错误
- 训练场景

第二层的完整策略系统暂不实现。

---

## 3. 核心设计原则

### 3.1 用户主导方向，AI 主导训练质量

本 skill 不应把学习者视为需要被全面规划的新手。

学习者负责决定：

- 学什么
- 为什么学
- 当前优先级是什么
- 每天或每阶段投入多少
- 当前要训练哪项能力
- 是否接受 AI 的建议

AI 负责：

- 快速构建合适材料
- 降低训练准备成本
- 设计可执行练习
- 提供高质量反馈
- 组织场景陪练
- 提取高价值语言点
- 生成可复习内容

因此，本 skill 的基本定位是：

> 你决定要练什么，AI 负责把训练做扎实。

---

### 3.2 降低摩擦，而不是增加课程负担

英语自学者的主要问题往往不是没有动机，而是学习过程中的准备成本、组织成本、反馈成本和复习沉淀成本过高。

典型高摩擦环节包括：

- 寻找适合水平的材料
- 改写或整理材料
- 查词、查表达、理解语境义
- 设计输出练习
- 寻找陪练
- 获得高质量反馈
- 从反馈中提取语言点
- 把语言点制成可复习载体

本 skill 的目标不是制造更多完整但沉重的学习任务，而是尽可能让学习者把精力花在语言训练本身。

---

### 3.3 动机不是显性模块

当前项目不把“动机维护”作为独立模块。

学习者通常已经有足够的外部动力学习英语。真正导致学习难以持续的，往往是学习英语的时间和精力成本过高。

因此，本 skill 通过降低学习摩擦间接维护动机，而不是通过打卡、积分、徽章、鸡汤式鼓励等方式直接处理动机问题。

---

### 3.4 策略顾问应主要内化在 skill 中

AI 的学习策略建议不应频繁显性打断用户。

更好的方式是把方法论内化进工作流设计中。例如，当用户要求生成词汇表时，AI 不应只给孤立单词，而应自然加入：

- 使用语境
- 常见搭配
- 例句
- 近义表达辨析
- 输出练习
- 可复习格式

只有当用户的要求与目标明显不匹配时，AI 才需要以提醒的方式与用户确认AI对于当前目标的理解是否仍然准确。

---

## 4. 英语能力观

### 4.1 听说读写没有绝对优先级

本项目认为，听、说、读、写四项能力相辅相成，没有绝对优先级。

不同学习者在四项能力上的当前水平可能不同，目标水平也可能不同，情景需求也可能不同。因此，不应假设一个统一的综合英语水平就足以指导所有训练。

例如，一个学习者可能：

- 阅读能力较强，但听力较弱
- 写作能够慢慢组织，但口语反应困难
- 日常交流尚可，但学术阅读不足
- 技术文档阅读较好，但商务邮件表达不自然

因此，skill 设计中需要支持按能力分别建模和训练。

---

### 4.2 能力传导关系：read → listen → write → speak

虽然四项能力没有绝对优先级，但可以暂时采用如下能力传导关系作为参考：

> read → listen → write → speak

该链条不是学习顺序的强制规定，而是能力之间可能存在的传导关系和认知负荷差异。

以下解释仍需后续确认：

#### Reading

阅读是最稳定、最可控的输入形式。学习者可以停下来、回看、查词、分析句子结构。

#### Listening

听力在阅读基础上增加了时间压力。学习者需要实时识别语音、切分语块、处理语速、连读、弱读、口音和上下文。

#### Writing

写作从理解转向主动调用。它允许学习者有时间组织语言，但要求学习者主动选择词汇、句型、结构和语气。

#### Speaking

口语是在写作基础上进一步增加实时性、互动性、发音、流畅度和心理压力。它通常是最复杂的综合输出。

---

## 5. 底层训练逻辑与实践架构

本项目将以下流程视为语言训练的底层逻辑：

> 输入 → 理解 → 输出 → 反馈 → 记忆

其中：

- 输入：获得合适的语言材料
- 理解：理解材料中的含义、结构、语境、语气和使用边界
- 输出：主动使用语言进行表达
- 反馈：获得关于准确性、自然度、语气、逻辑和交际效果的反馈
- 记忆：将高价值语言点沉淀为可复习内容

该流程适合作为听、说、读、写四项训练共同参考的底层逻辑，而不是统一主流程。

在实践上，听、说、读、写仍然更适合分别处理。原因包括：

1. 四项能力的当前水平可能不同。
2. 四项能力的目标水平可能不同。
3. 不同能力需要的训练形式不同。
4. 同一材料不一定适合复用于所有能力训练。
5. 强行扩展训练任务可能增加学习负担，违背低摩擦原则。

因此，当前更合适的实践架构是：

> 以 Reading / Listening / Writing / Speaking 四项能力 routine 作为主要训练入口；在每个 routine 内部，根据需要调用“输入、理解、输出、反馈、记忆”相关能力。

同时，材料、表达、错误、场景或语言点可以在需要时被临时组织为一个学习对象，用来支持某一次具体训练。这个学习对象可以帮助 AI 更好地整理材料、设计练习、提供反馈和生成复习内容。

需要注意的是，跨能力复用是加分项，而不是必需项。

如果某个阅读材料自然适合继续用于听力、写作或口语训练，AI 可以建议低成本复用；但默认应优先服务用户当前指定的能力和任务，不应把局部训练任务自动扩展成过重的综合训练任务。

---

## 6. 总体架构：四项能力 routine + 通用功能视角

当前更合适的架构是：

> 四项能力 routine 作为实践入口，五个通用功能视角作为设计参考。

### 6.1 四项能力 routine

用户实际训练时，通常会从以下四类 routine 进入：

1. Reading Routine
2. Listening Routine
3. Writing Routine
4. Speaking Routine

每个 routine 都应根据该能力的特点，定义自己的：

- 训练目标
- 输入类型
- procedure
- 子功能
- 反馈重点
- 记忆沉淀方式
- 所需元信息接口

---

### 6.2 五个通用功能视角

以下五个方向可作为设计四项能力 routine 时的概念参考，用来帮助 AI 判断某个训练任务可能需要哪些支持能力。

它们不是强制流程，也不是每个 routine 都必须调用的固定模块。不同能力、不同任务可以只使用其中一部分，甚至完全不显式使用某些功能视角。

这五个视角的作用是提醒 skill 在设计训练任务时，从以下问题出发：

1. 是否需要构建或整理输入材料？
2. 是否需要帮助用户深化理解？
3. 是否需要设计主动语言调用机会？
4. 是否需要提供反馈修正？
5. 是否需要将语言点沉淀为可复习内容？

因此，后续 Reading / Listening / Writing / Speaking routine 的设计中，不应机械套用这五个视角，而应根据具体训练目标选择性使用。

#### 6.2.1 Input Builder：输入构建视角

Input Builder 关注的是：某个训练任务是否需要输入材料，以及这些输入材料应以什么形式进入训练。

它在抽象层面主要回答三个问题：

1. 当前训练是否需要外部输入材料？
2. 输入材料需要满足哪些基本约束？
3. 输入材料与后续训练动作之间是什么关系？

在本阶段，Input Builder 不被定义为固定模块，也不预设具体材料形态。不同能力 routine 可以根据自身训练目标决定是否需要输入材料、需要何种输入材料，以及输入材料应承担什么训练功能。

其核心关注点不是“生成更多内容”，而是降低训练开始前的材料准备成本，并确保输入材料与当前训练任务相匹配。

---

#### 6.2.2 Meaning Explorer：意义理解视角

Meaning Explorer 关注的是：某个训练任务是否需要对语言输入或输出中的意义进行深化理解。

这里的“意义”不只是字面含义，也包括语境中的实际意思、表达的使用边界、形式与语气之间的关系，以及学习者是否真正理解了语言材料或表达方式。

在本阶段，Meaning Explorer 不预设具体解释形式，也不要求每个 routine 都显式调用。某些训练任务可能只需要快速反馈，不需要展开意义分析；另一些任务则可能需要重点处理语境、语气、表达边界或理解偏差。

其核心关注点是降低学习者在“看似知道意思，但无法准确理解或使用”的环节中的认知成本。

---

#### 6.2.3 Output Trainer：输出训练视角

Output Trainer 关注的是：当前训练任务是否需要学习者主动产出语言，以及这种产出在训练中承担什么作用。

这里的“输出”不预先限定为某种具体形式。具体输出形态应由 Reading / Listening / Writing / Speaking routine 根据自身训练目标决定。

在本阶段，Output Trainer 不预设具体输出形式，也不要求每个 routine 都包含输出环节。某些训练可能以理解为主，输出只作为检查手段；另一些训练则可能以输出本身为核心。

其核心关注点是：在合适的训练位置，为学习者创造可执行、低摩擦、与当前目标匹配的语言调用机会。

---

#### 6.2.4 Feedback Engine：反馈视角

Feedback Engine 关注的是：当前训练任务是否需要反馈，以及反馈应服务于什么学习目的。

这里的反馈不预设统一维度。不同能力 routine 的反馈重点可以不同，具体反馈范围、深度和形式应由训练目标决定。

在本阶段，Feedback Engine 不要求每个训练任务都进行重反馈，也不把反馈设计成固定格式。反馈可以用于评价、纠正、解释或帮助学习者发现自己难以自检的问题。

其核心关注点是：帮助学习者发现自己难以自检的问题，并将反馈控制在可吸收、可行动的范围内。

---

#### 6.2.5 Memory Formatter：记忆沉淀视角

Memory Formatter 关注的是：当前训练中是否出现了值得保留的语言内容，以及是否需要将其组织为可复习、可调用或可追踪的 entry。

Memory Formatter 在被调用时，先根据当前 routine、材料内容、用户表现和已定义的记忆类别，整理并提出本轮建议加入记忆系统的 candidate entry content。

candidate entry content 只表示“本轮哪些内容值得被考虑进入记忆系统”，尚未套入最终 entry 组织形式。用户可以对 candidate entry content 进行确认、删除、合并、改写或补充。AI 根据用户反馈，将确认后的内容组织为相应 entry，并等待用户最终确认。

Memory Formatter 需要定义三类相互关联的内容：

1. **记忆类别**  
   指当前 routine 中可能值得沉淀的内容类型。

2. **entry 组织形式**  
   指某一类记忆内容可以被组织成怎样的 entry。同一个记忆类别可以对应多种 entry 组织形式。

3. **组织形式的使用方式**  
   指某种 entry 组织形式在后续学习中已知的被使用的方式。使用方式挂在 entry 组织形式上。一个 entry 组织形式可以支持多个使用方式。

其核心关注点是：把高价值学习内容压缩为低负担、可复用的复习对象，而不是制造额外整理成本。

---

## 7. 四项能力 routine 的设计

四项能力 routine 从本节开始进入具体功能设计。每个 routine 应根据该能力的训练性质，分别定义其输入类型、核心功能、反馈方式和记忆沉淀方式。

---

### 7.1 Reading Routine

Reading Routine 是以文本材料为核心的输入型 routine，主要围绕 Input Builder 和 Meaning Explorer 展开。

#### 7.1.1 Input Builder：材料输入与训练材料生成

Reading Routine 的 Input Builder 处理以下入口和任务：

1. **接受用户提供材料**  
   用户可以提供完整可用的参考材料，包括文章、段落、句子、词汇等。

2. **根据主题或目标生成 / 寻找参考材料**  
   用户可以提供主题或目标，并要求 AI 自主生成或寻找合适的实际使用参考材料。

3. **生成训练材料**  
   AI 根据提供材料，结合 profile 和随材料指定的需求，生成适合本轮 Reading Routine 的训练材料。

#### 7.1.2 Meaning Explorer：阅读理解核心

Reading Routine 的 Meaning Explorer 包含两个模块。

##### Module 1：词汇、表达与语法点解释

Module 1 用于解释词汇和表达的释义、它们在所提供语境中的含义，以及影响理解的语法点。

##### Module 2：句子 / 段落含义解读

Module 2 用于解读一句话或一段文字的含义，并从中提取必要的、影响理解的词汇、表达和语法点进入 Module 1。

#### 7.1.3 Output Trainer：弱输出支持

Reading Routine 基本不需要 Output Trainer。

仅在 Meaning Explorer 之后，如果用户要求更多示例，AI 可以提供更多其他情景中相同语境下的示例，用于辅助理解。

#### 7.1.4 Feedback Engine：不独立展开

Reading Routine 几乎是纯输入型 routine，因此 Feedback Engine 不独立展开。

用户在 Reading Routine 中提出的问题，可以使用通用回答能力处理，或引用 Meaning Explorer 的 procedure 进行回答。

#### 7.1.5 Memory Formatter：阅读记忆沉淀

Reading Routine 的 Memory Formatter 按以下结构定义：前置步骤、记忆类别、entry 组织形式、组织形式的使用方式。

##### 前置步骤：candidate entry content

Memory Formatter 被调用时，先根据当前阅读材料、用户问题、解释过程和已定义的记忆类别，提出本轮建议加入记忆系统的 candidate entry content。

procedure：

1. 根据当前 routine 和材料内容识别可能值得记录的内容；
2. 按已定义的记忆类别整理 candidate entry content；
3. 向用户展示 candidate entry content；
4. 根据用户反馈进行确认、删除、合并、改写或补充；
5. 将确认后的内容组织为相应 entry，并等待最终确认。

candidate entry content 只表示“本轮哪些内容值得被考虑进入记忆系统”，尚未套入最终 entry 组织形式。

##### 记忆类别

Reading Routine 定义三类记忆类别：

1. **Vocabulary**  
   以词汇本身作为 Entry Content。记录时所处语境作为该词的属性补充解释；未来再次遇到同一词时，可以围绕同一 Entry Content 累加新的出现记录。

2. **Expression**  
   以一个能够稳定指代该表达的抽象形式作为 Entry Content。该表达在当前材料中的具体出现、语境、含义和必要解释作为本次出现记录。Expression 的 Entry Content 应避免机械复制原文中偶然出现的完整片段，而应足以稳定指代该表达。

3. **Sentence / Paragraph**  
   以原句或原段落本身作为 Entry Content。该类 entry 通过 Value Fields 和 Custom Note 记录其阅读价值。

该类别集合是当前 Reading Routine 的已定义版本；后续如需增加类别，应在现有“记忆类别 → entry 组织形式 → 使用方式”的结构下扩展。

##### Entry 组织形式

星号标记的字段为必填项。

###### Vocabulary Entry

组织形式：JSON entry instance。

使用方式：作为抽认卡组织Anki deck；直接随机抽选并形成格式化输出来复习

一个 Vocabulary Entry instance 表示某个 Vocabulary Entry Content 在一次阅读语境中的出现记录。

| Field | 说明 |
|---|---|
| *Entry Type | 固定为 `vocabulary`，用于标记该 entry 的类型。 |
| *Entry Content | 词汇本身。该字段同时作为该词汇 entry 的引用标识。 |
| *Source Sentence | 该词汇出现的原句，用于保留真实阅读语境。 |
| Source Context | 必要时记录原句所在的上下文，例如前后句、段落摘要或材料背景。 |
| Explanation | 解释该词汇在当前语境中的含义、作用，或为什么需要这样理解。 |
| Optional Translation | 可选的中文释义或译文，仅在有助于理解时填写。 |
| Notes | 补充说明，例如用户个人理解、易混点、后续观察或其他非结构化备注。 |

###### Expression Entry

组织形式：JSON entry instance。

使用方式：作为抽认卡组织Anki deck；直接随机抽选并形成格式化输出来复习

一个 Expression Entry instance 表示某个 Expression Entry Content 在一次阅读语境中的出现记录。

| Field | 说明 |
|---|---|
| *Entry Type | 固定为 `expression`，用于标记该 entry 的类型。 |
| *Entry Content | 用于稳定指代该表达的抽象形式。 |
| *Source Sentence | 该表达出现的原句，用于保留真实阅读语境。 |
| Source Context | 必要时记录原句所在的上下文，例如前后句、段落摘要或材料背景。 |
| Explanation | 解释该表达在当前语境中的含义、语用功能、使用边界或变体。 |
| Optional Translation | 可选的中文释义或译文，仅在有助于理解时填写。 |
| Notes | 补充说明，例如表达变体、用户个人理解、易混点或其他非结构化备注。 |

Vocabulary 和 Expression 不设置 Reference ID。它们的 Entry Content 本身兼具引用功能。多个 instance 可以共享同一个 Entry Content，用于长期累加不同语境中的理解。

###### Sentence / Paragraph Entry

组织形式：JSON entry instance。

使用方式：undefined

| Field | 说明 |
|---|---|
| *Entry Type | 固定为 `sentence` 或 `paragraph`，用于标记该 entry 的类型。 |
| *Entry Content | 原句或原段落本身，是该 entry 的核心内容。 |
| Value Fields | dynamic field marker 列表，说明该 entry 启用了哪些结构化 value fields。初始仅定义 `grammar`。 |
| Grammar | 当 `Value Fields` 包含 `grammar` 时填写，用于记录该句子或段落中的语法、句法结构或结构性理解价值。 |
| Custom Note | 固定开放字段。用于记录无法归入稳定 value field 的信息、用户指出的价值或临时理解。 |
| Source | 指向 Entry Content 来源，例如材料标题、文章链接、用户提供材料编号或上下文位置。 |
| Reference ID | 供其他 entry 引用该句子或段落 entry 的稳定 ID。 |

##### Dynamic Field Marker Repo

Reading Routine 初始只定义一个 dynamic field marker：

| Marker | 说明 |
|---|---|
| grammar | 表示该 Sentence / Paragraph Entry 启用 `Grammar` 字段，用于记录语法、句法结构或结构性理解价值。 |

Dynamic Field Marker Repo 是一个记录性文件，用于给可用的 dynamic field marker 加注释，并保持 Value Fields 的稳定性。

---

### 7.2 Listening Routine

Listening Routine 是以音频 / 视频材料及其 transcript 为核心的输入型 routine。其主要目标不是由 AI 直接诊断听觉层面的语音问题，而是帮助用户整理听力材料、管理文稿、对比听写结果、解释文本内容、分析听力习题，并将没听懂的内容结构化沉淀。

#### 7.2.1 Input Builder：听力材料整理与输入支持

Listening Routine 的 Input Builder 处理以下入口和任务：

1. 推荐 / 检索可能合适的听力材料：用户提出讨论听力训练需求时，根据讨论出的需求推荐或检索可能合适的听力材料
2. 接受用户提供的听力材料
3. 整理听力材料记录：AI 将用户提供的听力材料整理为训练记录，具体格式待定义或即时定义。
4. 使用工具生成 transcript：如果有可用工具，AI 可以协助将音频转为 transcript。生成的 transcript 应标注其来源和可靠性状态。

Listening Routine 默认假设用户需要自己确认听力材料和 transcript 的可靠性。

#### 7.2.2 Meaning Explorer：基于 transcript 的意义理解

Listening Routine 的 Meaning Explorer 基本沿用 Reading Routine 的文本理解能力。

它主要用于解释用户提问的文本。基本上它只有Module 1的功能：

> ##### Module 1：词汇、表达与语法点解释
>
> Module 1 用于解释词汇和表达的释义、它们在所提供语境中的含义，以及影响理解的语法点。

Listening Routine 的 Meaning Explorer 不默认分析音频中的连读、弱读、缩读、口音、语速、重音或语调问题。此类问题只有在用户主动提出、并提供足够上下文时，AI 才可以作为可能原因进行辅助说明。

#### 7.2.3 Output Trainer：听写与听力任务输出

Listening Routine 的 Output Trainer 当前主要确认一种核心形式：

##### Dictation：听写

Dictation 的基本 procedure：

1. 用户听音频；
2. 用户根据音频完整写出自己听到的 transcript；
3. AI 将用户听写结果与 transcript 对比；
4. AI 标出差异；
5. 差异进入 Feedback Engine；
6. 将用户指示的重要错误解析并交给 Memory Formatter。

Listening Routine 后续也可能要支持听力试题训练，例如 TOEFL iBT Listening。此类任务中，用户提供题目、选项、答案和 transcript 后，AI 帮助分析答案依据和错误原因。

#### 7.2.4 Feedback Engine：听写反馈与习题分析

Listening Routine 的 Feedback Engine 主要依附于听写对比和听力习题分析工作。

##### 听写反馈

听写反馈基于用户听写文本与 transcript 的对比，逐个段落输出：

1. 用户听写结果；
2. 正确 transcript；
3. AI推测可能的错误原因（简略）

##### 习题反馈

在听力试题训练中，AI 可以：

1. 对照 transcript 找出答案依据；
2. 解释正确选项为什么成立；
3. 解释错误选项为什么不成立；
4. 标注题目考查的信息类型；
5. 帮助用户整理错题原因。

#### 7.2.5 Memory Formatter：听力困难记录

Listening Routine 的 Memory Formatter 记录用户指示的问题点并将其解析和组织为规范记录。

##### 记忆类别

Listening Routine 当前定义一类记忆类别：

1. **Listening Difficulty**: 记录用户在某次听力训练中没听懂、听错或需要重点听懂的内容。该内容可以是词、短语、句子、段落。

##### 组织形式

###### Listening Difficulty Entry

组织形式：JSON entry instance。

使用方式：undefined

一个 Listening Difficulty Entry instance 表示某次听力训练中一个具体的听力困难记录。

| Field                 | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| *Entry Type           | 固定为 `listening_difficulty`。                              |
| *Index                | 此条目中关键的没听懂 / 需要听懂的 word 或 phrase，并用于检索和聚合。通常由用户指定，AI建议。 |
| *Ununderstood Part    | 用户没听懂、听错或需要重点听懂的部分。                       |
| Source Context        | 该部分相关上下文。可包含前后句、所在段落、对话背景、题目背景或材料背景。 |
| Reason Not Understood | 没听懂的原因。仅用户指示填写。                               |
| *Source               | 来源。应包含足够指向到材料的信息。                           |
| Notes                 | 补充说明，例如用户后续观察、复听结果、相关表达解释或其他非结构化备注。 |

---

### 7.3 Writing Routine

Writing Routine 是以英文写作输出为核心的输出型 routine。它用于处理用户的写作训练需求与教学化写作辅助需求，帮助用户建立写作任务、组织行文思路、生成或修改英文文本，并通过写作反馈提升用户对英文写作的控制能力。

Writing Routine 覆盖两类主要任务：

1. **训练型写作输出**：用户主动完成英文写作，AI 提供系统反馈并支持 revision cycle。
2. **教学化通用写作辅助**：AI 根据用户提供的写作需求、中文想法、中文稿、英文草稿或参考内容生成英文文本，并通过 Writing Feedback Engine 提供自评结果。

---

#### 7.3.1 Input Builder：写作需求与参考内容输入

Writing Routine 的 Input Builder 负责接受用户提供的写作需求说明，以及随之提供的任何参考内容，用于建立本轮写作训练任务或写作辅助任务。

Input Builder 需要整理以下信息。星号标记的字段为必填项。

| Field | 说明 |
|---|---|
| *Writing Goal | 本轮写作要完成的任务。 |
| Context | 写作发生的场景或背景。 |
| Audience | 文本面向的读者或对象。 |
| Genre | 文本类型。 |
| Register | 目标语气、正式程度和文体要求。 |
| *Content | 用户需要表达的内容。 |
| Reference Material | 用户提供的参考材料或上下文。 |
| *Training / Assistance Mode | 本轮任务更偏训练型写作，还是教学化写作辅助。 |

Input Builder 在 Writing Routine 中的作用是：**建立写作任务**。

如果用户提供的信息已经足够，AI 进入对应流程。

如果关键信息明显不足，AI 应先询问并讨论，再继续执行任务。该动作属于 Writing Routine 中 Input Builder 的规范动作。

---

#### 7.3.2 Meaning Explorer：通用解释能力

Writing Routine 不单独设置 Meaning Explorer 模块。

当用户对表达、修改、词义差异、语气差异、文体选择或不自然原因提出问题时，AI 使用通用语言解释能力回答。

这类解释服务于写作训练和写作辅助，但不构成独立流程。

---

#### 7.3.3 Output Trainer：写作输出训练与教学化写作辅助

Writing Routine 的 Output Trainer 包含两种主要形式。

##### A. 训练型写作输出

训练型写作输出要求用户主动产出英文文本。AI 的主要作用是建立任务、提供反馈、引导修改，并支持多轮 revision cycle。

基本 procedure：

1. 用户提出写作训练需求，或提供写作题目；
2. AI 通过 Input Builder 建立写作任务；
3. 用户完成英文输出；
4. AI 使用 Writing Feedback Engine 提供反馈；
5. 用户根据反馈修改；
6. AI 对修改稿继续反馈。

训练型写作输出的核心目标是提高用户独立写作能力。

---

##### B. 教学化通用写作辅助

教学化通用写作辅助允许 AI 根据用户提供的写作需求、中文想法、中文稿、英文草稿、要点或参考内容生成英文文本。

该形式的重点是让用户在获得英文文本的同时，看到文本如何从写作需求、内容重点、读者对象、语气要求和文体要求中构建出来。

基本 procedure：

1. 用户提供写作需求、内容或草稿；
2. AI 通过 Input Builder 建立写作辅助任务；
3. AI 给出行文思路；
4. AI 生成英文文本；
5. AI 独立调用 Writing Feedback Engine，对生成文本提供自评结果。

---

#### 7.3.4 Feedback Engine：写作反馈

Writing Feedback Engine 负责对用户文本或 AI 生成文本进行系统评价、修订和教学化说明。

反馈的核心输出是 **Corrected + Polished Version**。该版本在保留原意的基础上完成错误修正、表达自然化、语义精确化、语气调整和文体适配。对于信息顺序、表达结构或行文组织上的较大调整，AI 应在反馈中说明调整依据。

##### 评价维度

Writing Feedback Engine 的评价维度主要借鉴 Cambridge English Writing Assessment Scale 的 C1 / C2 写作评价框架，并结合 Joseph Williams / Joseph Bizup 的清晰写作原则，转化为适合本 routine 的教学型反馈维度。

###### 1. Task & Content Fulfilment

来源对应 Cambridge 的 **Content**。

关注文本是否完成写作任务，是否覆盖用户要求表达的内容，是否让目标读者获得必要信息。

检查重点：

- 是否回应 Writing Goal；
- 是否覆盖 Content 中的必要信息；
- 是否存在遗漏、偏离或误解；
- 内容是否相关、准确、充分；
- AI 生成文本是否忠实承接用户提供的原始意思。

###### 2. Communicative Achievement & Reader Fit

来源对应 Cambridge 的 **Communicative Achievement**。

关注文本是否适合目标读者、写作场景、文本类型和交际目的。

检查重点：

- 是否符合 Genre 的常规写法；
- Register 是否适合；
- 语气是否符合用户目标；
- 是否能有效完成请求、说明、解释、说服、道歉、拒绝、总结等交际功能；
- 是否能让目标读者正确理解写作者的意图。

###### 3. Organisation, Cohesion & Information Flow

来源对应 Cambridge 的 **Organisation**，并吸收 Williams 关于 cohesion 的原则。

关注文本的整体结构、段落组织、句间衔接和信息推进方式。

检查重点：

- 行文顺序是否合理；
- 段落结构是否清楚；
- 句子之间是否有明确衔接；
- 信息是否从已知内容推进到新内容；
- topics 是否保持稳定，避免不必要跳转；
- 重点信息是否放在合适位置；
- 是否存在重复、跳跃、堆砌或逻辑断裂。

###### 4. Clarity, Sentence Design & Emphasis

来源主要对应 Williams 的 clarity / emphasis 原则，并补充 Cambridge 的高级写作要求。

关注句子是否清楚、可读，是否让读者快速识别“谁做什么”以及句子的重点。

检查重点：

- 句子主语是否清楚；
- 主要动作是否由清楚的动词表达；
- 主语和主要谓语之间是否被过长结构打断；
- 句子是否过度名词化或抽象化；
- 复杂信息是否放在读者更容易处理的位置；
- 句末重点是否承载关键信息；
- 是否存在可以通过拆分、重组或压缩提升清晰度的句子。

###### 5. Language Control, Precision & Style

来源对应 Cambridge 的 **Language**，并吸收 Williams 关于 concision 的原则。

关注词汇、语法、句式和整体文风是否准确、自然、受控。

检查重点：

- 词义是否准确；
- 搭配是否自然；
- register 是否与词汇选择匹配；
- 是否存在中文直译；
- 语法、时态、冠词、介词、单复数、主谓一致是否正确；
- 简单句和复杂句是否使用得当；
- 表达是否简洁，是否存在冗余、重复或不必要复杂化；
- 整体语言是否符合写作目的所需的风格。

##### Feedback procedure

Writing Feedback Engine 默认按以下顺序输出。

###### 1. Task Understanding

AI 简要说明对本轮写作任务的理解。

###### 2. Corrected + Polished Version

AI 给出完整修改版本。该版本同时完成错误修正、表达自然化、语义精确化、语气调整和文体适配。

###### 3. Diagnostic Feedback by Dimensions

AI 按五个维度给出诊断性反馈：

| Dimension | Feedback Focus |
|---|---|
| Task & Content Fulfilment | 任务完成度、内容覆盖、信息充分性 |
| Communicative Achievement & Reader Fit | 读者适配、场景适配、文体与语气 |
| Organisation, Cohesion & Information Flow | 结构、衔接、逻辑和信息推进 |
| Clarity, Sentence Design & Emphasis | 句子清晰度、主谓动作、重点安排 |
| Language Control, Precision & Style | 词汇、语法、搭配、简洁性和风格 |

每次反馈都应检查这五个维度，但不要求每个维度输出同等长度。反馈应优先解释最影响表达质量的问题。

###### 4. Local Alternatives

必要时，AI 可以提供局部替代表达，用于展示不同语气、正式程度或表达策略下的可选写法。

###### 5. Revision Prompt

如果当前任务是训练型写作，AI 可以要求用户基于反馈修改原文，并进入下一轮反馈。

如果当前任务是教学化写作辅助，AI 可以根据用户需求继续调整语气、长度、结构或表达风格。

---

#### 7.3.5 Memory Formatter：无

Writing Routine 当前不设置专门的 Memory Formatter。

Writing Routine 中的表达、错误或结构问题，默认由 AI 的通用写作能力即时处理。只有当用户明确要求记录某个表达、错误或写作模式时，AI 才使用通用记忆组织能力临时处理。

---

### 7.4 Speaking Routine `<AI draft>`

可能目标：

- 提高口语流利度
- 提高实时反应能力
- 提高表达自然度
- 练习特定场景对话
- 练习观点表达、解释、反驳、提问
- 降低开口压力
- 在真实交流前进行模拟演练

可能调用模块：

- Output Trainer：设计口语任务
- 场景陪练：模拟对话对象和互动情境
- Feedback Engine：反馈自然度、语气、组织、交际效果
- Meaning Explorer：解释更自然的口语表达方式
- Memory Formatter：沉淀可复用口语表达和常见错误

后续需设计：

- 场景角色扮演 routine
- 即兴表达 routine
- 观点陈述 routine
- 面试口语 routine
- 会议口语 routine
- 口语反馈 routine
- 口语表达复用 routine

---

## 8. 第二层接口信息候选 `<AI draft>`

虽然第二层暂不实现，但第一层 routine 需要逐步明确可以读取哪些元信息。

以下为当前候选接口，后续应在讨论四项能力 routine 的过程中逐步确认、删改和结构化。

---

### 8.1 Learner Profile

学习者基本信息：

- 母语
- 总体英语水平
- 学习偏好
- 不喜欢的训练方式
- 可接受训练强度
- 可接受反馈密度

---

### 8.2 Skill-specific Profile

按听说读写分别记录：

- 当前水平
- 目标水平
- 典型使用场景
- 主要瓶颈
- 常见错误
- 目标语域
- 训练偏好
- 反馈偏好

示例：

| Ability | Current Level | Target Level | Main Bottleneck |
|---|---|---|---|
| Reading | 待定 | 待定 | 待定 |
| Listening | 待定 | 待定 | 待定 |
| Writing | 待定 | 待定 | 待定 |
| Speaking | 待定 | 待定 | 待定 |

---

### 8.3 Current Training Goal

当前训练任务相关信息：

- 当前训练能力：reading / listening / writing / speaking
- 当前训练目标
- 当前主题
- 当前场景
- 是否需要考试导向
- 是否需要工作/学术/生活导向
- 本轮训练期望产出

---

### 8.4 Material Preference

材料偏好：

- 主题
- 难度
- 长度
- 文体
- 真实材料或 AI 生成材料
- 是否允许改写
- 是否需要中英对照
- 是否需要注释
- 是否需要问题或练习

---

### 8.5 Feedback Preference

反馈偏好：

- 轻反馈 / 重反馈
- 只纠错 / 解释原因
- 是否给替代表达
- 是否关注自然度
- 是否关注语法准确性
- 是否关注语气和 register
- 是否生成复习内容
- 每轮最多沉淀多少语言点

---

### 8.6 Memory Format Preference

记忆格式偏好：

- Anki
- Markdown
- 表格
- JSON
- Cloze deletion
- 错题本
- 表达库
- 不生成记忆内容

---

## 9. 当前可采用的设计总纲

当前阶段的总纲可以表述为：

> 围绕听说读写的具体训练任务，降低输入准备、理解深化、输出练习、反馈获得与记忆沉淀的成本。

也可以更完整地表述为：

> 根据用户当前训练的具体能力与任务，把材料、表达、错误、主题或场景转化为低摩擦、可执行、可反馈、可复习的训练 routine。

---

## 10. 一句话总结

本 skill 不是一个英语课程系统，也不是一个替学习者决定路线的 AI 教师；它更像一个面向主动学习者的英语训练工作流助手。

它的核心任务是：

> 在用户已经知道大致要练什么的前提下，帮助用户快速获得合适材料、完成有效训练、得到高质量反馈，并把值得保留的语言点沉淀为可复习内容。
