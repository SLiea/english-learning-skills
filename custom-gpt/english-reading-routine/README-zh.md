# English Reading Routine

## Custom GPT 配置

使用 `SKILL.md` 作为 Custom GPT 的主要 instructions。

知识文件配置：

```text
standard-reading-procedure.md
memory-formatter.md
memory-schemas.md
```

配置 GPT Action：`readingMemoryStorage`，用于 persistent memory storage 和 Anki 文件生成。

## Anki Memory Entry 使用

Reading Routine 根据 `memory-schemas.md` 构造 canonical memory entries。

GPT 将构造好的 entries 发送给 `readingMemoryStorage` Action。后端负责将 entries 保存为 reading memory 文件，并根据当天的全部 memory entries 重建 Anki 导入文件。

### Anki 一次性配置

创建 note type：

```text
Reading Memory
```

字段顺序：

```text
Import Key
Entry Type
Front
Back
```

Card template：

Front:

```html
{{Front}}
```

Back:

```html
{{FrontSide}}

<hr id="answer">

{{Back}}
```

### 日常流程

1. 请求 memory entry construction。
2. GPT 根据 `memory-schemas.md` 构造 canonical memory entries。
3. GPT 将 entries 发送给 `readingMemoryStorage` Action。
4. 后端保存或更新当前小时的 `reading-memory-hh-dd-mm-yy.json`。
5. 后端读取当天全部 reading memory entries，并重建 `reading-anki-dd-mm-yy.txt`。
6. 将生成的 `reading-anki-dd-mm-yy.txt` 导入 Anki Desktop。
7. 正常新增时，在 Anki 导入设置中忽略重复 notes，避免修改已有学习记录。

新 entries 将作为新 cards 加入，并遵循现有 deck 的调度规则。

## Persistent Memory Storage 配置

### Google Drive

创建一个作为 storage root 的 Google Drive 文件夹。

目录结构：

```text
<ROOT_FOLDER_ID>/
  sources/
  anki/
```

文件分类：

```text
sources/reading-memory-hh-dd-mm-yy.json
anki/reading-anki-dd-mm-yy.txt
```

后端使用 UTC+8 时间。

同一小时内提交的 entries 会合并到同一个 memory 文件中。每次成功执行 store operation 后，后端都会根据当天全部 memory 文件重新生成 Anki 文件。

### Google Apps Script

创建 Apps Script Web App，并设置：

```text
Execute as: Me
Who has access: Anyone
```

使用`Code.gs`

将 `ROOT_FOLDER_ID` 替换为目标 Drive 文件夹 ID。

部署完成后，直接访问 Web App URL 应返回：

```json
{"ok":true}
```

### GPT Action

使用`OpenAISchema.txt`

认证方式：

```text
None
```

Action operation：

```text
readingMemoryStorage
```

PowerShell test:

```powershell
$Url = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"

$Body = @(
  @{
      "Entry Type" = "vocabulary"
      "Entry Content" = "example"
      "Source Sentence" = "This is an example."
      "Pronunciation" = "UK /ɪɡˈzɑːm.pəl/; US /ɪɡˈzæm.pəl/"
      "Source Context" = ""
      "Explanation" = "Something used to illustrate an idea."
      "Optional Translation" = "例子"
      "Notes" = ""
  }
) | ConvertTo-Json -Depth 6

Invoke-RestMethod `
  -Uri $Url `
  -Method Post `
  -ContentType "application/json" `
  -Body $Body
```

A successful response should contain the stored memory file and rebuilt Anki file:
