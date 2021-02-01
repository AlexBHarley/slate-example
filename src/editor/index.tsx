import { CodeAlt } from '@styled-icons/boxicons-regular/CodeAlt';
import { CodeBlock } from '@styled-icons/boxicons-regular/CodeBlock';
import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatStrikethrough,
  FormatUnderlined,
  Image,
  Link,
  Looks3,
  Looks4,
  Looks5,
  Looks6,
  LooksOne,
  LooksTwo,
} from '@styled-icons/material';
import {
  AlignPlugin,
  BalloonToolbar,
  BlockquotePlugin,
  BoldPlugin,
  CodeBlockPlugin,
  CodePlugin,
  EditablePlugins,
  ELEMENT_IMAGE,
  ExitBreakPlugin,
  HeadingPlugin,
  HeadingToolbar,
  ItalicPlugin,
  ListPlugin,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
  ParagraphPlugin,
  pipe,
  ResetBlockTypePlugin,
  SlateDocument,
  SoftBreakPlugin,
  StrikethroughPlugin,
  ToolbarAlign,
  ToolbarElement,
  ToolbarImage,
  ToolbarLink,
  ToolbarList,
  ToolbarMark,
  UnderlinePlugin,
  withAutoformat,
  withDeserializeHTML,
  withImageUpload,
  withInlineVoid,
  withLink,
  withList,
  withMarks,
  withSelectOnBackspace,
} from '@udecode/slate-plugins';
import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';
import 'tippy.js/dist/tippy.css';
import { autoformatRules } from './autoformat';
import { headingTypes, options, optionsResetBlockTypes } from './options';

const plugins: any[] = [];

plugins.push(ParagraphPlugin(options));

plugins.push(BlockquotePlugin(options));
plugins.push(HeadingPlugin(options));
plugins.push(ListPlugin(options));

plugins.push(CodeBlockPlugin(options));
plugins.push(AlignPlugin(options));
plugins.push(BoldPlugin(options));
plugins.push(CodePlugin(options));
plugins.push(ItalicPlugin(options));

plugins.push(UnderlinePlugin(options));

plugins.push(StrikethroughPlugin(options));

plugins.push(ResetBlockTypePlugin(optionsResetBlockTypes));

plugins.push(
  SoftBreakPlugin({
    rules: [
      { hotkey: 'shift+enter' },
      {
        hotkey: 'enter',
        query: {
          allow: [options.code_block.type, options.blockquote.type],
        },
      },
    ],
  })
);

plugins.push(
  ExitBreakPlugin({
    rules: [
      {
        hotkey: 'mod+enter',
      },
      {
        hotkey: 'mod+shift+enter',
        before: true,
      },
      {
        hotkey: 'enter',
        query: {
          start: true,
          end: true,
          allow: headingTypes,
        },
      },
    ],
  })
);

const withPlugins = [
  withReact,
  withHistory,
  withList(options),
  withDeserializeHTML({ plugins }),
  withMarks(),
  withAutoformat({ rules: autoformatRules }),
  withInlineVoid({ plugins }),
] as const;

export default function () {
  const [value, setValue] = useState([
    {
      type: 'P',
      children: [{ text: '' }],
    },
  ]);

  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => {
        // @ts-ignore
        setValue(newValue as SlateDocument);
      }}
    >
      <HeadingToolbar styles={{ root: { flexWrap: 'wrap' } }}>
        {/* Elements */}
        <ToolbarElement type={options.h1.type} icon={<LooksOne />} />
        <ToolbarElement type={options.h2.type} icon={<LooksTwo />} />
        <ToolbarElement type={options.h3.type} icon={<Looks3 />} />
        <ToolbarElement type={options.h4.type} icon={<Looks4 />} />
        <ToolbarElement type={options.h5.type} icon={<Looks5 />} />
        <ToolbarElement type={options.h6.type} icon={<Looks6 />} />
        <ToolbarList
          {...options}
          typeList={options.ul.type}
          icon={<FormatListBulleted />}
        />
        <ToolbarList
          {...options}
          typeList={options.ol.type}
          icon={<FormatListNumbered />}
        />
        <ToolbarElement type={options.blockquote.type} icon={<FormatQuote />} />
        <ToolbarElement type={options.code_block.type} icon={<CodeBlock />} />

        {/* Marks */}
        <ToolbarMark type={MARK_BOLD} icon={<FormatBold />} />
        <ToolbarMark type={MARK_ITALIC} icon={<FormatItalic />} />
        <ToolbarMark type={MARK_UNDERLINE} icon={<FormatUnderlined />} />
        <ToolbarMark type={MARK_STRIKETHROUGH} icon={<FormatStrikethrough />} />
        <ToolbarMark type={MARK_CODE} icon={<CodeAlt />} />

        <ToolbarAlign icon={<FormatAlignLeft />} />
        <ToolbarAlign
          type={options.align_center.type}
          icon={<FormatAlignCenter />}
        />
        <ToolbarAlign
          type={options.align_right.type}
          icon={<FormatAlignRight />}
        />
        <ToolbarAlign
          type={options.align_justify.type}
          icon={<FormatAlignJustify />}
        />
        <ToolbarLink {...options} icon={<Link />} />
        <ToolbarImage {...options} icon={<Image />} />
      </HeadingToolbar>
      <BalloonToolbar arrow>
        <ToolbarMark
          reversed
          type={MARK_BOLD}
          icon={<FormatBold />}
          tooltip={{ content: 'Bold (⌘B)' }}
        />
        <ToolbarMark
          reversed
          type={MARK_ITALIC}
          icon={<FormatItalic />}
          tooltip={{ content: 'Italic (⌘I)' }}
        />
        <ToolbarMark
          reversed
          type={MARK_UNDERLINE}
          icon={<FormatUnderlined />}
          tooltip={{ content: 'Underline (⌘U)' }}
        />
      </BalloonToolbar>
      <EditablePlugins
        plugins={plugins}
        placeholder="Enter some plain text..."
      />
    </Slate>
  );
}
