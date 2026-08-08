# Listening Memory 使用流程

## Initial Setup

首次使用前完成以下设置。

### 1. Anki

建立：

- Deck：`TOEFL Listening`
- Note Type：`Listening Memory`

Note fields：

```text
Source Sentence
Focus
Audio
Translation
Notes
```

配置 card template。见style.txt

### 2. ElevenLabs and HyperTTS

Listening Memory 当前使用 ElevenLabs 生成 AI speech，并通过 HyperTTS 将生成的音频保存为 Anki Collection Audio。

#### ElevenLabs

在 ElevenLabs 创建 API key。用于 HyperTTS 的 key 至少需要以下权限：

```
Text to Speech → Access
Voices         → Read
Models         → Access
```

ElevenLabs API 使用 API key 进行认证；HyperTTS 官方针对自有 ElevenLabs key 提供了 `ElevenLabsCustom` service。配置完成后，当前 ElevenLabs account 中通过 API 可用的 voices 会出现在 HyperTTS 的 `ElevenLabsCustom` voice list 中。

在 Anki 中打开：

```
Tools
→ HyperTTS: Services Configuration
→ ElevenLabsCustom
```

然后：

```
Enable: checked
api_key: <your ElevenLabs API key>
```

保存即可。API key 只配置在 HyperTTS 中，不写入 Listening Memory 文件或 Custom GPT。

需要使用多种声音时，先确保这些 voices 已存在于自己的 ElevenLabs account 并能够通过 API 获取。ElevenLabs 的 voice 是独立对象，每个 voice 有自己的 voice ID；HyperTTS 会读取当前账户可用的 voices。

#### HyperTTS Preset

建立一个 Listening Memory preset：

```
Source
  Source Field: Source Sentence

Target
  Target Field: Audio
  Sound Tag only

Voice Selection
  Mode: Random
  Voices: 选择需要使用的 ElevenLabsCustom voices

Text Processing
  默认无需设置
```

HyperTTS 官方的 Collection Audio workflow 支持 `Single / Random / Priority` voice selection；`Random` 至少加入两个 voices。生成时，每个被处理的 note 会从配置的 voice group 中随机选择。Collection Audio 是预先生成并保存到 Anki collection 的音频，而不是复习时实时调用 TTS。

建议 voice pool 保持较小，例如 **2–4 个发音清晰的英语 voices**。如果 HyperTTS 中同一 voice 有不同 synthesis model 版本，最好让整个 pool 使用同一 model，这样随机变化主要来自 speaker，而不是 model 本身。

日常生成仍然是：

```
Browse
→ 筛选 Audio 为空的新 notes
→ 全选
→ HyperTTS
→ Add Audio (Collection)
→ Listening Memory preset
→ Apply To Notes
```

HyperTTS 会把 sound tag 写入 `Audio` field，并把实际音频保存为 Anki collection media；之后可以在不同 Anki 客户端上使用这些 Collection Audio。

------

## 1. Create Reference Transcript

向 Listening Memory Custom GPT 提供听力 transcript 的文本或清晰图片。

AI 提取完整英文 transcript，并生成包含以下内容的 Markdown reference document：

- 英文原文；
- 中文参考翻译。

中文翻译紧接对应的英文段落。

AI 完成 reference transcript 后停止，等待用户进行标记。

------

## 2. Annotate Listening Focus

在 Markdown 文件的英文 transcript 中使用：

```text
**...**
```

标记需要进入 Listening Memory 的部分。

例如：

```text
The committee was **reluctant to rule out** that possibility.
```

一句话中可以存在多个标记：

```text
The **magic** lies in their **unpredictability**.
```

每个至少包含一个标记的完整句子会形成一个 Listening Memory entry。

------

## 3. Construct and Store Memory Entries

将完成标记的 Markdown 文件交给 Listening Memory Custom GPT。

AI 根据标记生成 sentence-level Listening Memory entries。

每个 entry 包含：

- `Source Sentence`：去除标记后的完整原句；
- `Focus`：该句中所有被标记的内容；
- `Translation`：reference transcript 中对应的中文参考翻译；
- `Notes`：仅在用户明确提供或要求时记录。

用户未提供 `Notes` 时，AI 忽略该字段；最终 Anki note 中的 `Notes` 保持为空。

完成 entries 后，AI 调用 `listeningMemoryStorage` Action。

Backend：

1. 保存 canonical Listening Memory entries；
2. 根据当天已经保存的 entries 重建当天的 Anki import file。

Anki import file 的文件名为：

```text
listening-anki-<dd-MM-yy>.txt
```

当天多次生成 Listening Memory 时，使用最新生成的当天 Anki import file 即可。

------

## 4. Import into Anki

在 Anki Desktop 中导入 backend 生成的 Anki import file。

文件中已经指定：

```text
Note Type: Listening Memory
Deck: TOEFL Listening
```

导入的数据字段为：

```text
Source Sentence
Focus
Translation
Notes
```

确认 field mapping 后执行导入。

`Audio` 不包含在 import file 中。

因此：

- 新 note 的 `Audio` 初始为空；
- 已经由 HyperTTS 生成 Audio 的旧 note 再次被导入时，`Audio` field 不被此次 import 修改。

------

## 5. Generate Audio

打开 Anki Browser。

筛选本次需要生成 Audio 的 Listening Memory notes。可以使用：

```text
deck:"TOEFL Listening" Audio:
```

选中这些 notes。

然后执行：

```text
HyperTTS
→ Add Audio (Collection)
→ 选择 Listening Memory preset
→ Apply To Notes
```

HyperTTS 使用每个 note 的 `Source Sentence` 生成音频，从已配置的 voice pool 中选择 voice，并将生成的 Collection Audio 写入 `Audio` field。

生成完成后，该 note 之后复习时直接播放已经保存的 audio media，不再实时调用 TTS。

------

## 6. Sync

正常执行 Anki Sync。

Listening Memory notes 及生成的 audio media 随 Anki collection 一同同步。

------

## Review

复习时：

1. 卡片正面播放 `Source Sentence` 的音频；
2. 尝试直接识别和理解完整句子；
3. 翻面查看 `Source Sentence`；
4. 查看 `Focus`；
5. 必要时查看 `Translation` 和 `Notes`。