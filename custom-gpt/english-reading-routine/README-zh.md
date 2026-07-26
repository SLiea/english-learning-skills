# English Reading Routine

## Custom GPT 配置

使用 `SKILL.md` 作为 Custom GPT 的主要 instructions。

知识文件配置：

```text
standard-reading-procedure.md
memory-formatter.md
memory-schemas.md
AnkiFormat.md
anki_formatter.py
```

启用 Data Analysis，以便 GPT 在 sandbox 中执行 `anki_formatter.py`。

配置 GPT Action：`readingMemoryStorage`，用于 persistent memory storage。

## Anki Memory Entry 使用

Reading Routine 先生成 canonical memory entries，再使用 `anki_formatter.py` 根据当天所有 memory entries 生成 Anki 导入文件。

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

1. 请求 memory entry construction，并请求 Anki output。
2. GPT 从 persistent storage 拉取当天已有 memory 文件。
3. GPT 创建当前请求对应的 `reading-memory-hh-dd-mm-yy.json`。
4. GPT 使用 sandbox 中当天所有 memory 文件重新生成 `reading-anki-dd-mm-yy.txt`。
5. GPT 将生成文件通过 Action 推送回 persistent storage。
6. 将生成的 `reading-anki-dd-mm-yy.txt` 导入 Anki Desktop。

## Persistent Memory Storage 配置

### Google Drive

创建一个作为 storage root 的 Google Drive 文件夹。

目录结构：

```text
<ROOT_FOLDER_ID>/
  sources/
  anki/
  outputs/
```

文件分类：

```text
sources/reading-memory-hh-dd-mm-yy.json
anki/reading-anki-dd-mm-yy.txt
outputs/<other generated files>
```

### Google Apps Script

创建 Apps Script Web App，并设置：

```text
Execute as: Me
Who has access: Anyone
```

将 `ROOT_FOLDER_ID` 替换为目标 Drive 文件夹 ID。

最终代码见 `README.md`。

部署完成后，直接访问 Web App URL 应返回：

```json
{"ok":true}
```

### GPT Action

认证方式：

```text
None
```

Action 使用单一 operation：

```text
readingMemoryStorage
```

Schema 与 Apps Script 配置见 `README.md`。

Pull：

```json
{
  "operation": "pull",
  "date": "24-07-26"
}
```

Push：

```json
{
  "operation": "push",
  "files": [
    {
      "filename": "reading-memory-13-24-07-26.json",
      "content": "[]"
    }
  ]
}
```

如果将 GPT 设置为公开 GPT，需要在 Action 配置中提供 Privacy Policy URL。
